const Joi = require("joi");
const mongoose = require("mongoose")

//Implemenet data validation using joi

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})
const Admin = mongoose.model("Admin", adminSchema)

function validateAdmin(admin) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
        name: Joi.string().min(1).max(50).required()
    })
    return schema.validate(admin);
}

exports.Admin = Admin;
exports.validate = validateAdmin;