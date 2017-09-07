"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("passport-jwt");
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
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};
passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
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
//# sourceMappingURL=passport.js.map