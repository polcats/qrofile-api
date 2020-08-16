const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  validateRegistration,
  validateLogin,
} = require('../validators/authValidator');

router.post('/register', async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const mobileExists = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  if (mobileExists) {
    res.status(400).send('Mobile number is already in use.');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    password: hashedPw,
    joinedDate: new Date(),
  });

  try {
    let result = await user.save();
    res.status(200).send({
      ...result.toObject(),
      _id: result._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  if (!user) {
    res.status(400).send('Mobile number does not exist.');
    return;
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send('Incorrect password.');
    return;
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);

  res.status(200).send({
    ...user.toObject(),
    _id: user._id,
    token,
  });
});

module.exports = router;
