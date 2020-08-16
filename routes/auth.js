const router = require('express').Router();
const User = require('../models/User');
const validateRegistration = require('../validators/authValidator');

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

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    password: req.body.password,
  });

  try {
    let result = await user.save();
    res.status(200).send(result.toObject());
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
