const jwt = require('jsonwebtoken');

module.exports = (ctx) => {
  if(ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, process.env.JWT_SECRET_KEY)
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed'
    };
  }
  return ctx;
};
