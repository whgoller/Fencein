var app = angular.module('fencin');

app.controller('checkInController', function($scope, checkInService) {
    $scope.tournaments = ['one', 'two', 'three'];
    console.log('checkInController');

    $scope.getTournamentData = function() {
        console.log('getTournamentData');
        $scope.events = checkInService.getTournamentData($scope.selectedTournament);

    };

    $scope.getAthlete = function() {
        if($scope.athlete.usfaID){
            $scope.athlete = checkInService.getAthleteByID($scope.athlete.usfaID);
        }
        else if($scope.athlete.firstName && $scope.athlete.lastName){
            $scope.athlete = checkInService.getAthleteByName($scope.athlete.firstName, $scope.athlete.lastName);
        }
    };
});