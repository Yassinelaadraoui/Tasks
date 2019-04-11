const express = require('express');

const router = express.Router();

const Event = require('../models/events');
console.log("here");
router.get('/', (req, res, next ) =>{
  //const EventName = req.params.EventName;
  //const date = req.params.date;
  //const time = req.params.time;
  //const Eventlenght = req.params.Eventlenght;
console.log(req.query)
  var yyyy = req.query.yyyy ;
  var mm = req.query.mm;
  var dd = req.query.dd;
  var dateTime = req.query.time;
    console.log(yyyy);


  Event.find()
    .exec()
    .then(docs => {
      console.log(docs);

      if(dateTime){
        var time = dateTime.split(":");
        var h = time[0];
        var m = time[1];
      }

      var date1 = new Date();
      var date2 = new Date();
      if (yyyy && mm && dd && h &&m) {
        date1.setFullYear(yyyy);
      }
      if (mm) {
        date1.setMonth(mm-1);
      }
      if (dd) {
        date1.setDate(dd);
      }
      if (h) {
        date1.setHours(h);
      }else {
        date1.setHours(0);
      }
      if (m) {
        date1.setMinutes(m);
      }else {
        date1.setMinutes(0);
      }
      console.log("stupid" + date1);

      var result_object = [];
      //   if (docs.length >= 0) {
      for (var i = 0; i < docs.length; i++) {

            var date_from_Database =  format_date(docs[i].date);




            date_from_Database.setTime(date_from_Database.getTime() - date_from_Database.getTimezoneOffset() * 60 * 1000 );//work around timezone and summer hours
            from=date1;

            to=date1;
            console.log(to);
            console.log(from);
            //if( from.getHours() ){


            console.log("after"+to);
          /*  }else {
              date_from_Database.setHours(0,0,0,0);
            }*/


            console.log(date_from_Database);
            console.log( );

            if((date_from_Database.getTime() <= to.getTime() && date_from_Database.getTime() >= from.getTime()) || Math.abs(date_from_Database - to) / 36e5<= docs[i].lenght){
              console.log("true")
              result_object.push(docs[i]);

            }else {
              if (!dateTime && Math.abs(date_from_Database - to) / 36e5<= 24) {
                result_object.push(docs[i]);
              }
            }



            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }

      }
      res.status(200).json(result_object);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });



function format_date(date){

  if(date.split(" ")){

    var dateTime = date.split(" ");
    var date = dateTime[0].split(".");
    var yyyy = date[2];
    var mm = date[1]-1;
    var dd = date[0];
    if (dateTime[1]) {
      var time = dateTime[1].split(":");
      var h = time[0];
      var m = time[1];
      return  new Date(yyyy,mm,dd,h,m);
    }

    return  new Date(yyyy,mm,dd);






  }
  else {
    var date = date[0].split(".");
    var yyyy = date[2];
    var mm = date[1]-1;
    var dd = date[0];
    return  new Date(yyyy,mm,dd);

  }







}
  /*dateTime = date.split(" ");

    var date = dateTime[0].split(".");
    var yyyy = date[2];
    var mm = date[1]-1;
    var dd = date[0];

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];

    console.log(dateTime); */





})



module.exports = router;
