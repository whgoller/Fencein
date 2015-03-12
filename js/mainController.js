var app = angular.module('fencin');

app.controller("MainController", function($scope, askfredService){
    $scope.tournamentName;
    $scope.tournamentlogin = function(){
      href="welcome.html";
    };
  
  
  $scope.getFredData = function(){
    askfredService.getClubTournamentList().then(function(response){
      console.log(response);
    });
  }();

});

