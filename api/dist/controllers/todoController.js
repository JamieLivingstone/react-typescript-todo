"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validations_1 = require("../helpers/validations");
// MongoDB models
const Todo = mongoose.model('Todo');
// Load requester's todos
exports.loadTodos = (req, res) => {
    return Todo.find({ userId: req.user._id, completed: false })
        .sort({ date: -1 })
        .exec((err, todos) => {
        if (err) {
            return res.json({ error: err.message });
        }
        return res.json({ todos });
    });
};
// Create todos
exports.createTodo = (req, res) => {
    // Retrieve data from request body
    const { title, date } = req.body.todo;
    const { _id } = req.user;
    // Validate request properties
    if (!validations_1.isStringWithLength(title)) {
        return res.json({ error: 'Title is a required field' });
    }
    if (!validations_1.isStringWithLength(date) || typeof date === 'number') {
        return res.json({ error: 'Date is a required field' });
    }
    // Create a new todo item
    const todo = new Todo({ title, userId: _id, date });
    // Save todo in database and return results
    return todo.save((err, document) => {
        if (err || !document) {
            return res.json({ error: 'Something went wrong!' });
        }
        return res.json({ todo: document });
    });
};
// Delete todos
exports.deleteTodo = (req, res) => {
    Todo.remove({ _id: req.body._id }, (err) => {
        if (err) {
            return res.json({ error: 'Error deleting document' });
        }
        return res.json({ deleted: true });
    });
};
// Update todos
exports.updateTodo = (req, res) => {
    const todo = req.body.todo;
    Todo.findByIdAndUpdate({ _id: todo._id }, todo, (err) => {
        if (err) {
            return res.json({ updated: false, error: err.message });
        }
        return res.json({ updated: true, todo });
    });
};
// Complete todos
exports.completeTodo = (req, res) => {
    Todo.findOneAndUpdate({ _id: req.body._id }, { completed: true }, (err, document) => {
        if (err || !document) {
            return res.json({ error: err.message, completed: false });
        }
        return res.json({ completed: true });
    });
};
//# sourceMappingURL=todoController.js.map