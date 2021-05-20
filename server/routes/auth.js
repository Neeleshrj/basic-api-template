const {UserModel} = require('../models/user-model');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserModel.findOne({username: req.body.username})
    if (!user) return res.status(400).send('Invalid username or password!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid username or password!');

    const token = user.generateAuthToken();
    res.send(token);

});


function validate(user) {
    const schema = Joi.object({
        username: Joi
            .string()
            .min(5)
            .max(255)
            .required(),
        password: Joi
            .string()
            .min(6)
            .max(24)
            .required(),
    });
    
    return schema.validate(user);
}


module.exports = router;