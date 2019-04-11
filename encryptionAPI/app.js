const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./api/routes/user');
const gameRoutes = require('./api/routes/password_game');


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


mongoose.connect('mongodb+srv://yassine:yassine@cluster0-0r9il.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use('/user',  userRoutes);
app.use('/game', gameRoutes);



app.use((req, res, next) =>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      messages: error.message
    }
  })
})












module.exports = app;
