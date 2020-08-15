const env = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');

env.config();
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database connected.'),
);

app.use(express.json());
app.use('/api/user', auth);

app.listen(3000, () => console.log('Server is running.'));
