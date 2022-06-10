const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const controller = require('../controllers/onboardController');
const { getUserOnboardStatus, updateOnboardStatus } = controller;

router.get('/:user', auth, admin, getUserOnboardStatus);
router.put('/', auth, admin, updateOnboardStatus);

module.exports = router;
