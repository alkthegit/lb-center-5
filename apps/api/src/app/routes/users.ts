import * as Router from 'koa-router';
import { getAllUsers, signupUser } from '../middleware/users';
import { ServerResponse } from '../middleware/users';
import * as koaBody from 'koa-body';


const router = new Router();

// USERS INDEX route
router.get('/users', getAllUsers, async (ctx, next) => {
    ctx.body = {
        data: ctx.state.users
    };
});

// USES CREATE route
router.post('/users', koaBody(), signupUser, async (ctx, next) => {
    // если ранее произошла ошибка, она попадет в единый обработчик при помои ctx.throw
    const serverResponse: ServerResponse = {
        data: ctx.state.userData
    };

    ctx.response.body = serverResponse;
});

const routes = router.routes();
export { routes };