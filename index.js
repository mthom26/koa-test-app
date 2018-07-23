const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

router.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Home' });
});

router.get('/about', async (ctx, next) => {
  await ctx.render('about', { title: 'About' });
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
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);