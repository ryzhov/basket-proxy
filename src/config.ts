
import { config as loadConfig } from 'dotenv';

loadConfig();

const defaultConfig = { BASKET_URL: 'http://localhost', EXPOSE_PORT: '80' };
export default { ...defaultConfig, ...process.env };
