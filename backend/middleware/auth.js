const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const helpers = require('../utils/helpers');
// const constants = require('../utils/constants');


const auth = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //  Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Ensure user is an admin
const admin = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user.id,
  });

  if (user.role === 'Admin') {
    next();
  } else {
    res.status(401).json({
      msg: 'Unauthorized',
    });
  }
};

module.exports = { auth, admin };
