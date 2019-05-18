import { User } from '../models/index';
import { Context } from 'koa';

export interface AuthData {
    token: string
};

export interface ServerError {
    message,
    stack?
}

export interface UserData {
    username?: string,
    authData?: AuthData,
    error?: ServerError
}

export interface ServerResponse {
    error?: string,
    data?: any
}

/**
 * Получает список всех пользоывателей в базе.
 * Устанавливает полученный список в текущем контексте запроса - ctx.state.users
 * 
 * @param ctx - параметр движка Koa
 * @param next - параметр движка Koa
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

/**
 * Регистрирует нового пользователя в базе, если его еще там нет.
 * Устанавливает результаты работы в контексте текущего запроса:
 * 
 * Если регистрация прошла успешно:
 *  ctx.state.user = <new_user>
 * 
 * Если регистрация не прошла успешно - ошибка
 * 
 * @param ctx 
 * Если
 * @param next 
 * 
 * 
 */
export const signupUser = async (ctx: Context, next) => {
    await User.sync();

    const userData: UserData = {};
    const { username, password } = ctx.request.body;

    // Проверяем, нет ли уже такого пользователя
    const user = await User.findOne({ where: { username } });

    if (user) {
        ctx.throw(200, 'User already exists');
        // const error: Error = new Error('User already exists');
        // userData.error = {
        //     message: error.message,
        //     stack: error.stack
        // };
    }
    else {
        // создаем нового пользователя и возвращаем данные аутентификации
        const newUser = await User.create({
            username, hash: password
        });

        if (newUser) {
            userData.username = newUser.username;
            userData.authData = null;
            userData.error = null;
        }
        else {
            ctx.throw(500);
        }
    }

    ctx.state.userData = userData;

    await next();
}