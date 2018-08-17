const Router = require('koa-router');
const koaBody = require('koa-body');

const login = require('../middlewares/login');
const register = require('../middlewares/register');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message : 'Home Page' };
});

router.post('/register', koaBody(), register, async (ctx, next) => {
  console.log(ctx.body);
});

router.post('/login', koaBody(), login, async (ctx, next) => {
  //ctx.body = { ...ctx.body };
  //console.log(ctx.body);
});

module.exports = router;