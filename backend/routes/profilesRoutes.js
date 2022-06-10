const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { body } = require('express-validator');
const controller = require('../controllers/profilesController');
const {
  getCurrentUserProfile,
  createUserProfile,
  updateUserProfile,
  getAllProfiles,
} = controller;

//Get current user profile
router.get('/me', auth, getCurrentUserProfile);

//Create user profile
router.post(
  '/',
  [
    auth,
    [
      body('firstname', 'Firstname is required').not().isEmpty(),
      body('lastname', 'Lastname is required').not().isEmpty(),
      body('googleGmailId', 'Google gmail is required').not().isEmpty(),
      body('phone', 'Mobile Number is required').not().isEmpty(),
    ],
  ],
  createUserProfile
);

// Update user profile
router.put(
  '/',
  [
    auth,
    [
      body('firstname', 'Firstname is required').not().isEmpty(),
      body('lastname', 'Lastname is required').not().isEmpty(),
      body('googleGmailId', 'Google gmail is required').not().isEmpty(),
      body('phone', 'Mobile Number is required').not().isEmpty(),
    ],
  ],
  updateUserProfile
);

// Get all profiles
router.get('/', auth, getAllProfiles);

module.exports = router;
