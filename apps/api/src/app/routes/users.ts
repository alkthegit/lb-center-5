import * as Router from 'koa-router';
import { getAllUsers } from '../middleware/users';

const router = new Router();

// USERS INDEX route
router.get('/users', getAllUsers, async (ctx, next) => {
    ctx.body = {
        data: ctx.state.users
    };
});

const routes = router.routes();
export { routes };