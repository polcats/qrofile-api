const env = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./src/routes/auth');
const records = require('./src/routes/record');
const user = require('./src/routes/user');

env.config();
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connected.'),
);

app.use(express.json());
app.use('/api/user', auth);
app.use('/api/user', user);
app.use('/api', records);

app.listen(3000, () => console.log('Server is running.'));
