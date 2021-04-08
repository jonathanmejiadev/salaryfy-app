import User from '../models/user.model';

class AuthRepository {
    constructor() {
    }

    async save(user) {
        const createdUser = new User(user);
        await createdUser.save();
        return createdUser;
    };


    async findUser(username) {
        return await User.findOne({ username });
    };

    async update(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async remove(id) {
        return await User.findByIdAndDelete(id);
    }

}

export default AuthRepository;