import { validationResult } from 'express-validator';
export * from './auth';
export * from './job';

export const validateRules = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errorsMsgs = errors.array().map(err => ({ [err.param]: err.msg }));
    const response = {
        success: false,
        errors: errorsMsgs
    };
    return res.status(422).json(response);
};
