var app = angular.module('fencin');

app.controller('checkInController', function ($scope, firebaseService) {
   

    $scope.getParticipants = function (){
         $scope.participants = [{firstName: 'bob', lastName: 'sam'},{firstName: 'fred', lastName: 'both'}]; //TODO call firebase
    }();    //self calling function
    
    
    
//    $scope.tournaments = ['one', 'two', 'three'];
//    console.log('checkInController');
//    $scope.getTournamentData = function () {
//        console.log('getTournamentData');
//        $scope.events = askfredService.getTournamentData($scope.selectedTournament);
//    };
//    $scope.getAthlete = function () {
//        if ($scope.athlete.usfaID) {
//            $scope.athlete = askfredService.getAthleteByID($scope.athlete.usfaID);
//        }
//        else if ($scope.athlete.firstName && $scope.athlete.lastName) {
//            askfredService.getAthleteByName($scope.athlete.firstName, $scope.athlete.lastName).then(function (response) {
//                $scope.athlete = response;
//            });
//
//            console.log('getAthlete', $scope.athlete);
//        }       
//    };
});