const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  mobileNumber: {
    type: String,
    required: 'Mobile number is required!',
    trim: true,
    minlength: 10,
    maxlength: 11,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 1024,
  },
});

module.exports = mongoose.model('User', userSchema);
