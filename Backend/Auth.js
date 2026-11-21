const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;


function createToken(customerId) {
  return jwt.sign({ customerId }, SECRET, { expiresIn: '1d' });
}


function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  try {
    const payload = jwt.verify(header.replace('Bearer ', ''), SECRET);
    req.customerId = payload.customerId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { createToken, requireAuth };