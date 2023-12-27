const jwt = require("jsonwebtoken");
const config = require("config");

function studentAuth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "You are not authorized " })
    }
}

module.exports = studentAuth;