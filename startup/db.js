const mongoose = require("mongoose");
const config = require("config");

//Connect to mongoose
module.exports = function () {
    mongoose
        .connect(config.get("database") + "/csea-alumni-backend-finaltest")
        .then(() => { console.log("Connected to mongoose") })
        .catch((err) => { console.log(err) })
}
