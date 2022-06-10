const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  uid: {
    type: String,
  },
  provider: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  role: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
