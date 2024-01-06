// Node.js modules
const config = require("config");

// Third-party modules
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

// Models
const { Admin } = require("../models/admin");
const { Student, validate } = require("../models/student");

// Middleware
const adminAuth = require("../middleware/adminAuth");
const validateObjectId = require("../middleware/validateObjectId");
const invalidRoute = require("../middleware/invalidRoute");

// Router
const router = Router();

router.post("/login", async (req, res) => {
    try {
        const user = await Admin.findOne({ username: req.body.username })
        if (!user) return res.status(401).json({ message: "Invalid Username" })

        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            const token = jwt.sign(_.omit(user.toObject(), ["password"]), config.get("jwtPrivateKey"));
            res.header("x-auth-token", token);
            res.status(200).json(_.omit(user.toObject(), ["password", "__v"]));
        }
        else res.status(401).json({ message: "Invalid Password" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something happened during login" })
    }
})
router.post("/studentRegister", adminAuth, async (req, res) => {

    try {
        const user = await Student.findOne({ username: req.body.username })
        if (user) return res.status(409).json({ message: "Student already exists with given username" })

        const { error } = validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const student = new Student({ ...req.body });

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        const savedUser = await student.save();

        res.status(201).json(_.omit(savedUser.toObject(), ["password", "__v"]));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
});

router.delete("/deleteStudent/:id", adminAuth, validateObjectId, async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(204).json({ message: "Student Data deleted successfully" });
        } else {
            res.status(404).json({ message: "No user found with that studentId" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while deleting the student data" });
    }
});
router.use(invalidRoute)

module.exports = router;