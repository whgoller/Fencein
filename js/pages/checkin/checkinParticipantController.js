var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService) {
    $scope.currentParticipant = checkinService.getParticipant();
    $scope.currentTournament = checkinService.getCurrentTournament();
    $scope.totalAmountDue = 0;
    $scope.eventsParticipatingIn = [];

    //Pulls the usfencing.org fencer information 
    $scope.currentParticipantDetails = function (id) {
      if(id){
        firebaseService.getUSFAFencer(id).then(function (data) {
            if(data.competitive === true){
              data.competitive = "Yes";
            } else if(data.competitive === false){
              data.competitive = "No";
            } 
            $scope.fencerDetails = data;
            console.log(data);
        });
      } else {
        $scope.fencerDetails = null;
      }
    }($scope.currentParticipant.usfa_id);



    //when a event is selected it add/removes it from the eventsParticipatingIn array
    $scope.eventSelected = function (selected) {
        if ($scope.eventsParticipatingIn.indexOf(selected.full_name) === -1) {
            $scope.eventsParticipatingIn.push(selected.full_name);
        }
        else {
            if ($scope.eventsParticipatingIn.length === 0) {
                $scope.eventsParticipatingIn = [];
            }
            else {
                $scope.eventsParticipatingIn.splice($scope.eventsParticipatingIn.indexOf(selected.full_name), 1);
            }
        }
        calculateAmountDue();
    };

//calculates the amount due
    var calculateAmountDue = function () {
        $scope.totalAmountDue = 0;
        for (i = 0; i < $scope.eventsParticipatingIn.length; i++) {
            for (j = 0; j < $scope.tournamentEvents.length; j++) {
                if ($scope.tournamentEvents[j].full_name === $scope.eventsParticipatingIn[i]) {
                    $scope.totalAmountDue += parseInt($scope.tournamentEvents[j].fee);
                }
            }
        }
    };

    //saves method of payment to checkinService
    $scope.paidBy = function () {
        if ($scope.paymentType === 'cash') {
            checkinService.setPaidCash($scope.totalAmountDue);
        } else if ($scope.paymentType === 'check') {
            checkinService.setPaidCheck($scope.totalAmountDue);
        } else if ($scope.paymentType === 'card') {
            checkinService.setPaidCredit($scope.totalAmountDue);
        }
    };

    //sends user to the equipment checkout page
    $scope.equipmentCheckout = function () {
        window.location.hash = '/equipment';
    };


    //submits fencer to the database for backroom access. 
    //will need the fencer duplicated per event registered
    $scope.submit = function () {
        //Need to remove fencer from checkin list and add to a checked-in list.
        firebaseService.checkedIn($scope.currentParticipant);
        $scope.currentParticipant.details = $scope.fencerDetails;
        $scope.currentParticipant.inFencingTime = false;
        $scope.checkInComplete = true;

        if ($scope.eventsParticipatingIn.length > 0) {
            for (var i = 0; i < $scope.eventsParticipatingIn.length; i++) {
                $scope.currentParticipant.eventName = $scope.eventsParticipatingIn[i];
                firebaseService.setFenncerCheckedIn($scope.currentParticipant);
            }
        }
        window.location.hash = '/checkin';
    };

//Will select preregistered events for the fencer.
    var checkEventsPreregistered = function () {
        for (i = 0; i < $scope.tournamentEvents.length; i++) {
            if ($scope.tournamentEvents[i].fencerIds.indexOf($scope.currentParticipant.competitor_id) !== -1) {
                if ($scope.eventsParticipatingIn.indexOf($scope.tournamentEvents[i].full_name) === -1) {
                    $scope.eventsParticipatingIn.push($scope.tournamentEvents[i].full_name);
                    //This array is attached to the checked model and auto checks the checkboxes
                    $scope.tournamentEvents[i].preRegistered = true;
                }
                else {
                    $scope.tournamentEvents[i].preRegistered = false;
                }
            }
        }
        calculateAmountDue();
    };

    //populates all the events within this tournament
    $scope.getEvents = function () {
        $scope.tournamentEvents = $scope.currentTournament.tournament.tournamentEvents;
        checkEventsPreregistered();
    }();    //self call

});

