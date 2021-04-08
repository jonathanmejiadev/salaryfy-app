import { Success, SuccessToken } from '../handlers/successHandler';
import * as authService from '../services/auth.service';

export const registerUser = async (req, res, next) => {
    try {
        const user = req.body;
        const newUser = await authService.register(user);
        return res.status(201).json(new Success(newUser));
    } catch (err) {
        next(err);
    };
};

export const loginUser = async (req, res, next) => {
    try {
        const user = req.body;
        const token = await authService.login(user);
        return res.status(200).json(new SuccessToken(token, 'Bearer', 'Logged in successfully'));
    } catch (err) {
        next(err);
    };
};

export const profile = (req, res) => {
    return res.status(200).json(new Success(req.user));
};