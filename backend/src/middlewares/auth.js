import User from '../models/user.model';
import logger from '../loaders/logger'

export const checkUserEmailExists = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const [usernameRes, emailRes] = await Promise.all([User.findOne({ username: username }), User.findOne({ email: email })]);
        if (usernameRes && emailRes) return res.status(409).json({
            errors: [{
                success: false,
                message: 'Username is already taken'
            },
            {
                success: false,
                message: 'Email already exists'
            }]
        });
        if (usernameRes) return res.status(409).json({
            success: false,
            message: 'Username is already taken'
        });
        if (emailRes) return res.status(409).json({
            success: false,
            message: 'Email already exists'
        });
        return next();
    }
    catch (err) {
        logger.error(err.message);
        next();
    }
};
