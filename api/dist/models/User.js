"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        lowercase: true,
        required: 'Please supply a email',
        trim: true,
        type: String,
        unique: true,
        validate: [{ validator: (value) => validator.isEmail(value), message: 'Please supply a valid email address' }],
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
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map