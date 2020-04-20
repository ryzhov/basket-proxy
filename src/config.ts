import { hostname } from 'os';
const { env } = process;

export default {
    host: hostname(),
    app: env.APP_NAME || 'undefined',
    basketUrl: env.BASKET_URL || 'http://localhost',
    port: parseInt(env.EXPOSE_PORT || '80', 10),
    env: env.NODE_ENV || 'production',
    get debug() { return this.env !== 'production'; },
    version: env.APP_VERSION || '0.0.0',
    gitHash: env.GIT_HASH || '00000000',
    origin: ['http://uiptel.com', 'http://172.25.0.2:8080'],
    basketFetchInterval: parseInt(env.BASKET_FETCH_INTERVAL || '3600000', 10) // one hour default basket fetch interval
};
