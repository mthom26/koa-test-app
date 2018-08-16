const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(ctx, next) {
  const { email, password, name } = ctx.request.body;
  if(!email || !name || !password) {
    console.log('Incorrect Submission');
    ctx.status = 401;
    ctx.body = {
      message: 'Incorrect Form submission'
    }
  } else {
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    await ctx.db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            const token = jwt.sign({
              id: user.id,
            }, process.env.JWT_SECRET_KEY);

            ctx.body = {
              user: user[0],
              token
            }
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => {
      console.log(err);
      ctx.body = {
        message: 'Could not create User'
      }
    });
  }
  next();
}

module.exports = register;