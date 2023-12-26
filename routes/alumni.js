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

        const token = jwt.sign({ username: req.body.username }, "secretkey");
        res.header("x-auth-token", token);
        res.status(201).json({ user: savedUser });//Use Lodash and remove hashed password while sending to user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
});

router.get("/login", (req, res) => {

})
// //Authenticate Alumni

// router.put("/update/:alumniId")

// router.delete("/delete/:alumniId")

// router.get("/all")
module.exports = router;