const dotenv = require('./dotenv')
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: dotenv.PORT,
        db: dotenv.DB_HOST,
        authCookieName: dotenv.COOKIE_NAME,
        authHeaderName: dotenv.HEADER_NAME,
        saltRounds: dotenv.SALT_ROUNDS,
        jwtSecret: dotenv.JWT_SECRET
    },
    production: {}
};

module.exports = config[env];
