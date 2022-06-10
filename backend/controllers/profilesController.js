const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const Onboard = require('../models/Onboard');

// @route    GET /profile/me
// @desc     Get current user profile
// @access   Private
const getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user',
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    POST /profiles
// @desc     Create user profile
// @access   Private
const createUserProfile = async (req, res) => {
  // If errors, return errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // If no errors
  const {
    firstname,
    lastname,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.role = 'Guest';
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (alias) profileFields.alias = alias;
  if (skypeId) profileFields.skypeId = skypeId;
  if (googleGmailId) profileFields.googleGmailId = googleGmailId;
  if (appleEmailId) profileFields.appleEmailId = appleEmailId;
  if (phone) profileFields.phone = phone;
  if (timeZoneUrl) profileFields.timeZoneUrl = timeZoneUrl;
  if (daysPerWeek) profileFields.daysPerWeek = daysPerWeek;
  if (hoursPerDay) profileFields.hoursPerDay = hoursPerDay;
  if (localCurrencyUrl) profileFields.localCurrencyUrl = localCurrencyUrl;
  if (femSlackProfileUrl) profileFields.femSlackProfileUrl = femSlackProfileUrl;
  if (startDate) profileFields.startDate = startDate;
  if (paymentProfileUrl) profileFields.paymentProfileUrl = paymentProfileUrl;
  if (twitterProfileUrl) profileFields.twitterProfileUrl = twitterProfileUrl;
  if (facebookProfileUrl) profileFields.facebookProfileUrl = facebookProfileUrl;
  if (githubProfileUrl) profileFields.githubProfileUrl = githubProfileUrl;
  if (linkedinProfileUrl) profileFields.linkedinProfileUrl = linkedinProfileUrl;
  if (calendlyProfileUrl) profileFields.calendlyProfileUrl = calendlyProfileUrl;

  // Create onboard object
  const onboardFields = {};
  onboardFields.user = req.user.id;
  onboardFields.firstname = firstname;
  onboardFields.lastname = lastname;

  try {
    // Create profile & onboard
    let profile = new Profile(profileFields);
    let onboard = new Onboard(onboardFields);

    await profile.save();
    await onboard.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT /profiles
// @desc     Update user profile
// @access   Private
const updateUserProfile = async (req, res) => {
  // If errors, return errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // If no errors
  const {
    firstname,
    lastname,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (alias) profileFields.alias = alias;
  if (skypeId) profileFields.skypeId = skypeId;
  if (googleGmailId) profileFields.googleGmailId = googleGmailId;
  if (appleEmailId) profileFields.appleEmailId = appleEmailId;
  if (phone) profileFields.phone = phone;
  if (timeZoneUrl) profileFields.timeZoneUrl = timeZoneUrl;
  if (daysPerWeek) profileFields.daysPerWeek = daysPerWeek;
  if (hoursPerDay) profileFields.hoursPerDay = hoursPerDay;
  if (localCurrencyUrl) profileFields.localCurrencyUrl = localCurrencyUrl;
  if (femSlackProfileUrl) profileFields.femSlackProfileUrl = femSlackProfileUrl;
  if (startDate) profileFields.startDate = startDate;
  if (paymentProfileUrl) profileFields.paymentProfileUrl = paymentProfileUrl;
  if (twitterProfileUrl) profileFields.twitterProfileUrl = twitterProfileUrl;
  if (facebookProfileUrl) profileFields.facebookProfileUrl = facebookProfileUrl;
  if (githubProfileUrl) profileFields.githubProfileUrl = githubProfileUrl;
  if (linkedinProfileUrl) profileFields.linkedinProfileUrl = linkedinProfileUrl;
  if (calendlyProfileUrl) profileFields.calendlyProfileUrl = calendlyProfileUrl;

  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id,
        },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // If no profile, Create one
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /profiles
// @desc     Get all profiles
// @access   Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});

    if (!profiles) {
      return res.status(400).json({
        msg: 'Profiles not found',
      });
    }

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCurrentUserProfile,
  createUserProfile,
  updateUserProfile,
  getAllProfiles,
};
