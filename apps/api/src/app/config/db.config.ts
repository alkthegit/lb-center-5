import { Sequelize } from 'sequelize';
import * as path from 'path';
import * as dotenv from 'dotenv';

const dotEnvConfigPath = path.resolve(__dirname, '.env');
const configParsed = dotenv.config({ path: dotEnvConfigPath });
if (configParsed.error) {
    throw new Error(`config file couldn't be read, error: ${configParsed.error.message}`);
};

// строка подключения к БД
export const dbUri = process.env["DB_URI"];

//  Единый экземпляр Sequelize для всего процесса - в соответствии с документацией
export const sequelize = new Sequelize(dbUri, {
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: null
});

export { Sequelize };