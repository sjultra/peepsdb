'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {auth} = require('../middleware/auth');
const controller = require('../controllers/authController');
const {
  getLoggedInUser,
  googleAuthCallback,
  githubAuthCallback,
  microsoftAuthCallback,
} = controller;

// Get logged in user
router.get('/', auth, getLoggedInUser);


// Google Authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.BACKEND_URL,
  }),
  googleAuthCallback
);

// Github Authentication
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.BACKEND_URL,
  }),
  githubAuthCallback
);

// // Microsoft Authentication
router.get('/microsoft', passport.authenticate('microsoft'));

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', {
    failureRedirect: process.env.BACKEND_URL,
  }),
  microsoftAuthCallback
);

module.exports = router;
