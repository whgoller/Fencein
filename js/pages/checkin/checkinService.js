var app = angular.module('fencin');
app.service('checkinService', function (firebaseService) {
    this.creditTotal = 0;
    this.cashTotal = 0;
    this.checkTotal = 0;

    this.setCurrentTournament = function (tournament) {
        this.currentTournament = tournament;
        firebaseService.setTournamentId(this.currentTournament.$id);
    };
    
    this.getCurrentTournament = function(){
        return this.currentTournament;
    };

    this.setParticipant = function (participant) {
        this.currentParticipant = participant;
    };

    this.getParticipant = function () {
        return this.currentParticipant;
    };

    this.setPaidCredit = function (amount) {
        this.creditTotal += amount;
//        this.checkedInFencer();
    };

    this.setPaidCash = function (amount) {
        this.cashTotal += amount;
//        this.checkedInFencer();
    };

    this.setPaidCheck = function (amount) {
        this.checkTotal += amount;
//        this.checkedInFencer();
    };
    
    this.checkedInFencer = function(){
        this.currentParticipant.inFencingTime = false;
        firebaseService.setFenncerCheckedIn(this.currentParticipant);
    };
  
    this.getParticipantDetails = function(participant){
      console.log(participant);      
    };
  
});

