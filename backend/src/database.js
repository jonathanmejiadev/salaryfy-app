import mongoose from 'mongoose';
import config from './config';

export default async function mongoConnect() {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('MongoDB database connection established successfully');
    } catch (err) {
        console.log(err);
    }

};