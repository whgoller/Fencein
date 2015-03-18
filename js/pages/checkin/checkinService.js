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
        console.log('this', this);
        return this.currentTournament;
    };

//    this.getTournamentData = function (tournament) {
//        console.log('getTournamentData service', tournament);
//        return [
//            {name: 'foil',
//                cost: '10'},
//            {name: 'epee',
//                cost: '20'},
//            {name: 'saber',
//                cost: '30'}
//        ];
//    };
//    this.getAthleteByID = function (usfaID) {
//        return {
//            firstName: 'Bob',
//            lastName: 'Fred',
//            usfaID: usfaID
//        };
//    };
//    this.getAthleteByName = function (firstName, secondName) {
//        return {
//            firstName: firstName,
//            lastName: secondName,
//            usfaID: 1234
//        };
//    };

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

