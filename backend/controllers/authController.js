'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const helpers = require('../utils/helpers');
// const constants = require('../utils/constants');

// Get logged in user
const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Google callback
const googleAuthCallback = (req, res) => {
  try {
    //  Return the jsonwebtoken
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.cookie('x-auth-cookie', token);
        res.redirect(process.env.FRONTEND_URL);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Github callback
const githubAuthCallback = (req, res) => {
  try {
    //  Return the jsonwebtoken
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.cookie('x-auth-cookie', token);
        res.redirect(process.env.FRONTEND_URL);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Microsoft callback
const microsoftAuthCallback = (req, res) => {
  try {
    //  Return the jsonwebtoken
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.cookie('x-auth-cookie', token);
        res.redirect(process.env.FRONTEND_URL);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getLoggedInUser,
  googleAuthCallback,
  githubAuthCallback,
  microsoftAuthCallback,
};
