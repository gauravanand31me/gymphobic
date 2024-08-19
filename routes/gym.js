var express = require('express');
var router = express.Router();
const { Gym, GymImage, GymReview, GymReviewComment, User} = require('../models'); // Import the Gym model

router.post("/add-gym", async function (req, res) {
    try {
        // Example demo data
        const demoGymData = {
          name: "Demo Gym 4",
          description: "A demo gym for testing.",
          rating: 4.6,
          gym_latitude: 40.7128,
          gym_longitude: -74.0060,
          gym_contact_number: "123-456-7890",
        };
    
        // Insert the demo data into the database
        const newGym = await Gym.create(demoGymData);
    
        // Send the created gym data as a response
        res.status(201).json({
          message: 'Gym added successfully',
          gym: newGym,
        });
      } catch (error) {
        console.error('Error adding gym:', error);
        res.status(500).json({ error: 'Failed to add gym' });
      }
});


router.get("/all", async function (req, res) {
    
    try {
        // Fetch all gym records from the database
        const gyms = await Gym.findAll();
    
        // Check if any gyms were found
        if (gyms.length === 0) {
          return res.status(404).json({ message: 'No gyms found' });
        }
    
        // Send the gym details as a response
        res.status(200).json(gyms);
      } catch (error) {
        console.error('Error fetching gyms:', error);
        res.status(500).json({ error: 'Failed to fetch gyms' });
      }

});


router.post("/add-gym-images", async function (req, res) {
    try {
        const { gym_id, images } = req.body;
    
        // Validate that images array is provided
        if (!images || images.length === 0) {
          return res.status(400).json({ error: 'Images array is required' });
        }
    
        // Insert images into GymImages table
        const gymImages = await GymImage.bulkCreate(images.map(image => ({
          gym_id,
          image_url: image.url,
          upload_date: image.uploadDate || new Date(),
        })));
    
        res.status(201).json({
          message: 'Gym images added successfully',
          images: gymImages,
        });
      } catch (error) {
        console.error('Error adding gym images:', error);
        res.status(500).json({ error: 'Failed to add gym images' });
      }
});


router.get("/:gym_id", async function (req, res) {
    try {
        const { gym_id } = req.params;
        
        // Fetch the gym details along with associated images
        const gym = await Gym.findOne({
          where: { gym_id },
          include: [
            {
              model: GymImage,
              as: 'images',
              attributes: ['image_id', 'image_url', 'upload_date'], // Select specific fields from GymImage
            }
          ]
        });
    
        // Check if the gym was found
        if (!gym) {
          return res.status(404).json({ message: 'Gym not found' });
        }
    
        // Send the gym details and associated images as a response
        res.status(200).json(gym);
      } catch (error) {
        console.error('Error fetching gym details:', error);
        res.status(500).json({ error: 'Failed to fetch gym details' });
      }
});

router.post("/review/add", async function (req, res) {
    try {
        const { gym_id, user_id, user_rating_star, user_description } = req.body;
    
        // Validate input
        if (!gym_id || !user_id || !user_rating_star) {
          return res.status(400).json({ error: 'Gym ID, User ID, and Rating are required.' });
        }
    
        // Create a new gym review
        const newReview = await GymReview.create({
          gym_id,
          user_id,
          user_rating_star,
          user_description,
        });
    
        return res.status(201).json({
          message: 'Review added successfully',
          review: newReview,
        });
      } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'An error occurred while adding the review.' });
      }
});


router.get('/review/:gym_id', async (req, res) => {
    try {
      const { gym_id } = req.params;
  
      // Find all reviews for the given gym_id
      const reviews = await GymReview.findAll({
        where: { gym_id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['user_id', 'user_name', 'user_first_name', 'user_last_name'], // Include user details
          },
        ],
      });
  
      // If no reviews found, return a message
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this gym.' });
      }
  
      // Return the reviews
      return res.status(200).json({
        message: `Reviews for gym ID ${gym_id}`,
        reviews,
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'An error occurred while fetching the reviews.' });
    }
  });



  router.post('/review/comment', async (req, res) => {
    const t = await GymReview.sequelize.transaction();
  
    try {
      const { gym_review_id, user_id, agree, disagree, user_comment } = req.body;
  
      // Ensure at least one of agree, disagree, or user_comment is provided
      if (agree === undefined && disagree === undefined && !user_comment) {
        return res.status(400).json({ message: 'Please provide either agree, disagree, or a comment.' });
      }
  
      // Find the GymReview by gym_review_id
      const review = await GymReview.findByPk(gym_review_id);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found.' });
      }
  
      // Increment agree or disagree count if applicable
      if (agree) {
        review.agree_count += 1;
      }
  
      if (disagree) {
        review.disagree_count += 1;
      }
  
      // Save the updated review
      await review.save({ transaction: t });
  
      // Create a new GymReviewComment entry
      const reviewComment = await GymReviewComment.create({
        gym_review_id,
        user_id,
        agree: agree || null,
        disagree: disagree || null,
        user_comment: user_comment || null,
      }, { transaction: t });
  
      await t.commit();
  
      return res.status(201).json({
        message: 'Review comment added successfully',
        reviewComment,
      });
    } catch (error) {
      await t.rollback();
      console.error('Error adding review comment:', error);
      return res.status(500).json({ error: 'An error occurred while adding the review comment.' });
    }
  });

module.exports = router;