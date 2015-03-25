var app = angular.module('fencin');

app.controller('backroomController', function ($scope, checkinService, firebaseService) {
    $scope.currentTournament = checkinService.getCurrentTournament();

//gets the checked in fencers from firebase and binds them to scope for display
    $scope.checkedInFencers = function () {
        firebaseService.getCheckedInFencers().then(function (data) { 
            $scope.fencers = data;
        });
    }();


    $scope.fencingTime = function (fencer) {
        firebaseService.fencingTime(fencer);
    };
});