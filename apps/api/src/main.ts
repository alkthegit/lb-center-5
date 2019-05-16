import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.response.set({
        'Content-type': 'application/json'
    });

    ctx.body = JSON.stringify({
        status: 'OK',
        data: 'Server is running'
    });
});

app.use(router.routes());

const server = app.listen(3000, "localhost", () => {
    const address = server.address();
    console.log(`Server has started at ${address.address}:${address.port}`);
});