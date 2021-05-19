const {UserModel, validate, validatePass} = require('../models/user-model');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();



router.post('/', async(req, res) => {
    const { error } = validate(req.body) && validatePass(req.body.password);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await UserModel.findOne({username: req.body.username})
    if (user) return res.status(400).send('Username already in use!');

    user = await UserModel.findOne({email: req.body.email})
    if (user) return res.status(400).send('Email already in use!');

    user = await UserModel.findOne({pnumber: req.body.pnumber})
    if (user) return res.status(400).send('Phone Number already in use!');

    user = new UserModel(
        _.pick(req.body, ['fullname','username','email','pnumber','password'])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(
        _.pick(user, ['_id','fullname','username','email','pnumber'])
    );
});


module.exports = router;