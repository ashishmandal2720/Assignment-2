require("./config/database").connect();
const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');
const dogs = require('./models/dogs');
var fs = require('fs');
var path = require('path');
const cookieparser =require('cookie-parser')

// app.use(urlencoded({ extended :false}))
app.use(cookieparser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const userRegistration = require('./routers/userRegistrationRoutes')
app.use('/user', userRegistration);

const dogData = require('./routers/dogsDataRoutes');
app.use('/dog', dogData);


const { urlencoded } = require("body-parser");


module.exports = app;