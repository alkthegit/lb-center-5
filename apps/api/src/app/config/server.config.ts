import * as path from 'path';
import * as dotenv from 'dotenv';

const dotEnvConfigPath = path.resolve(__dirname, '.env');
const configParsed = dotenv.config({ path: dotEnvConfigPath });
if (configParsed.error) {
    throw new Error(`config file couldn't be read, error: ${configParsed.error.message}`);
};

// секретный секрет для JWT
export const jwtSecret = process.env["JWT_SECRET"];

// продолжительность жизни веб-токена
let maxJWTSecondsAgeConfig = Number.parseInt(process.env["JWT_SECONDS_AGE"], 10);
if (!Number.isNaN(maxJWTSecondsAgeConfig) || maxJWTSecondsAgeConfig <= 0) {
    maxJWTSecondsAgeConfig = 4 * 60 * 60;
}
export const maxJWTSecondsAge: number = maxJWTSecondsAgeConfig;

export const isServerLoggingOn: boolean = +process.env['SERVER_LOGGING'] === 1 ? true : false;
