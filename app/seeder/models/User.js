const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
