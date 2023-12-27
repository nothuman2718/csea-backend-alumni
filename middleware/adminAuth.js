const jwt = require("jsonwebtoken");
const config = require("config");

function adminAuth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Access Denied" })
    }
}

module.exports = adminAuth;