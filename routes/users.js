const Router = require('koa-router');

const router = new Router();

router.get('/users', async (ctx, next) => {
  ctx.body = { message: 'users' };
});

module.exports = router;