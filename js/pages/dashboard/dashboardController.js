var app = angular.module('fencin');
        
app.controller('dashboardController', function($scope, userReference, clubReference, environmentService){
  $scope.clubNane = environmentService.getClubName();
  $scope.userProfile = userReference;

//  $scope.update = function(){
//    $scope.profile.$save();
//  };
  
});