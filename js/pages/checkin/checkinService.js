var app = angular.module('fencin');
app.service('checkinService', function () {
    this.creditTotal = 0;
    this.cashTotal = 0;
    this.checkTotal = 0;

    this.setCurrentTournament = function (tournament) {
        this.currentTournament = tournament;
        console.log('currentTournament', this);
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
        console.log('this.creditTotal', this.creditTotal);
    };

    this.setPaidCash = function (amount) {
        this.cashTotal += amount;
        console.log('this.cashTotal', this.cashTotal);
    };

    this.setPaidCheck = function (amount) {
        this.checkTotal += amount;
        console.log('this.checkTotal', this.checkTotal);
    };
});

