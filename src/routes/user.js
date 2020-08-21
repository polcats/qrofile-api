const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const verify = require('../services/verifyToken');
const User = require('../models/User');
const validateProfile = require('../validators/profileValidator');

router.get('/profile', verify, async (req, res) => {
  const user = await User.findOne({
    _id: req.user._id,
  });
  if (!user) {
    res.status(HttpStatus.BAD_REQUEST).send({ error: 'User is not found.' });
    return;
  }

  res.status(HttpStatus.OK).send({
    ...user.toObject(),
    _id: user._id,
  });
});

router.put('/profile', verify, async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: error.details[0].message });
    return;
  }

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(HttpStatus.BAD_REQUEST).send({ error: 'No updates.' });
    return;
  }

  const mobileExists = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  if (mobileExists && mobileExists._id !== req.user_id) {
    res
      .status(HttpStatus.CONFLICT)
      .send({ error: 'Mobile number is already in use.' });
    return;
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      ...req.body,
    },
    { new: true, useFindAndModify: true },
  );
  if (!updatedUser) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to update profile.' });
    return;
  }

  res.status(HttpStatus.OK).send(updatedUser.toObject());
});

module.exports = router;
