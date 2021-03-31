/*
import mongoose from 'mongoose';
import config from '../config'

before(done => {
    mongoose.connect(config.MONGODB_URI_TESTING);
    mongoose.connection
        .once('open', () => {
            console.log('MongoDB database TEST is connected');
            done()
        })
        .on('error', err => {
            console.warn('Warning', err);
        });
});
*/
"use strict";