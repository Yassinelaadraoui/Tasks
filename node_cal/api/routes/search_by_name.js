const express = require('express');

const router = express.Router();

const Event = require('../models/events');


router.get('/', (req, res, next ) =>{
  //const EventName = req.params.EventName;
  //const date = req.params.date;
  //const time = req.params.time;
  //const Eventlenght = req.params.Eventlenght;


  Event.find()
    .exec()
    .then(docs => {
      console.log(docs);


      var result_object = [];
      //   if (docs.length >= 0) {
      for (var i = 0; i < docs.length; i++) {

            if(docs[i].name.search(req.query.name) >=0){
              console.log("hey"+req.query.name);
              result_object.push(docs[i])
            }



      }
      res.status(200).json(result_object);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });








})



module.exports = router;
