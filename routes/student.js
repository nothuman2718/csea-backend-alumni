const config = require("config");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const studentAuth = require("../middleware/studentAuth")

const router = Router();
const { Student } = db;


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

router.put("/update/:studentId", studentAuth, async (req, res) => {
    try {
        const user = await Student.findById(req.params.studentId);
        if (user) {
            user.set(req.body);
            const result = await user.save();
            res.status(200).json(_.omit(result.toObject(), ["password", "__v"]));
        } else {
            res.status(404).json({ message: "No user found with that alumniId" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
});



router.get("/getAllAlumni", studentAuth, (req, res) => {
    Student.find()
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
module.exports = router;