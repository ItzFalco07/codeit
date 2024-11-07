const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,  // Make password optional for Google login
  },
  image: {
  	type: String,
  	required:false
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('users', userSchema);
