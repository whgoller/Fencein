var app = angular.module('fencin');

app.controller('checkInController', function ($scope) {

$scope.text = 'hi';
$scope.currentParticipant = {firstName: 'test', lastName: 'allen'};
    $scope.getParticipants = function () {
        $scope.participants = [{firstName: 'bob', lastName: 'sam'}, {firstName: 'fred', lastName: 'both'}]; //TODO call firebase
    }();    //self calling function

    $scope.getParticipant = function (participant) {
        debugger
        $scope.currentParticipant = participant;
        console.log('$scope.currentParticipant', $scope);
        window.location.hash = '/checkinParticipant';
    };
    
    $scope.testFunc = function (){
       console.log('test', $scope); 
    }


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