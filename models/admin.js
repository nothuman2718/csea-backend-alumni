const mongoose = require("mongoose")

//Implemenet data validation using joi

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin;