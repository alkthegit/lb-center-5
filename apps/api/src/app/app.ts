import * as Koa from 'koa';
import * as indexRoutes from './routes/index';
import * as usersRoutes from './routes/users';
import * as dotenv from 'dotenv';
import * as path from 'path';

const dotEnvConfigPath = path.resolve(__dirname, ".env");
dotenv.config({ path: dotEnvConfigPath })
const dbUri = process.env["DB_URI"];

const app = new Koa();

// подключаем главные маршрутизаторы
app.use(usersRoutes.routes);

// подключаем маршрутизаторы users
const application = app.callback();

export default application;