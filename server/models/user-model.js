const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 6,
    max: 24,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const UserModel =  mongoose.model('User', new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    pnumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
}));



function validateUser(user) {
    const schema = Joi.object({
        fullname: Joi
            .string()
            .min(5)
            .max(50)
            .required(),
        username: Joi
            .string()
            .min(5)
            .max(255)
            .required(),
        email: Joi
            .string()
            .min(5)
            .max(255)
            .required()
            .email(),
        pnumber: Joi
            .number()
            .required(),
        // password: Joi
        //     .string()
        //     .min(5)
        //     .max(255)
        //     .required(),
    });
    
    return schema.validate(user);
}

function validatePass(password) {
    return passwordComplexity(complexityOptions).validate(password);
}

exports.UserModel = UserModel;
exports.validate = validateUser;
exports.validatePass = validatePass;