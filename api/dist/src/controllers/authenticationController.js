"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promisify = require("es6-promisify");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const validations_1 = require("../helpers/validations");
// Load user model to allow us to create/read from user schema
const User = mongoose.model('User');
// Generate JWT from a user profile
const generateToken = (user) => jwt.sign(user, process.env.SECRET);
// Register a new user
exports.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Retrieve data from request body
    const { email, fullName, password } = req.body;
    // Validate request body properties
    if (!validations_1.isStringWithLength(email)) {
        return res.json(validations_1.errorMessage('Email is a required field'));
    }
    if (!validations_1.isStringWithLength(fullName)) {
        return res.json(validations_1.errorMessage('Full name is a required field'));
    }
    if (!validations_1.isStringWithLength(password)) {
        return res.json(validations_1.errorMessage('Password is a required field'));
    }
    // Password must be secure
    if (!validations_1.isSecurePassword(password)) {
        return res.json(validations_1.errorMessage('Password must contain one uppercase letter and at least 6 characters'));
    }
    // Make register asynchronous
    const register = promisify(User.register, User);
    // Create new user
    const user = new User({ email, fullName });
    // Save user
    yield register(user, password)
        .then((profile) => res.json({ token: `JWT ${generateToken(profile)}`, user: profile, authenticated: true }))
        .catch((e) => {
        let error = e.message;
        // Custom error message for unique emails
        if (e.message.indexOf('expected `email` to be unique.') > -1) {
            error = 'Email address is already in use!';
        }
        // Send response
        res.json({ error });
    });
});
// Existing user login
exports.login = (req, res, next) => {
    // Retrieve data from request body
    const { email, password } = req.body;
    // Email and password must not be empty
    if (!validations_1.isStringWithLength(email) || !validations_1.isStringWithLength(password)) {
        return res.json(validations_1.errorMessage('Email address and password are required fields'));
    }
    // Authenticate and send response
    passport.authenticate('local', (err, user) => {
        req.logIn(user, () => {
            if (err) {
                return res.json(validations_1.errorMessage(err.message));
            }
            if (!user) {
                return res.json(validations_1.errorMessage('Invalid username/password combination'));
            }
            return res.json({ user, isAuthenticated: true, token: `JWT ${generateToken(user)}` });
        });
    })(req, res, next);
};
//# sourceMappingURL=authenticationController.js.map