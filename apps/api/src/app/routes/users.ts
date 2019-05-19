import * as Router from 'koa-router';
import { getAllUsers } from '../middleware/users';
import { checkAuthenticated } from '../middleware/auth';

const router = new Router();

// USERS INDEX route
router.get('/users', checkAuthenticated, getAllUsers, async (ctx, next) => {
    ctx.body = {
        data: ctx.state.users
    };
});

const routes = router.routes();
export { routes };