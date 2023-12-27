const config = require("config");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const alumniAuth = require("../middleware/alumniAuth")

const router = Router();
const Alumni = require("../models/alumni")
const validateObjectId = require("../middleware/validateObjectId");
const invalidRoute = require("../middleware/invalidRoute")

router.post("/register", async (req, res) => {
    try {
        const alumni = new Alumni({ ...req.body });
        const user = await Alumni.findOne({ username: req.body.username })
        if (user) return res.status(401).json({ message: "User already exists with given username" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(alumni.password, salt);
        alumni.password = hashedPassword;

        const savedUser = await alumni.save();

        const token = jwt.sign({ username: req.body.username }, config.get("jwtPrivateKey"));
        res.header("x-auth-token", token);
        res.status(201).json(_.omit(savedUser.toObject(), ["password", "__v"]));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await Alumni.findOne({ username: req.body.username })

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

router.put("/update/:id", alumniAuth, validateObjectId, async (req, res) => {
    try {
        const user = await Alumni.findById(req.params.id);
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

router.delete("/delete/:id", alumniAuth, validateObjectId, async (req, res) => {
    try {
        const result = await Alumni.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(204).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "No user found with that alumniId" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while deleting the user" });
    }
});

router.get("/all", alumniAuth, (req, res) => {
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