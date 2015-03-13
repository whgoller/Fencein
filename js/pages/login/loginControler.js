var app = angular.module('fencin');
        
app.controller('loginController', function($scope, loginService){
  
  $scope.getLoggedInUser = function(){
    
    return loginService.getUser();
  };
  
  $scope.setLoggedInUser = function(clubName){
    
  }
});