require("./config/database").connect();
const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');
const dogs = require('./models/dogs');
var fs = require('fs');
var path = require('path');


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const userRegistration = require('./routers/userRegistrationRoutes')
app.use('/user', userRegistration);

const dogData = require('./routers/dogsDataRoutes')
app.use('/dog', dogData);


module.exports = app;