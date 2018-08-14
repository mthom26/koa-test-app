const Router = require('koa-router');
const koaBody = require('koa-body');

const authenticate = require('../middlewares/authenticate');
const register = require('../middlewares/register');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message : 'Home Page' };
});

router.post('/register', koaBody(), register, async (ctx, next) => {
  console.log(ctx.body);
});

router.post('/login', koaBody(), authenticate, async (ctx, next) => {
  console.log(ctx.body);
  ctx.body = { ...ctx.body, message: 'Login' };
  console.log(ctx.body);
});

module.exports = router;