const jwt = require('jsonwebtoken');

module.exports = jwt({
  secret: process.env.JWT_SECRET_KEY
});
