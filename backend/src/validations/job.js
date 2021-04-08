import { body } from 'express-validator';
import { TECHNOLOGIES } from '../constants';

const _name = body('name')
    .matches(/^[\w\-\s]+$/).withMessage('Job name can only contain alphanumeric characters')
    .isLength({ min: 3 }).withMessage('Job name must be at least 3 characters')
    .isLength({ max: 15 }).withMessage('Job name must be at most 15 characters');

const _client = body('client')
    .matches(/^[\w\-\s]+$/).withMessage('Client can only contain alphanumeric characters')
    .isLength({ min: 3 }).withMessage('Client must be at least 3 characters')
    .isLength({ max: 15 }).withMessage('Client must be at most 15 characters');

const _pricePerHour = body('pricePerHour')
    .isInt({ min: 1, max: 4999 }).withMessage('Price per hour must be a number between 1 and 4999');

const _technologies = body('technologies').custom(techs => {
    if (techs.length === 0) return true;
    techs.forEach(tech => {
        if (!TECHNOLOGIES.includes(tech)) {
            throw new Error('Technology not available');
        }
    })
    return true;
});

export const jobValidation = [
    _name,
    _client,
    _pricePerHour,
    _technologies
];
