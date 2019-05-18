import UserFactory from './User';
import { dbConfig } from '../config';

// инициализация модели. если делать через sequelize.import, то возникает проблема с путями в коде webpack
export const User = UserFactory(dbConfig.sequelize);