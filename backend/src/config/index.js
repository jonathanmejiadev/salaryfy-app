import { config } from 'dotenv';
const envFound = config();

if (!envFound) {
    throw new Error('.env file not found');
};

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