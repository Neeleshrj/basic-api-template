const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('./routes/users');
const Joi = require('joi');
const app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to DB.'))
    .catch(err => console.error(err));

app.use(express.json());//middleware to parse into json
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/users', users);

 
//GET REQUESTS
app.get('/', (req,res) => {
    res.send('Hello Weirdo');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`));