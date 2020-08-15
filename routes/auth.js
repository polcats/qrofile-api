const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
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
