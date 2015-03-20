var app = angular.module('fencin');

app.controller('backroomController', function($scope, backroomService, firebaseService, checkinService) {
    $scope.addParticipants = backroomService.getAthletes();
    $scope.addedParticipants = [];

    $scope.addParticipant = function(participant) {
        var currentTurnament = checkinService.getCurrentTournament();
        console.log('currentTurnament', currentTurnament.id);
        firebaseService.setFenncerCheckedIn();
        
        $scope.addedParticipants.push(participant);
        console.log('$scope.addedParticipants', $scope.addedParticipants)
        $scope.addParticipants.splice($scope.addParticipants.indexOf(participant), 1);
    };

    $scope.removeParticipant = function(participant) {
        $scope.addParticipants.push(participant);
        $scope.addedParticipants.splice($scope.addedParticipants.indexOf(participant), 1);
    };
    
    
    
});