const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  user: {
    _id: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('Record', recordSchema);
