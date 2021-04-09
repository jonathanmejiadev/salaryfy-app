import AuthRepository from '../repositories/auth.repository';
import createError from 'http-errors';

const authRepo = new AuthRepository();

export const register = async (user) => {
    let newUser = await authRepo.save(user);
    newUser = newUser.toObject();
    delete newUser.password;
    return newUser;
};

export const login = async (user) => {
    const { username, password } = user;
    const userFound = await authRepo.findUser(username);
    if (!userFound) throw new createError(404, 'User not found');
    const isValid = await userFound.validatePassword(password);
    if (!isValid) throw new createError(401, 'The password is incorrect');
    const token = await userFound.provideToken({ id: userFound._id });
    return token;
};