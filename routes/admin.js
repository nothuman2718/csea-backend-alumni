const config = require("config");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const router = Router();
const { Admin, Student } = db;
const adminAuth = require("../middleware/adminAuth");
const validateObjectId = require("../middleware/validateObjectId");
const globalCatch = require("../middleware/globalCatch")

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
        const student = new Student({ ...req.body });
        const user = await Student.findOne({ username: req.body.username })
        if (user) return res.status(401).json({ message: "Student already exists with given username" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(student.password, salt);
        student.password = hashedPassword;

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
router.use(globalCatch);
router.use(invalidRoute)

module.exports = router;