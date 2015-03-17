var app = angular.module('fencin');

app.controller('backroomController', function($scope, backroomService) {
    $scope.addParticipants = backroomService.getAthletes();
    $scope.addedParticipants = [];

    $scope.addParticipant = function(participant) {
        $scope.addedParticipants.push(participant);
        $scope.addParticipants.splice($scope.addParticipants.indexOf(participant), 1);
    };

    $scope.removeParticipant = function(participant) {
        $scope.addParticipants.push(participant);
        $scope.addedParticipants.splice($scope.addedParticipants.indexOf(participant), 1);
    };
});