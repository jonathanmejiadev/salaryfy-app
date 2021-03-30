import { config } from 'dotenv';
config();

export default {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI_TESTING: process.env.MONGODB_URI_TESTING
};