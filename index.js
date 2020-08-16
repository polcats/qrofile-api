const env = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const records = require('./routes/record');

env.config();
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connected.'),
);

app.use(express.json());
app.use('/api/user', auth);
app.use('/api', records);

app.listen(3000, () => console.log('Server is running.'));
