const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', User);
