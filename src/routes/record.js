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
      owner: req.user._id,
    });

    const connections = [];
    // const deletedConnections = [];
    if (records) {
      await Promise.all(
        records.map(async (item) => {
          const user = await User.findOne({
            _id: item.user._id,
          });
          if (user) {
            const userData = user.toObject();
            delete userData.settings;
            delete userData._id;
            connections.push({
              ...userData,
              _id: item._id,
              date: item.date,
            });
            //console.log(user);
          } else {
            // deletedConnections.push(item._id);
            connections.push({ _id: item._id, isDeleted: true });
          }
        }),
      );

      // If a connection decided to delete their profile, auto delete record.
      // console.log('Number of deleted connections:' + deletedConnections.length);
      // if (deletedConnections.length) {
      //   await Promise.all(
      //     deletedConnections.map(async (item) => {
      //       await Record.findByIdAndDelete({ _id: item._id });
      //     }),
      //   );
      // }
      res.status(HttpStatus.OK).send(connections);
      return;
    }

    res.status(HttpStatus.OK).send([]);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Cannot retrieve records.' });
  }
});

router.post('/records', verify, async (req, res) => {
  req.body.owner = req.user._id;

  if (req.body.user._id === req.body.owner) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'You cannot record yourself.' });
    return;
  }

  const { error } = validateRecord(req.body);
  if (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: error.details[0].message });
    return;
  }

  const recordExists = await Record.findOne({
    owner: req.body.owner,
    user: {
      _id: req.body.user._id,
    },
  });

  if (recordExists) {
    res.status(HttpStatus.CONFLICT).send({ error: 'Record already exists.' });
    return;
  }

  const record = new Record({
    owner: req.body.owner,
    date: new Date(),
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
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to add record.' });
  }
});

router.delete('/records', verify, async (req, res) => {
  const { error } = validateDelete(req.body);
  if (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: error.details[0].message });
    return;
  }

  try {
    let record = await Record.findByIdAndDelete({
      _id: req.body.id, // id of record to delete
    });

    // check if record owner is token owner
    if (record.owner !== req.user._id) {
      console.log('No permission!', record.owner, req.user._id);
      res
        .status(HttpStatus.FORBIDDEN)
        .send({ error: "You don't have permission." });
      return;
    }

    res.status(HttpStatus.OK).send(record);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to delete record.' });
  }
});

module.exports = router;
