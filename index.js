require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const koaBody = require('koa-body');

const authenticate = require('./middlewares/authenticate');

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

router.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Home' });
});

router.get('/users', async (ctx, next) => {
  await ctx.render('users', { title: 'Users' });
});

router.get('/protected', authenticate, async (ctx, next) => {
  await ctx.render('protected', { title: 'Protected' });
});

router.post('/login', koaBody(), authenticate, async (ctx, next) => {
  await ctx.render('protected', { title: 'Protected' });
})

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
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
