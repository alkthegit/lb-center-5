import * as Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Index page';
});

const routes = router.routes();
export { routes };