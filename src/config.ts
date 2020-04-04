
import { config as loadConfig } from 'dotenv';

loadConfig();

const { env } = process;

export default { 
    basket_url: env.BASKET_URL || 'http://localhost',
    port: parseInt(env.EXPOSE_PORT || '8080', 10),
    env: env.NODE_ENV || 'production',
    get debug() { return this.env !== 'production'; },
    version: require('../package.json').version,
};
