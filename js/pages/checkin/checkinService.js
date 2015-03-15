var app = angular.module('fencin');
app.service('checkinService', function() {
    this.getTournamentData = function(tournament) {
        console.log('getTournamentData service', tournament);
        return [
            {name: 'foil',
                cost: '10'},
            {name: 'epee',
                cost: '20'},
            {name: 'saber',
                cost: '30'}
        ];
    };
    this.getAthleteByID = function(usfaID) {
        return {
            firstName: 'Bob',
            lastName: 'Fred',
            usfaID: usfaID
        };
    };
    this.getAthleteByName = function(firstName, secondName) {
        return {
            firstName: firstName,
            lastName: secondName,
            usfaID: 1234
        };
    };
    
    this.setParticipant = function(participant){
        this.currentParticipant = participant;
    };
    
    this.getParticipant = function(){
        return this.currentParticipant;
    };
});

