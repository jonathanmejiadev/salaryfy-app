import { config } from 'dotenv';
const envFound = config();

if (!envFound) {
    throw new Error('.env file not found');
};


/*
export default {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI_TESTING: process.env.MONGODB_URI_TESTING,
    log: {
        level: process.env.LOG_LEVEL
    }
};
*/

export default {
    port: process.env.PORT,
    api: {
        prefix: '/v1'
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        testing: process.env.MONGODB_URI_TESTING
    },
    jwt: {
        secret: process.env.SECRET
    },
    log: {
        level: process.env.LOG_LEVEL
    }
};