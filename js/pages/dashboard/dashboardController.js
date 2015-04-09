var app = angular.module('fencin');
        
app.controller('dashboardController', function($scope, userReference, clubReference, environmentService){
      var firebaseUrl = 'https://fencein.firebaseio.com/';
  var ref = new Firebase(firebaseUrl)
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
      $scope.clubNane = clubReference.clubName;
      $scope.c2 = environmentService.getClubName();
      $scope.userProfile = userReference;

    //  $scope.update = function(){
    //    $scope.profile.$save();
    //  };
    }
  });
});