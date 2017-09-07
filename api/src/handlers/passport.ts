import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'passport-jwt';

// User model
const User = mongoose.model('User');

// Middleware
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Auth tokens from header
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

// Json web token options
const opts: jwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

passport.use(new JwtStrategy(opts, ((jwtPayload: any, done: jwt.VerifiedCallback) => {
    User.findOne({ _id: jwtPayload._doc._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
})));
