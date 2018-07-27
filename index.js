require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const render = require('koa-ejs');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.status = 400;
    ctx.body = `There was an error: ${err.message}`;
    console.log('Error: ', err.message);
  }
});

app.use(logger());
app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(indexRoutes.allowedMethods());
app.use(userRoutes.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
