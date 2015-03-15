var app = angular.module('fencin');

app.controller('checkinController', function ($scope, checkinService) {

    $scope.getParticipants = function () {
        $scope.participants = [{firstName: 'bob', lastName: 'sam'}, {firstName: 'fred', lastName: 'both'}]; //TODO call firebase
    }();    //self calling function

    $scope.getParticipant = function (participant) {
        checkinService.setParticipant(participant);
        window.location.hash = '/checkinParticipant';
    };


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