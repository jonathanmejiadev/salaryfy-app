import { body } from 'express-validator';

export const jobValidation = () => {
    return [
        body('jobName')
            .isLength({ min: 3 }).withMessage('must be at least 5 characters')
            .isAlphanumeric().withMessage('Username can only contain alphanumeric characters'),
        body('client')
            .isLength({ min: 3 }).withMessage('must be at least 5 characters')
            .isAlphanumeric().withMessage('Username can only contain alphanumeric characters'),
        body('pricePerHour')
            .isNumeric().withMessage('Price per hour must be a number')
    ]
};