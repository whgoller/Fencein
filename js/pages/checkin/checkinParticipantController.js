var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService) {
    $scope.currentParticipant = checkinService.getParticipant();

});

