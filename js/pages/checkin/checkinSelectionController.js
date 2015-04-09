var app = angular.module('fencin');

app.controller('checkinSelectionController', function ($scope, checkinService, firebaseService, $location) {
    var firebaseUrl = 'https://fencein.firebaseio.com/';
  var ref = new Firebase(firebaseUrl)
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
      $scope.clubName = 'Utah Swords Academy Fencing Club';
      $scope.getTournaments = function () {
          firebaseService.getTournaments().then(function (data) {
              $scope.tournaments = data;
              $scope.tournamentNames = [];
              for (i = 0; i < $scope.tournaments.length; i++) {
                  $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
              }
          });
      }();


      $scope.tournamentSelected = function () {
           for(i = 0; i < $scope.tournaments.length; i++){
               if($scope.tournaments[i].tournament.tournamentName === $scope.selectedTournament){ 
                   checkinService.setCurrentTournament($scope.tournaments[i]);
                  $scope.selected = $scope.tournaments[i]
                   break;
               }
           }
          //TODO: need to change to use $location 
          window.location.hash = '/checkin';
      };

    }
  });
});
