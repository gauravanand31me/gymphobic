const express = require('express');
const router = express.Router();
const { Followers, UserProfile, User } = require('../models');

// POST route to create a follow relationship
router.post('/', async (req, res) => {
    const { user_id, follower_id } = req.body;

    // Check if user_id and follower_id are the same
    if (user_id === follower_id) {
      return res.status(400).json({
        message: 'User cannot follow or unfollow themselves.',
      });
    }
  
    try {
      // Check if the follow relationship already exists
      const existingFollow = await Followers.findOne({
        where: {
          user_id,
          follower_id,
        },
      });
  
      if (existingFollow) {
        // If exists, unfollow (delete the relationship and decrement counts)
        await existingFollow.destroy();
        await updateUserProfileCounts(user_id, follower_id, false);
  
        return res.status(200).json({
          message: 'Successfully unfollowed the user.',
        });
      } else {
        // If not exists, follow (create the relationship and increment counts)
        await Followers.create({
          user_id,
          follower_id,
          followed_on: new Date(),
        });
  
        await updateUserProfileCounts(user_id, follower_id, true);
  
        return res.status(201).json({
          message: 'Successfully followed the user.',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while managing the follow relationship.',
      });
    }
});


router.get('/:userId/followers', async (req, res) => {
    const { userId } = req.params;
    
    try {
      // Fetch all followers for the given user
      const followers = await Followers.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            as: 'follower', // Alias used in the association
            attributes: ['user_id', 'user_name', 'user_first_name', 'user_last_name'],
          },
        ],
        attributes: ['followed_on', 'is_blocked'],
      });
  
      if (!followers.length) {
        return res.status(404).json({ message: 'No followers found for this user' });
      }
  
      res.json(followers);
    } catch (error) {
      console.error('Error fetching followers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });





// Helper function to update UserProfile counts
async function updateUserProfileCounts(userId, followerId, increment = true) {
    const adjustment = increment ? 1 : -1;
  
    // Check if UserProfile exists for the user being followed, if not create it
    await UserProfile.findOrCreate({
      where: { user_id: userId },
      defaults: {
        user_profile_id: userId,  // Assuming user_id is also user_profile_id in your schema
        followers_count: 0,
        following_count: 0,
        upload_count: 0,
      },
    });
  
    // Check if UserProfile exists for the follower, if not create it
    await UserProfile.findOrCreate({
      where: { user_id: followerId },
      defaults: {
        user_profile_id: followerId, // Assuming user_id is also user_profile_id in your schema
        followers_count: 0,
        following_count: 0,
        upload_count: 0,
      },
    });
    
    console.log("adjustment followerId", followerId);
    console.log("adjustment userId", userId);
    // Update following count for the follower
    await UserProfile.increment('following_count', {
      by: adjustment,
      where: { user_id: followerId },
    });
  
    // Update followers count for the user being followed
    await UserProfile.increment('followers_count', {
      by: adjustment,
      where: { user_id: userId },
    });
}


module.exports = router;