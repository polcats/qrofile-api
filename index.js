const express = require('express');
const auth = require('./routes/auth');

const app = express();

app.use('/api/user', auth);

app.listen(3000, () => console.log('Server is running.'));
