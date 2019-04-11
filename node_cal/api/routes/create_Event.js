const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Event = require('../models/events');



router.post("/", (req, res, next ) =>{










  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    date : req.body.date,
    lenght: req.body.lenght
  });
  console.log(req.body.name);
  event.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });


})

module.exports = router;
