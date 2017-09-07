import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    completed: {
        default: false,
        type: Boolean,
    },
    date: {
        type: Date,
    },
    projectIds: [{
        default: [],
        type: String,
    }],
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

module.exports = mongoose.model<mongoose.Document>('Todo', todoSchema);
