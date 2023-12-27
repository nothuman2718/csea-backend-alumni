const mongoose = require("mongoose");

//Implemenet data validation using joi

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    rollNum: { type: String, required: true },
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;