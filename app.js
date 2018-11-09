const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/taxi24', {useNewUrlParser: true});
}
//middleware that is going to convert the body of our requests into json
app.use(bodyParser.json());

//funtction that will handle all our request
routes(app);

//middleware that is going handle all out going errors
app.use((err, req, res, next) => {
    res.send({error: err.message});
    next();
})

module.exports = app;