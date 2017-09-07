"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const express = require("express");
const router = express.Router();
// Controllers
const authenticationController = require("../controllers/authenticationController");
const todoController = require("../controllers/todoController");
// General routes
router.post('/register', authenticationController.registerUser);
// Authenticated routes
router.post('/login', authenticationController.login);
router.post('/token', passport.authenticate('jwt', { session: false }), authenticationController.token);
router.get('/todos', passport.authenticate('jwt', { session: false }), todoController.loadTodos);
router.post('/todos/create', passport.authenticate('jwt', { session: false }), todoController.createTodo);
router.post('/todos/delete', passport.authenticate('jwt', { session: false }), todoController.deleteTodo);
router.post('/todos/update', passport.authenticate('jwt', { session: false }), todoController.updateTodo);
router.post('/todos/complete', passport.authenticate('jwt', { session: false }), todoController.completeTodo);
// Export router
module.exports = router;
//# sourceMappingURL=index.js.map