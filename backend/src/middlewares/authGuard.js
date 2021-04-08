import passport from 'passport';

export const passportJwtGuard = passport.authenticate('jwt', { session: false });
