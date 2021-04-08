import {
    validateRules,
    jobValidation,
    registerUserValidation

} from '../validations';

export const postRegisterUserValidation = [
    registerUserValidation,
    validateRules
];

export const postJobValidation = [
    jobValidation,
    validateRules
];


