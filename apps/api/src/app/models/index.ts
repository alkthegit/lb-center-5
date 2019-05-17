import UserFactory from './User';
import { sequelize } from '../config/db';

// инициализация модели. если делать через sequelize.import, то возникает проблема с путями в коде webpack
export const User = UserFactory(sequelize);