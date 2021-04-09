import ExpressServer from './server/expressServer';
import logger from './logger';
import config from '../config'
import mongooseConnection from './mongoose';

export default async () => {
    const server = new ExpressServer();
    try {
        await mongooseConnection();
        await server.start();
        logger.info(`
        ###################################################
        🛡️  Server listening on: http://localhost:${config.port}/v1 🛡️
        ###################################################
        `);

    } catch (err) {
        logger.error(`### ⚠️ Server connection Error ⚠️ ### 
                      ${err}
                     `);
    };
};