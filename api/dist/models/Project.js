"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    title: {
        required: 'Please supply a title',
        trim: true,
        type: String,
    },
    userId: {
        lowercase: true,
        required: true,
        trim: true,
        type: String,
    },
});
module.exports = mongoose.model('Project', projectSchema);
//# sourceMappingURL=Project.js.map