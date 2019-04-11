
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
var token = "";
var encrypted ;
     $(document).ready(function(){








       var url = 'http://localhost:3000/user/login';
       var data = {
          'email':"yassinelaadraoui@gmail.com",
          'password':"yassine"
        };

              $http.post(url,JSON.stringify(data)).then(function (response) {

              // This function handles success


              token=  response.data.token;

              }, function (response) {

              // this function handles error

              });
            });


$scope.test(){
  
    $http.get("http://localhost:3000/game" ,{
headers: {
  "Authorization": "Bearer "+ token
} } )
          .then(function(response) {
              $scope.myWelcome = response.data.message;
              console.log(response.data);
          }, function (response) {
              console.log(response);
          // this function handles error

          });




                crypt();




            var url1 = 'http://localhost:3000/game';
            var data1 = {
               'answer':encrypted
             };

                   $http.post(url1   ,JSON.stringify(data1) ,

             {
 withCredentials: false,
 headers: {
     "Authorization": "Bearer "+ token
 }
}
           ).then(function (response) {

                   // This function handles success
                     $scope.answer = response.data.message;

                   }, function (response) {

                   // this function handles error

                   });

               };




function crypt(){

		try{
    	var salt = gensalt(10);  //for failing test change the number of rounds so the encryption wouldn't match up
		}catch(err){
    	alert(err);
    	return;
		}


  try{

		hashpw(
		$scope.myWelcome	,
			salt,

			function(result) {
      encrypted = result;
    });
  }catch(err){
    alert(err);
    return;
  }
}


});
