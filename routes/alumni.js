const config = require("config");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const lodash = require("lodash")

const router = Router();
const { Alumni, Student } = db;

//Todo : Check jwt privatekey

router.post("/register", async (req, res) => {
    //Todo Use Lodash
    try {
        const alumni = new Alumni({
            ...req.body//pick using lodash
        });

        //Main todo make user username is avaiable avoid multiple persons with same username

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(alumni.password, salt);
        alumni.password = hashedPassword;

        const savedUser = await alumni.save();

        const token = jwt.sign({ username: req.body.username }, config.get("jwtPrivateKey"));
        res.header("x-auth-token", token);
        res.status(201).json({ user: savedUser });//Use Lodash and remove hashed password while sending to user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
});

// router.get("/login", (req, res) => {})
// //Authenticate Alumni

//todo use lodash pick only required props
//dont send total json object stored in mongodb remove password
router.put("/update/:alumniId", async (req, res) => {
    try {
        const user = await Alumni.findById(req.params.alumniId);
        if (user) {
            user.set(req.body); // or manually set each property
            const result = await user.save();
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No user found with that alumniId" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
});

router.delete("/delete/:alumniId", async (req, res) => {
    try {
        const result = await Alumni.findByIdAndDelete(req.params.alumniId);
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

router.get("/all", (req, res) => {
    Alumni.find()
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