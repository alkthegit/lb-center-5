import * as Router from 'koa-router';
const router = new Router();

router.get('/users', async (ctx) => {
    ctx.body = 'Users page';
});

const routes = router.routes();
export { routes };