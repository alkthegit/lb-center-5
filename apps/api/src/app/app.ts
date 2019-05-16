import * as Koa from 'koa';
import * as indexRoutes from './routes/index';
import * as usersRoutes from './routes/users';

const app = new Koa();

// подключаем главные маршрутизаторы
app.use(indexRoutes.routes);

// подключаем главные маршрутизаторы
app.use(usersRoutes.routes);


// подключаем маршрутизаторы users
const application = app.callback();

export default application;