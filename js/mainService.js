var app = angular.module('fencein');
        
app.service('mainService', function($window, $http){
  
  //firebase url
  var fbURL = new Firebase("https://fencein.firebaseio.com/fencin");
  //This will need a get tournaments from askFred.
  
  var getEnv= function () {
    return $window.env;
  }
  
  

  
});