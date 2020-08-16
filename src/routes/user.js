const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const verify = require('../services/verifyToken');
const User = require('../models/User');
const validateProfile = require('../validators/profileValidator');

router.put('/profile', verify, async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);
    return;
  }

  if (
    Object.keys(req.body.newProfile).length === 0 &&
    req.body.newProfile.constructor === Object &&
    Object.keys(req.body.socials).length === 0 &&
    req.body.socials.constructor === Object
  ) {
    res.status(HttpStatus.BAD_REQUEST).send('No updates.');
    return;
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    {
      ...req.body.newProfile,
      socials: {
        ...req.body.socials,
      },
    },
    { new: true, useFindAndModify: false },
  );
  if (!updatedUser) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send('Failed to update profile');
    return;
  }

  res.status(HttpStatus.OK).send(updatedUser.toObject());
});

module.exports = router;
