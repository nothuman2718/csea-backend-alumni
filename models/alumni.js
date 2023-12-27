const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateAlumni(alumni) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
        name: Joi.string().min(1).max(50).required(),
        //These Dates are first and recent graduate years according to wikipedia
        graduationYear: Joi.number().min(1965).max(2019).required(),
        contactNumber: Joi.string().min(10).max(20).required(),
        email: Joi.string().min(5).max(255).email().required(),
        currentJob: Joi.string().min(3).max(50).required()
    })
    return schema.validate(alumni);
}
function validateAlumniUpdate(alumni) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50),
        password: Joi.string().min(6).max(255),
        name: Joi.string().min(1).max(50),
        graduationYear: Joi.number().min(1965).max(2019),
        contactNumber: Joi.string().min(10).max(20),
        email: Joi.string().min(5).max(255).email(),
        currentJob: Joi.string().min(3).max(50)
    })
    return schema.validate(alumni);
}
exports.Alumni = Alumni;
exports.validate = validateAlumni;
exports.validateProps = validateAlumniUpdate;