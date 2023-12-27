const mongoose = require("mongoose");
const config = require("config");

//Connect to mongoose
mongoose
    .connect(config.get("database") + "/csea-alumni-backend-test")
    .then(() => { console.log("Connected to mongoose") })
    .catch((err) => { console.log(err) })

//Define Schemas
const alumniSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    name: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    currentJob: { type: String, required: true }
})

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    rollNum: { type: String, required: true },
})

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})

const Alumni = mongoose.model("Alumni", alumniSchema);
const Student = mongoose.model("Student", studentSchema);
const Admin = mongoose.model("Admin", adminSchema)

module.exports = {
    Alumni, Student, Admin
};
