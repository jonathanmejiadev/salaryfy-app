import mongoose from 'mongoose';
import config from '../../config';
import logger from '../logger';

export default async function mongooseConnection() {
    try {
        await mongoose.connect(config.mongodb.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        logger.info('MongoDB connection established successfully');
    } catch (err) {
        logger.error('Mongoose connection error: ', err);
    }
};