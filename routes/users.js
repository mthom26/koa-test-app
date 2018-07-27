const Router = require('koa-router');

const router = new Router();

router.get('/users', async (ctx, next) => {
  await ctx.render('users', { title: 'Users' });
});

module.exports = router;