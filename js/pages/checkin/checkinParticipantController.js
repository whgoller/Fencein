var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService) {
    $scope.currentParticipant = checkinService.getParticipant();
    $scope.totalAmountDue = 0;

    $scope.getEvents = function () {
        $scope.currentTournament = checkinService.getCurrentTournament();
        console.log('$scope.currentTournament', $scope.currentTournament);
    }();    //self call

//Calculates the amount owed when they select/unselect events to participate in
    $scope.eventSelected = function (selected) {
        if (selected.preRegistered) {
            $scope.totalAmountDue += parseInt(selected.fee);
        }
        else {
            $scope.totalAmountDue -= parseInt(selected.fee);
        }
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

