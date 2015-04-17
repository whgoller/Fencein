var app = angular.module('fencin');
        
//app.controller('dashboardController', function($scope, userReference, clubReference, environmentService, currentAuth){
app.controller('dashboardController', function($scope, userReference, environmentService, currentAuth){
    console.log(currentAuth);
    if(currentAuth){
      //$scope.clubNane = clubReference.clubName;
      $scope.clubNane = "Utah Swords Academy";
      $scope.c2 = environmentService.getClubName();
      $scope.userProfile = userReference;
    }
});