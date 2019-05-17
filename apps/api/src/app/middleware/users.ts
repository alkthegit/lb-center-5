import { User } from '../models/index';
import { Context } from 'koa';


export const getAllUsers = async (ctx: Context, next) => {
    await User.sync();
    const foundUsers = await User.findAll();

    ctx.state.users = foundUsers
        .map(e => {
            return {
                username: e.username,
                email: e.email
            }
        });
    await next();
}