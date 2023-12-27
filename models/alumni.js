const mongoose = require("mongoose");

//Implemenet data validation using joi

const alumniSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    name: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    currentJob: { type: String, required: true }
})

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni