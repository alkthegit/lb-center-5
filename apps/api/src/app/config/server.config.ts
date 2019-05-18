import * as path from 'path';
import * as dotenv from 'dotenv';

const dotEnvConfigPath = path.resolve(__dirname, '.env');
const configParsed = dotenv.config({ path: dotEnvConfigPath });
if (configParsed.error) {
    throw new Error(`config file couldn't be read, error: ${configParsed.error.message}`);
};

// секретный секрет для JWT
export const jwtSecret = process.env["JWT_SECRET"];