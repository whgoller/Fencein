var app = angular.module('fencin');
app.controller("mainController", function ($scope, askfredService, firebaseService, checkinService) {
    $scope.tournamentName = 'Utah Swords Academy Fencing Club';
    $scope.getTournaments = function () {
        firebaseService.getTournaments().then(function (data) {
            $scope.tournaments = data;
            $scope.tournamentNames = [];
            for(i = 0; i < $scope.tournaments.length; i++){
                $scope.tournamentNames.push($scope.tournaments[i].tournamentName);
            }           
        });
    }();

    $scope.tournamentlogin = function () {
        href = "welcome.html";
    };
    $scope.checkIn = function () {
        console.log('checkIn');
    };
    $scope.tournamentSelected = function () {        
         for(i = 0; i < $scope.tournaments.length; i++){
             if($scope.tournaments[i].tournamentName === $scope.selectedTournament){ 
                 checkinService.setCurrentTournament($scope.tournaments[i]);
                 break;
             }
         }
        window.location.hash = '/checkin';
        $('#checkinModal').modal('hide'); //hides the model
    };
//  $scope.getTournamentData = function(){
//    askfredService.getTournaments($scope.tournamentName).then(function(response){
//      //console.log('ctrl', response);
//      $scope.tournaments = response;
//      console.log('$scope.tournaments', $scope.tournaments);
//    });
//  }();

});

