var app = angular.module('fencin');

app.controller('backroomController', function($scope, backroomService, checkinService, firebaseService) {
    $scope.currentTournament = checkinService.getCurrentTournament();
    
    $scope.fencingTime = function(fencer){
        firebaseService.fencingTime(fencer);
        console.log('fencer',fencer)
        console.log('$scope.currentTournament', $scope.currentTournament)
    };   
});