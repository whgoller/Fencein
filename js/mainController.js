var app = angular.module('fencin');

app.controller("mainController", function($scope, askfredService){
    $scope.tournamentName = 'Utah Swords Academy Fencing Club';
  
    $scope.tournamentlogin = function(){
      href="welcome.html";
    };
  
  
//  $scope.getTournamentData = function(){
//    askfredService.getTournaments($scope.tournamentName).then(function(response){
//      //console.log('ctrl', response);
//      $scope.tournaments = response;
//      console.log('$scope.tournaments', $scope.tournaments);
//    });
//  }();

});

