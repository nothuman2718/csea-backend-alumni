// Node.js modules
const config = require("config");

// Third-party modules
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

// Models
const { Alumni } = require("../models/alumni");
const { Student, validateProps } = require("../models/student");

// Middleware
const studentAuth = require("../middleware/studentAuth");
const validateObjectId = require("../middleware/validateObjectId");
const invalidRoute = require("../middleware/invalidRoute");

// Router
const router = Router();


router.post("/login", async (req, res) => {
    try {
        const user = await Student.findOne({ username: req.body.username })

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

router.put("/update/:id", studentAuth, validateObjectId, async (req, res) => {
    //handle update of  username and password
    try {
        if ("username" in req.body) {
            const student = await Student.findOne({ username: req.body.username })
            if (student) return res.status(401).json({ message: "User Already exists with given username" })
        }
        if ("password" in req.body) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await Student.findById(req.params.id);
        if (user) {
            const { error } = validateProps(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            if (req.username === user.username) {
                user.set(req.body);
                const result = await user.save();
                res.status(200).json(_.omit(result.toObject(), ["password", "__v"]));
            } else return res.status(403).json({ message: "You cannot change other user data by providing their id" })

        } else {
            res.status(404).json({ message: "No user found with that alumniId" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
});



router.get("/getAllAlumni", studentAuth, (req, res) => {
    Alumni.find()
        .select("-password -__v")
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(
            (err) => {
                console.log(err)
                res.status(500).json({ message: "Something happened while fetching data" })
            })
})
router.use(invalidRoute)

module.exports = router;