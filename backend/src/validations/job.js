import { body } from 'express-validator';

export const jobValidation = () => {
    return [
        body('jobName')
            .isLength({ min: 3 }).withMessage('Job name must be at least 5 characters')
            .isLength({ max: 15 }).withMessage('Job name must be at most 15 characters')
            .matches(/^[\w\-\s]+$/).withMessage('Job name can only contain alphanumeric characters'),
        body('client')
            .isLength({ min: 3 }).withMessage('Client must be at least 5 characters')
            .isLength({ max: 15 }).withMessage('Client must be at most 15 characters')
            .matches(/^[\w\-\s]+$/).withMessage('Client can only contain alphanumeric characters'),
        body('pricePerHour')
            .isNumeric().withMessage('Price per hour must be a number')
    ]
};