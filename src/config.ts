
const { env } = process;

export default {
    appName: env.APP_NAME || 'undefined',
    basketUrl: env.BASKET_URL || 'http://localhost',
    port: parseInt(env.EXPOSE_PORT || '8080', 10),
    env: env.NODE_ENV || 'production',
    get debug() { return this.env !== 'production'; },
    version: env.APP_VERSION || '0.0.0',
    // -- TODO: use command to update hash => 'git rev-parse HEAD'
    gitHash: env.GIT_HASH || '00000000',
    origin: ['http://uiptel.com', 'http://172.25.0.2:8080'],
};
