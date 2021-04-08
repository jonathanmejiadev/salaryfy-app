import { body } from 'express-validator';

export const registerValidation = () => {
    return [
        body('username')
            .isAlphanumeric().withMessage('Username can only contain alphanumeric characters')
            .isLength({ min: 4 }).withMessage('Username must be at least 4 characters')
            .isLength({ max: 15 }).withMessage('Username must be at most 15 characters'),
        body('email')
            .isEmail().withMessage('Must be a valid email'),
        body('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ]
};