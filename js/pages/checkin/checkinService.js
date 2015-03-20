var app = angular.module('fencin');
app.service('checkinService', function (firebaseService) {
    this.creditTotal = 0;
    this.cashTotal = 0;
    this.checkTotal = 0;

    this.setCurrentTournament = function (tournament) {
        this.currentTournament = tournament;
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
        this.checkedInFencer();
    };

    this.setPaidCash = function (amount) {
        this.cashTotal += amount;
        this.checkedInFencer();
    };

    this.setPaidCheck = function (amount) {
        this.checkTotal += amount;
        this.checkedInFencer();
    };
    
    this.checkedInFencer = function(){
        firebaseService.setFenncerCheckedIn(this.currentTournament , this.currentParticipant);
    };
});

