var app = angular.module('fencin');

app.controller('checkinController', function ($scope, checkinService) {

    $scope.getParticipants = function () {
//        $scope.participants = [{firstName: 'bob', lastName: 'sam'}, {firstName: 'fred', lastName: 'both'}]; //TODO call firebase
        $scope.currentTournament = checkinService.getCurrentTournament();
        console.log('$scope.currentTournament', $scope.currentTournament);
        $scope.participants = $scope.currentTournament.tournament  //tournamentEvents[] loop
        //preRegisteredFencers[]
        //competitor_id
    }();    //self calling function

    $scope.getParticipant = function (participant) {
        checkinService.setParticipant(participant);
        window.location.hash = '/checkinParticipant';
    };
});