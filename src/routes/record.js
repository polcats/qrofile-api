const HttpStatus = require('http-status-codes');
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
      res.status(HttpStatus.OK).send(connections);
      return;
    }

    res.status(HttpStatus.OK).send([]);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
});

router.post('/records', verify, async (req, res) => {
  const { error } = validateRecord(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);
    return;
  }

  const recordExists = await Record.findOne({
    owner: req.body.owner,
    user: {
      _id: req.body.user._id,
    },
  });

  if (recordExists) {
    res.status(HttpStatus.CONFLICT).send('Record already exists.');
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
    res.status(HttpStatus.OK).send({
      ...result.toObject(),
      _id: result._id,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
});

router.delete('/records', verify, async (req, res) => {
  const { error } = validateDelete(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);
    return;
  }

  try {
    let result = await Record.findByIdAndDelete({
      _id: req.body.id,
    });
    res.status(HttpStatus.OK).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
});

module.exports = router;
