const mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 11,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    hide: true,
    minlength: 6,
    maxlength: 1024,
  },
  joinedDate: {
    type: Date,
    required: true,
  },
});
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);
