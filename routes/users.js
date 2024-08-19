const { User, UserProfile} = require('../models');
const crypto = require('crypto');
var express = require('express');
var router = express.Router();
// API to insert mobile number and generate OTP
router.post('/register/mobile', async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Create a new user or update the existing one with OTP
    const [user, created] = await User.findOrCreate({
      where: { user_mobile_number: mobileNumber },
      defaults: { user_otp_verification: otp },
    });

    if (!created) {
      user.user_otp_verification = otp;
      await user.save();
    }

    // Send OTP to the user (in real application, via SMS or email)
    console.log(`OTP for ${mobileNumber}: ${otp}`);

    res.status(200).json({ message: 'OTP sent', otp }); // In production, do not send OTP in response
  } catch (error) {
    console.log("Error received", error);
    res.status(500).json({ error: 'Failed to register mobile number' });
  }
});

// API to verify OTP
router.post('/verify/otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Find the user by mobile number
    const user = await User.findOne({ where: { user_mobile_number: mobileNumber } });

    if (user && user.user_otp_verification === otp) {
      user.user_is_verified = true;
      user.user_otp_verification = null; // Clear the OTP after verification
      await user.save();

      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});



router.put("/update/user", async function (req, res) {
  try {
    const { mobileNumber, firstName, lastName, userName, location } = req.body;

    // Find the user by mobile number
    const user = await User.findOne({ where: { user_mobile_number: mobileNumber } });

    if (user) {
      // Update the user details
      user.user_first_name = firstName || user.user_first_name;
      user.user_last_name = lastName || user.user_last_name;
      user.user_name = userName || user.user_name;

      if (location) {
        user.user_latitude = location.latitude;
        user.user_longitude = location.longitude;
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'User details updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Failed to update user details' });
  }
});



router.get('/:user_id/profile', async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Fetch user information along with the associated user profile
    const user = await User.findOne({
      where: { user_id },
      include: {
        model: UserProfile,
        as: 'userProfile', 
      }
    });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
