import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';
import config from '../config';


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id, { password: false });
        if (!user) {
            return done(err, false);
        };
        return done(null, user);
    } catch (err) {
        return done(null, false);
    };
});