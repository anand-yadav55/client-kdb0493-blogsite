const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 5 },
    username: { type: String },
    displayName: { type: String },
    token: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
