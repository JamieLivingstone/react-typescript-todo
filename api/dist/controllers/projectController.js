"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// MongoDB models
const Project = mongoose.model('Project');
// Load todos based on from requester's user id
exports.loadProjects = (req, res) => {
    return Project.find({ userId: req.user._id })
        .sort('title')
        .exec((err, projects) => {
        if (err) {
            return res.json({ error: err.message });
        }
        return res.json({ projects });
    });
};
//# sourceMappingURL=projectController.js.map