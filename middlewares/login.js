const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function login(ctx, next) {
  const { email, password } = ctx.request.body;
  if(!email || !password) {
    console.log('Incorrect Submission');
    ctx.status = 401;
    ctx.body = {
      message: 'Incorrect Form submission'
    };
  } else {
    const data = await ctx.db.select('hash').from('login').where({ email: email });
    const isValid = await bcrypt.compare(password, data[0].hash);
    if(isValid) {
      const user = await ctx.db.select('id', 'name', 'email')
        .from('users').where({ email: email });

      const token = jwt.sign({
        id: user.id,
      }, process.env.JWT_SECRET_KEY);

      ctx.body = {
        userData: user[0],
        token
      };
    } else {
      ctx.body = {
        message: 'Incorrect login/password'
      };
    }
  }
  next();
}

module.exports = login;