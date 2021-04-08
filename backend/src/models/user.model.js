import { Schema, model } from 'mongoose';
import { hash, compare, genSalt } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        jobs: [{
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }]

    }, {
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    return next();
});

UserSchema.methods.validatePassword = async function (password) {
    return await compare(password, this.password);
};

UserSchema.methods.provideToken = function (id) {
    const token = sign(id, config.jwt.secret);
    return token;
};

export default model('User', UserSchema);