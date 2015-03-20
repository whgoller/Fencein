var app = angular.module('fencin');
app.controller('checkinController', function ($scope, checkinService) {
    $scope.participants = [];
    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;


    $scope.getParticipants = function () {
        var temp = {};
        $scope.currentTournament = checkinService.getCurrentTournament();
        for (i = 0; i < $scope.currentTournament.tournament.tournamentEvents.length; i++) {
            for (j = 0; j < $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers.length; j++) {
                temp[$scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor_id] =
                        $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor;
            }
        }
        for (keyName in temp) {
            $scope.participants.push(temp[keyName]);
        }
    }(); //self calling function

    $scope.getParticipant = function (participant) {
        checkinService.setParticipant(participant);
        window.location.hash = '/checkinParticipant';
    };
});