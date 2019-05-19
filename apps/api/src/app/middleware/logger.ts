import { Context } from 'koa';

/**
 * Выводит данные запроса в консоль
 * 
 * @param ctx
 * @param next
 */
export const logger = async (ctx: Context, next) => {
    console.log(ctx.request);
    await next();
}