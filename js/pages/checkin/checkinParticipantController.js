var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService) {
    $scope.currentParticipant = checkinService.getParticipant();
    $scope.totalAmountDue = 0;

    $scope.getEvents = function () {
        $scope.currentTournament = checkinService.getCurrentTournament();
    }();    //self call

    $scope.eventSelected = function (selected) {
        console.log('selected', selected.cost);
        $scope.totalAmountDue += parseInt(selected.cost);
    };

    $scope.paidBy = function () {
        if ($scope.paymentType === 'cash') {
            checkinService.setPaidCash($scope.totalAmountDue);
        } else if ($scope.paymentType === 'check') {
            checkinService.setPaidCheck($scope.totalAmountDue);
        } else if ($scope.paymentType === 'card') {
            checkinService.setPaidCredit($scope.totalAmountDue);
        }

        window.location.hash = '/checkin';
    };
});

