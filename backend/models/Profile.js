const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  role: {
    type: String,
  },
  firstname: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastname: {
    type: String,
    lowercase: true,
    required: true,
  },
  alias: {
    type: String,
    lowercase: true,
  },
  skypeId: {
    type: String,
    lowercase: true,
  },
  googleGmailId: {
    type: String,
    lowercase: true,
    required: true,
  },
  appleEmailId: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  timeZoneUrl: {
    type: String,
    lowercase: true,
  },
  daysPerWeek: {
    type: String,
    lowercase: true,
  },
  hoursPerDay: {
    type: String,
    lowercase: true,
  },
  localCurrencyUrl: {
    type: String,
    lowercase: true,
  },
  femSlackProfileUrl: {
    type: String,
    lowercase: true,
  },
  startDate: {
    type: String,
    lowercase: true,
  },
  paymentProfileUrl: {
    type: String,
    lowercase: true,
  },
  twitterProfileUrl: {
    type: String,
    lowercase: true,
  },
  facebookProfileUrl: {
    type: String,
    lowercase: true,
  },
  githubProfileUrl: {
    type: String,
    lowercase: true,
  },
  linkedinProfileUrl: {
    type: String,
    lowercase: true,
  },
  calendlyProfileUrl: {
    type: String,
    lowercase: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
