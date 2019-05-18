import { User } from '../models/index';
import { Context } from 'koa';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { serverConfig } from '../config'

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
    data?: any,
    message?: string
}

/**
 * Порождает новый токен на основе переданного payload и секрета из переменной окружения
 * 
 * @param {{}} payload - полезная нагрузка для порождения токена
 * @returns {Promise<string>} обещание, содержащее токен
 */
const generateJwtToken = async (payload): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, serverConfig.jwtSecret,
            {
                expiresIn: '4h'
            }, (err, newToken) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(newToken);
                }
            }
        );
    });
}

/**
 * 
 * @param token Проверяет токен на корректность
 */
const verifyJwtToken = async (token: string): Promise<{}> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, serverConfig.jwtSecret,
            (err, payload) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(payload);
                }
            }
        );
    });
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
export const signup = async (ctx: Context, next) => {
    await User.sync();
    console.log({ username: ctx.request.body });

    const userData: UserData = {};
    const { username, password } = ctx.request.body;

    // Проверяем, нет ли уже такого пользователя
    const user = await User.findOne({ where: { username } });

    if (user) {
        // уведомляем об ошибке
        ctx.throw(200, 'Пользователь с таким именем уже существует');
    }
    else {
        // минимальная проверка пароля
        if (!password || password.length === 0) {
            ctx.throw(200, `Пароль не должен быть пустым, регистрация отменена`);
        }

        if (password.length < 6) {
            ctx.throw(200, `Пароль не должен быть слишком коротким, регистрация отменена`);
        }

        // генерация хэша для пароля
        const salt = await bcrypt.genSalt(6);
        const hash = await bcrypt.hash(password, salt);
        if (hash.length !== 60) {
            ctx.throw(`Серверная ошибка: сохранение пароля невозможно, регистрация отменена.`);
        }

        // создаем нового пользователя и возвращаем данные аутентификации
        const newUser = await User.create({ username, hash });

        if (newUser) {
            // если пользователь успешно создан, возвращаем данные для аутентификации клиенту

            // порождаем токен
            const token = await generateJwtToken({
                id: newUser.id,
                username: newUser.username
            });

            // устанавливаем данные для возврата
            userData.username = newUser.username;
            userData.authData = { token };
            userData.error = null;
        }
        else {
            ctx.throw(500, `Серверная ошибка: неизвестная ошибка взаимодействия с базой данных, регистрация отменена`);
        }
    }

    ctx.state.userData = userData;

    await next();
}

/**
 * Осуществляет вход пользователя на сайт
 *
 *
 */
export const signin = async (ctx: Context, next) => {
    await User.sync();

    const userData: UserData = {};

    // простейшая проверка входных данных
    const { username, password } = ctx.request.body;
    if (!username) {
        ctx.throw(200, `Имя пользователя не может быть пустым`);
    }

    if (!password) {
        ctx.throw(200, `Пароль не может быть пустым`);
    }

    if (password.length < 6) {
        ctx.throw(200, `Длина пароля не может быть меньше 6 символов`);
    }

    // поиск пользователя в базе
    const user = await User.findOne({ where: { username } });
    if (!user) {
        ctx.throw(200, `Пользователь не найден`);
    }

    // проверка пароля
    const hashMatch = await bcrypt.compare(password, user.hash);
    if (!hashMatch) {
        ctx.throw(200, `Неправильный пароль`);
    }

    // генерация jwt-токена
    const token = await generateJwtToken({
        id: user.id,
        username: user.username
    });

    // устанавливаем данные для возврата
    userData.username = user.username;
    userData.authData = { token };
    userData.error = null;

    ctx.state.userData = userData;

    await next();
}