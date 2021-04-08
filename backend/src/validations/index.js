import { ValidationResult } from 'express-validator';
export * from './user';
export * from './job';

export const validation = (req, res) => {
    const errors = ValidationResult(req);
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
