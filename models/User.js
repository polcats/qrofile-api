const mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();

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
    required: [true, 'Invalid mobile number'],
    trim: true,
    minlength: [10, 'Mininum characters not reached (10)!'],
    maxlength: [11, 'Maximum characters exceeded (11)!'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    hide: true,
    minlength: 6,
    maxlength: 1024,
  },
});
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);
