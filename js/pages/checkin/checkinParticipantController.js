var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService) {
    $scope.currentParticipant = checkinService.getParticipant();

//    $scope.currentParticipantDetails = firebaseService.getUSFAFencer($scope.currentParticipant.usfa_id);

    $scope.currentParticipantDetails = function (id) {
        firebaseService.getUSFAFencer(id).then(function (data) {
            
            $scope.checkedInFencers = data;
            console.log(' $scope.checkedInFencers',  $scope.checkedInFencers);
        });
    }($scope.currentParticipant.usfa_id);

    console.log('currentParticipantDetails', $scope.currentParticipantDetails);


    $scope.currentTournament = checkinService.getCurrentTournament();
    $scope.totalAmountDue = 0;

    $scope.getEvents = function () {
        $scope.tournamentEvents = $scope.currentTournament.tournament.tournamentEvents;
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
    };

    $scope.equipmentCheckout = function () {
        window.location.hash = '/equipment';
    };


    $scope.submit = function () {
        console.log('currentParticipant', $scope.currentTournament.tournament.tournamentEvents);
        //Need to remove fencer from checkin list and add to a checked-in list.
        console.log($scope.currentParticipant)

        //firebaseService.setFenncerCheckedIn();
        window.location.hash = '/checkin';
    };

//Will select preregistered events for the fencer.
    $scope.checkEventsPreregistered = function (event) {
        if (event.fencerIds.indexOf($scope.currentParticipant.id) !== -1) {
            $scope.eventSelected(event);
            return true;
        }
        return false;
    };
});

