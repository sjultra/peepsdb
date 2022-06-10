const mongoose = require('mongoose');

const OnboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstname: {
    type: String,
    lowercase: true,
  },
  lastname: {
    type: String,
    lowercase: true,
  },
  role: {
    type: String,
    default: 'Guest',
  },
  mutualNdaSent: {
    type: String,
    default: 'No',
  },
  mutualNdaSigned: {
    type: String,
    default: 'No',
  },
  emailSetup: {
    type: String,
    default: 'Pending',
  },
  sendReceiveEmail: {
    type: String,
    default: 'Pending',
  },
  msTeamsSetup: {
    type: String,
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('onboard', OnboardSchema);
