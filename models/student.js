const mongoose = require("mongoose");
const Joi = require("joi")
//Implemenet data validation using joi

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    rollNum: { type: String, required: true },
})
const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(5).max(255).email().required(),
        name: Joi.string().min(1).max(50).required(),
        rollNum: Joi.string().length(9).required()
    })
    return schema.validate(student)
}
function validateUpdateStudent(student) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50),
        password: Joi.string().min(6).max(255),
        email: Joi.string().min(5).max(255).email(),
        name: Joi.string().min(1).max(50),
        rollNum: Joi.string().length(9)
    })
    return schema.validate(student)
}
exports.Student = Student;
exports.validate = validateStudent;
exports.validateProps = validateUpdateStudent;