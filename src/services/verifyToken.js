const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).send('Access denied.');
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send('Invalid token.');
  }
};

module.exports = auth;
