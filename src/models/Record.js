const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  user: {
    _id: {
      type: String,
      required: true,
    },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },
    // mobileNumber: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   minlength: 10,
    //   maxlength: 11,
    // },
  },
  // socials: {
  //   facebook: {
  //     type: String,
  //     required: false,
  //   },
  //   facebook: {
  //     type: String,
  //     required: false,
  //   },
  //   twitter: {
  //     type: String,
  //     required: false,
  //   },
  //   instagram: {
  //     type: String,
  //     required: false,
  //   },
  //   linkedIn: {
  //     type: String,
  //     required: false,
  //   },
  //   github: {
  //     type: String,
  //     required: false,
  //   },
  //   stackOverflow: {
  //     type: String,
  //     required: false,
  //   },
  //   website: {
  //     type: String,
  //     required: false,
  //   },
  // },
});

module.exports = mongoose.model('Record', recordSchema);
