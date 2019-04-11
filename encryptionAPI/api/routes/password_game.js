const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check_authentication");
const User = require("../models/user");
const plainPassword = require("../models/password");

router.get("/", checkAuth,(req, res, next) => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length =  Math.random() * (32 - 8) + 8;
  saltRounds = 11;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}


  bcrypt.hash(randomstring, saltRounds).then(function(hash) {
    // Store hash in your password DB.
    const password = new plainPassword({
      _id: new mongoose.Types.ObjectId(),
      password: randomstring,
      encoded : hash


    });
    password //save user in database
      .save()
      .then(result => {
        console.log(result);
      setTimeout(deletePassword,900000); //delete automatically after 15min 900000 = 15*60*1000
        res.status(201).json({
          message: randomstring
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});


    function deletePassword() {
      plainPassword.remove({})

      .then(result => {

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

    }


});




router.post("/", checkAuth,(req, res, next) => {
  function deletePassword() {
    plainPassword.remove({})

    .then(result => {

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

  }

    console.log("here");
   plainPassword.find()
   .then(docs => {


     console.log("dd"+docs[0]);
     bcrypt.compare(docs[0].password, req.body.answer, function(err, result) {
       // res == true
       console.log(result);
      // deletePassword();
      if (result) {
        deletePassword();
        res.status(200).json({
            message: "OK"

        });
      }else {
        res.status(200).json({
            message: "NOK"

        });
      }

    }).catch(err =>{

    })

   })
   .catch(err =>{
      console.log("heeee");
   });




});



module.exports = router;
