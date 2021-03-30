import User from '../models/user.model';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData = new User({ username, email, password });
        await userData.save();
        return res.status(201).json({
            success: true,
            message: 'User registration successfully',
            data: userData
        });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({
            success: false,
            code: 404,
            error: 'User not found'
        });
        const isValid = await user.validatePassword(password);
        if (!isValid) return res.status(401).json({
            success: false,
            code: 401,
            error: 'The password is incorrect'
        });
        const token = await user.provideToken({ id: user._id });
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            access_token: token,
            type_token: 'Bearer'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
};

export const profile = (req, res) => {
    console.log(req.user);
    return res.status(200).json({ success: true, data: req.user });
};