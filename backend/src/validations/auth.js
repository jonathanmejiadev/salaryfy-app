import { body } from 'express-validator';

const _username = body('username')
    .isAlphanumeric().withMessage('Username can only contain alphanumeric characters')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters')
    .isLength({ max: 15 }).withMessage('Username must be at most 15 characters');

const _email = body('email')
    .isEmail().withMessage('Must be a valid email');

const _password = body('password')
    .isAlphanumeric().withMessage('Password can only contain alphanumeric characters')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters');

export const registerUserValidation = [
    _username,
    _email,
    _password
];
