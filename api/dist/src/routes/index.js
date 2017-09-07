"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// Controllers
const authenticationController = require("../controllers/authenticationController");
// General routes
router.post('/register', authenticationController.registerUser);
// Authenticated routes
router.post('/login', authenticationController.login);
// Export router
module.exports = router;
//# sourceMappingURL=index.js.map