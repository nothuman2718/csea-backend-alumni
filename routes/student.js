const config = require("config");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const studentAuth = require("../middleware/studentAuth")
const invalidRoute = require("../middleware/invalidRoute")
const validateObjectId = require("../middleware/validateObjectId");

const router = Router();
const { Student, validateProps } = require("../models/student")


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
    const { error } = validateProps(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const user = await Student.findById(req.params.id);
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
router.use(invalidRoute)

module.exports = router;