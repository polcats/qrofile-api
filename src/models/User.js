const mongoose = require('mongoose');
const { boolean } = require('@hapi/joi');
let mongooseHidden = require('mongoose-hidden')();

const SocialAccount = {
  name: {
    type: String,
    required: false,
  },
  enabled: {
    type: Boolean,
  },
  type: Object,
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 11,
  },
  password: {
    type: String,
    trim: true,
    hide: true,
    minlength: 6,
    maxlength: 1024,
  },
  joinedDate: {
    type: Date,
  },
  facebook: SocialAccount,
  twitter: SocialAccount,
  instagram: SocialAccount,
  linkedIn: SocialAccount,
  github: SocialAccount,
  stackOverflow: SocialAccount,
  website: SocialAccount,
  settings: {
    theme: {
      type: String,
    },
  },
});
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);
