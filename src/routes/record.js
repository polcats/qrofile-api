const router = require('express').Router();
const verify = require('../services/verifyToken');
const Record = require('../models/Record');
const User = require('../models/User');
const {
  validateRecord,
  validateDelete,
} = require('../validators/recordValidator');

router.get('/records', verify, async (req, res) => {
  try {
    const records = await Record.find({
      owner: req.body.owner,
    });

    const connections = [];
    if (records) {
      await Promise.all(
        records.map(async (item) => {
          const user = await User.findOne({
            _id: item.user._id,
          });
          if (user) {
            connections.push({ ...user.toObject(), _id: item._id });
            console.log(user);
          }
        }),
      );
      res.status(200).send(connections);
      return;
    }

    res.status(200).send([]);
  } catch (error) {
    res.status(400).send([]);
  }
});

router.post('/records', verify, async (req, res) => {
  const { error } = validateRecord(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const recordExists = await Record.findOne({
    owner: req.body.owner,
    user: {
      _id: req.body.user._id,
    },
  });

  if (recordExists) {
    res.status(400).send('Record already exists.');
    return;
  }

  const record = new Record({
    owner: req.body.owner,
    user: {
      _id: req.body.user._id,
    },
  });

  try {
    let result = await record.save();
    res.status(200).send({
      ...result.toObject(),
      _id: result._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/records', verify, async (req, res) => {
  const { error } = validateDelete(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    let result = await Record.findByIdAndDelete({
      _id: req.body.id,
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
