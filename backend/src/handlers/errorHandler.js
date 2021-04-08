import logger from '../loaders/logger';

export const errorNotFoundHandler = (req, res, next) => {
    const err = new Error(`Requested URL ${req.path} not found`);
    err.statusCode = 404;
    next(err);
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);
    if (statusCode === 500) err.message = 'Server Internal Error';
    return res.status(statusCode).json({ success: false, error: err.title, message: err.message, code: statusCode });

};
