
import { config as loadConfig } from 'dotenv';

loadConfig();

const defaultConfig = { BASKET_URL: 'http://localhost' };
export default { ...defaultConfig, ...process.env };
