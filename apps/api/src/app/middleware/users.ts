import { User } from '../models/index';
import { Context } from 'koa';

/**
 * Получает список всех пользоывателей в базе.
 * Устанавливает полученный список в текущем контексте запроса - ctx.state.users
 * 
 * @param ctx
 * @param next
 */
export const getAllUsers = async (ctx: Context, next) => {

    await User.sync();
    const foundUsers = await User.findAll();

    ctx.state.users = foundUsers
        .map(e => {
            return {
                username: e.username
            }
        });

    await next();
}