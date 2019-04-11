to create an event : POST localhost:3000/create
{
  "name" : "day 1 event",
    "date" : "09.04.2019 12:30",
    "lenght": "3"
    
}



to search by time this will also take into consideration the length of the event : GET localhost:3000/search?yyyy=2019&mm=04&dd=09&time=165812


to search by name : localhost:3000/search_by_name?name=rname

