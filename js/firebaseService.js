var app = angular.module('fencin');

app.service('firebaseService', function ($firebaseArray, $firebaseObject, $q) {
    var clubsUrl = 'https://fencein.firebaseio.com/clubs';
    var tournamentsUrl = 'https://fencein.firebaseio.com/tournaments';
    //var fencersUrl = 'https://fencein.firebaseio.com/fencers';
    //var eventsUrl = 'https://fencein.firebaseio.com/events';
    var fencersToAdd = [];

    
    // competitorId, competitorFirstName, competitorLastName, competitorRating, competitorYearBorn
    this.setClub= function () {
        var list = $firebaseArray(new Firebase(clubsUrl));
        list.$add({
            clubName: 'bob',
            clubId: 'this.clubId'

        }).then(function (ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            list.$indexFor(id); // returns location in the array

        });
    };

//Returns a specific tournament by its ID
    this.getTournament = function (tournamentId) {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(tournamentsUrl)).$loaded().then(function (data) {
            for (i in data) {
                if (data[i].tournamentId === tournamentId) {
                    return data[i];
                }
            }
        }));
        return deffered.promise;
    };

//Returns all the tournaments
    this.getTournaments = function () {
        var deffered = $q.defer();

        deffered.resolve($firebaseArray(new Firebase(tournamentsUrl)).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };

//Sets a tournament in the database if it doesn't already exsist
    this.setTournament = function (tournament) {
        this.getTournament(tournament.tournamentId).then(function (data) {
            if (!data) {
                var fbArray = $firebaseArray(new Firebase(tournamentsUrl));
                fbArray.$add({
                  tournament: tournament
                }).then(function (ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                    fbArray.$indexFor(id); // returns location in the array
                });
            }
        });
    };



    this.getFencers = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(fencersUrl)).$loaded().then(function (data) {
            return data;
        }
        ));
        return deffered.promise;
    };

    this.getFencer = function (competitor_Id) {
        if (!(competitor_Id in this.fencers)) {
            console.log('this.fencers.competitor_Id', this.fencers.competitor_Id);
            fencersToAdd.push(this.fencers.competitor_Id);
        }
        ;
    };


    this.setFencers = function (fencers) {
        //TODO: build object from fencers
        this.getFencers().then(function (data) {
            for (i in data) {
                this.getFencer(data[i].competitor_Id);
            }
            this.setFencersInFirebase();
        });
    };


    this.setFencersInFirebase = function () {
//  for(i in this.getFencer){
//    if (!data) {
//      var fbArray = $firebaseArray(new Firebase(tournamentsUrl));
//      fbArray.$add({
//        tournamentId: tournament.id,
//        tournamentName: tournament.name,
//        tournamentEvents: tournament.events,
//        tournamentClubId: tournament.clubId,
//        tournamentClubName: tournament.clubName,
//        tournamentStartDate: tournament.startDate
//      }).then(function (ref) {
//        var id = ref.key();
//        console.log("added record with id " + id);
//        fbArray.$indexFor(id); // returns location in the array
//      });
//    }
//  }
    }

//  
//  this.setEquipment = function(competitor_Id, equipmentList){
//    
//  }
//  
//  this.getEquipment = function(){
//    
//  }
//  

//Get an array of events for the tournament
    this.getEvents = function (tournamentId) {
        var deffered = $q.defer();
        this.getTournament(tournament.id).then(function (data) {
            console.log('getEvents', data);
        });
        return deffered.promise;
    };

});