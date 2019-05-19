import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as indexRoutes from './routes/index';
import * as usersRoutes from './routes/users';
import * as authRoutes from './routes/auth';
import { ServerResponse } from './middleware/auth';
import { logger } from './middleware/logger';
import { serverConfig } from './config';

const app = new Koa();
const isServerLoggingOn = serverConfig.isServerLoggingOn;

// обработчик ошибок
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        const serverResponse: ServerResponse = {
            error: err.message,
            data: null
        };

        ctx.status = err.status || 500;
        ctx.body = serverResponse;
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx: Koa.Context) => {
    console.log(err);
});


// подключаем cors
app.use(cors());

// подключаем логи
if (isServerLoggingOn) {
    app.use(logger);
}

// подключаем главные маршрутизаторы
app.use(indexRoutes.routes);

// подключаем маршрутизаторы users
app.use(usersRoutes.routes);

// подключаем маршрутизаторы users
app.use(authRoutes.routes);

const application = app.callback();

// экспортируем главный callback приложения для http-сервера Node.js
export default application;