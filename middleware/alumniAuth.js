const jwt = require("jsonwebtoken");
const config = require("config");

function alumniAuth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
        req.username = decoded.username;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "You are not authorized " })
    }
}

module.exports = alumniAuth;