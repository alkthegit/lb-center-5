import * as Router from 'koa-router';
import { getAllUsers } from '../middleware/users';

const router = new Router();

// INDEX route
router.get('/users', getAllUsers, async (ctx) => {
    const users = ctx.state.users;
    ctx.body = {
        data: users
    };
});

// CREATE route
router.post('/users', async (ctx) => {

});

const routes = router.routes();
export { routes };