const config = require("config");

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not set");
    }

    if (!config.get("database")) {
        throw new Error("FATAL ERROR: MongoDB connection string not set");
    }

    if (!config.get("port")) {
        throw new Error("FATAL ERROR: Port not set");
    }
}