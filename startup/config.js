const config = require("config");

//check whether jwtPrivateKey is set 
module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        console.log("FATAL ERROR: jwtPrivateKey is not set");
        // throw new Error("jwtPrivateKey is not set")
        process.exit(1);
    }
    //check whether mongodb connection string is set
    if (!config.get("database")) {
        console.log("FATAL ERROR: MongoDB connection string  not set")
        // throw new Error("MongoDB connection string is not set")
        process.exit(1);
    }
    //check whether port is set
    if (!(config.get("port"))) {
        console.log("FATAL ERROR: Port not set");
        // throw new Error("Port not set")
        process.exit(1);
    }
}