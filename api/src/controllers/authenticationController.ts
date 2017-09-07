import * as promisify from 'es6-promisify';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { IAuthenticationResponse, ILoginUser, IUser} from '../../../shared_interfaces';
import { errorMessage, isSecurePassword, isStringWithLength } from '../helpers/validations';

// Load user model to allow us to create/read from user schema
const User: any = mongoose.model('User');

// Generate JWT from a user profile
const generateToken = (user: IUser) => jwt.sign(user, process.env.SECRET);

// Generate a user response
const generateUserResponse = (user: IUser): IAuthenticationResponse => {
    // Create JSON Web Token
    const webToken = `Bearer ${generateToken(user)}`;

    // Return profile
    return {
        isAuthenticated: true,
        token: webToken,
        user: {
            email: user.email,
            fullName: user.fullName,
        },
    };
};

// Register a new user
export const registerUser =  async (req: express.Request, res: express.Response) => {
    // Retrieve data from request body
    const { email, fullName, password }: IUser = req.body;

    // Validate request body properties
    if (!isStringWithLength(email)) {
        return res.json(errorMessage('Email is a required field'));
    }

    if (!isStringWithLength(fullName)) {
        return res.json(errorMessage('Full name is a required field'));
    }

    if (!isStringWithLength(password)) {
        return res.json(errorMessage('Password is a required field'));
    }

    // Password must be secure
    if (!isSecurePassword(password)) {
        return res.json(errorMessage('Password must contain one uppercase letter and at least 6 characters'));
    }

    // Make register asynchronous
    const register = promisify(User.register, User);

    // Create new user
    const user = new User({ email, fullName });

    // Save user
    await register(user, password)
        .then((profile: IUser) => {
            // Send JSON response with profile and JSON Web Token
            res.json(generateUserResponse(profile));
        })
        .catch((e) => {
            let error = e.message;

            // Custom error message for unique emails
            if (e.message.indexOf('expected `email` to be unique.') > -1) {
                error = 'Email address is already in use!';
            }

            // Send response
            res.json({ error });
        });
};

// Existing user login
export const login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Retrieve data from request body
    const { email, password }: ILoginUser = req.body;

    // Email and password must not be empty
    if (!isStringWithLength(email) || !isStringWithLength(password)) {
        return res.json(errorMessage('Email address and password are required fields'));
    }

    // Authenticate and send response
    passport.authenticate('local', (err: { message: string }, user: IUser) => {
        req.logIn(user, () => {
            // Something went wrong
            if (err) {
                return res.json(errorMessage(err.message));
            }

            // Invalid login credentials
            if (!user) {
                return res.json(errorMessage('Invalid username/password combination'));
            }

            // Send JSON response with profile and JSON Web Token
            res.json(generateUserResponse(user));
        });
    })(req, res, next);
};

// Login via token (authentication is handled by middleware on router)
export const token = async (req: express.Request, res: express.Response) => {
    // Send JSON response with profile and JSON Web Token
    const user: IUser = req.user;
    res.json(generateUserResponse(user));
};
