// Node.js modules
const express = require("express");

// Routes
const alumniRouter = require("../routes/alumni");
const studentRouter = require("../routes/student");
const adminRouter = require("../routes/admin");

// Middleware
const error = require("../middleware/globalCatch");
const invalid = require("../middleware/invalidRoute");


module.exports = function (app) {
    app.use(express.json());
    app.use("/api/alumni", alumniRouter);
    app.use("/api/student", studentRouter);
    app.use("/api/admin", adminRouter);
    app.use(error);
    app.use(invalid);
}