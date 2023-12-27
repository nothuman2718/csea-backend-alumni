const mongoose = require("mongoose");
const config = require("config");

//Connect to mongoose
module.exports = function () {
    mongoose
        .connect(config.get("database") + "/csea-alumni-backend-test")
        .then(() => { console.log("Connected to mongoose") })
        .catch((err) => { console.log(err) })
}
