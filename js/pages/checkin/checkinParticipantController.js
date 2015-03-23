var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService) {
    $scope.currentParticipant = checkinService.getParticipant();
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
  
    $scope.equipmentCheckout = function(){
      window.location.hash = '/equipment';
    };
  
    
    $scope.submit = function(){
        console.log('currentParticipant', $scope.currentTournament.tournament.tournamentEvents)
      window.location.hash = '/checkin';
    };
  
//currentTournament.tournament.tournamentEvents
    $scope.checkEventsPreregistered = function(event){
     // debugger
      if(event.fencerIds.indexOf($scope.currentParticipant.id) !== -1){
        $scope.eventSelected(event);
        return true;
      }
      return false;
    };  
});

