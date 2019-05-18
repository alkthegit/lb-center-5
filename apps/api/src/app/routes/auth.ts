import * as Router from 'koa-router';
import { signup, signin } from '../middleware/auth';
import { ServerResponse } from '../middleware/auth';
import * as koaBody from 'koa-body';


const router = new Router();

// AUTH SIGNUP route
router.post('/auth/signup', koaBody(), signup, async (ctx, next) => {
    // если ранее произошла ошибка, она попадет в единый обработчик при помои ctx.throw
    const serverResponse: ServerResponse = {
        data: ctx.state.userData,
        message: 'Пользователь успешно зарегистрирован'
    };

    ctx.response.body = serverResponse;
});

// AUTH SIGNIN route
router.post('/auth/signin', koaBody(), signin, async (ctx, next) => {
    // если ранее произошла ошибка, она попадет в единый обработчик при помои ctx.throw
    const serverResponse: ServerResponse = {
        data: ctx.state.userData,
        message: 'Вход успешно выполнен'
    };

    ctx.response.body = serverResponse;
});

const routes = router.routes();
export { routes };