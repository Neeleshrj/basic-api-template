const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('./routes/users');
const auth = require('./routes/auth');
const Joi = require('joi');
const app = express();
const mongoose = require('mongoose');

if (!config.has('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/testdb',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to DB.'))
    .catch(err => console.error(err));

app.use(express.json());//middleware to parse into json
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/users', users);
app.use('/api/auth', auth);

 
//GET REQUESTS
app.get('/', (req,res) => {
    res.send('Hello Weirdo');
});
 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`));