const Router = require('koa-router');
const koaBody = require('koa-body');

const authenticate = require('../middlewares/authenticate');

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Home' });
});

router.post('/login', koaBody(), authenticate, async (ctx, next) => {
  await ctx.render('protected', { title: 'Protected' });
});

module.exports = router;