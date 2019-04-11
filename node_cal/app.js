const express = require('express');

const mongoose = require('mongoose');

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const createRoutes = require('./api/routes/create_Event');

const searchRoutes = require('./api/routes/search');

const searchByWordRoutes = require('./api/routes/search_by_name');


mongoose.connect('mongodb+srv://yassine:yassine@cluster0-0r9il.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use('/create', createRoutes);

app.use('/search', searchRoutes);

app.use('/search_by_name', searchByWordRoutes);

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
