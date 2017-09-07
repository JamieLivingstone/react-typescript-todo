import * as express from 'express';
import * as mongoose from 'mongoose';
import { ITodoItem } from '../../../shared_interfaces';
import { isStringWithLength } from '../helpers/validations';

// MongoDB models
const Todo = mongoose.model('Todo');

// Load requester's todos
export const loadTodos = (req: express.Request, res: express.Response) => {
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
export const createTodo = (req: express.Request, res: express.Response) => {
    // Retrieve data from request body
    const { title, date }: ITodoItem = req.body.todo;
    const { _id } = req.user;

    // Validate request properties
    if (!isStringWithLength(title)) {
        return res.json({ error: 'Title is a required field' });
    }

    if (!isStringWithLength(date) || typeof date === 'number') {
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
export const deleteTodo = (req: express.Request, res: express.Response) => {
    Todo.remove({ _id: req.body._id }, (err) => {
        if (err) {
           return res.json({ error: 'Error deleting document' });
        }

        return res.json({ deleted: true });
    });
};

// Update todos
export const updateTodo = (req: express.Request, res: express.Response) => {
    const todo: ITodoItem = req.body.todo;

    Todo.findByIdAndUpdate({ _id: todo._id }, todo, (err) => {
        if (err) {
            return res.json({ updated: false, error: err.message });
        }

        return res.json({ updated: true, todo });
    });
};

// Complete todos
export const completeTodo = (req: express.Request, res: express.Response) => {
    Todo.findOneAndUpdate({ _id: req.body._id }, { completed: true }, (err, document) => {
        if (err || !document) {
           return res.json({ error: err.message, completed: false });
        }

        return res.json({ completed: true });
    });
};
