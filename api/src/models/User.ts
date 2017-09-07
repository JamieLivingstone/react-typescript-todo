import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as passportLocalMongoose from 'passport-local-mongoose';
import * as validator from 'validator';
import { IUser } from '../../../shared_interfaces';
const Schema = mongoose.Schema;

// Create an interface for strongly typed instances of users
interface IUserModel extends IUser, mongoose.Document {
    register: (user: IUser) => void;
}

const userSchema = new Schema({
    email: {
        lowercase: true,
        required: 'Please supply a email',
        trim: true,
        type: String,
        unique: true,
        validate: [{ validator: (value: string) => validator.isEmail(value), message: 'Please supply a valid email address' }],
    },
    fullName: {
        minlength: [3, 'Your name must not be less than ({MINLENGTH}) characters'],
        required: 'Please supply your full name',
        trim: true,
        type: String,
    },
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model<IUserModel>('User', userSchema);
