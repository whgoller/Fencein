var app = angular.module('fencin');
        
app.controller('dashboardController', function($scope, userReference, clubReference, environmentService, currentAuth){
    console.log(currentAuth);
    if(currentAuth){
      $scope.clubNane = clubReference.clubName;
      $scope.c2 = environmentService.getClubName();
      $scope.userProfile = userReference;
    }
});