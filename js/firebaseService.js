var app = angular.module('fencin');

app.service('firebaseService', function ($firebaseArray, $firebaseObject, $q) {
    var clubsUrl = 'https://fencein.firebaseio.com/clubs';
    var tournamentsUrl = 'https://fencein.firebaseio.com/tournaments';
    var equipmentURL = 'https://fencein.firebaseio.com/equipment';
    //var equipmentListObj = $firebaseObject(new Firebase(equipmentURL));
    //var fencersUrl = 'https://fencein.firebaseio.com/fencers';
    //var eventsUrl = 'https://fencein.firebaseio.com/events';
    var fencersToAdd = [];
    var tournamentId;

    //keeps track of current tournament id called when the tournament is selected
    this.setTournamentId = function (id) {
        tournamentId = id;
    };


    // competitorId, competitorFirstName, competitorLastName, competitorRating, competitorYearBorn
    this.setClub = function () {
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

    this.setFenncerCheckedIn = function (fencer) {
        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
        console.log('fencer', fencer);
        console.log('fbArray', fbArray);
        fbArray.$add(fencer);
    };

//Returns a specific tournament by its ID
    this.getTournament = function () {
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
        this.getTournament(tournamentId).then(function (data) {
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

//Returns all equipmentTypes in the database
    this.getEquipmentList = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(equipmentURL)).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };

    //Creates all equipmentTypes in the database
    this.setEquipmentList = function (equipment) {
        var list = $firebaseArray(new Firebase(equipmentURL));
        list.$add({
            equipmentType: equipment
        });
    };

    //Creates equipment checkout list in the database
    this.setEquipmentList = function (equipment) {
        var list = $firebaseArray(new Firebase(equipmentURL + '/equipmentCheckedOut'));
        list.$add({
            fencerEquipment: equipment
        });
    };



//  this.getFencers = function () {
//      var deffered = $q.defer();
//      deffered.resolve($firebaseArray(new Firebase(fencersUrl)).$loaded().then(function (data) {
//          return data;
//      }
//      ));
//      return deffered.promise;
//  };

    this.getFencer = function (competitor_Id) {
        if (!(competitor_Id in this.fencers)) {
            console.log('this.fencers.competitor_Id', this.fencers.competitor_Id);
            fencersToAdd.push(this.fencers.competitor_Id);
        }
        ;
    };


    this.setFencers = function () {
        this.getFencers().then(function (data) {
            for (i in data) {
                this.getFencer(data[i].competitor_Id);
            }
            this.setFencersInFirebase();
        });
    };

//Get an array of events for the tournament
    this.getEvents = function () {
        var deffered = $q.defer();
        this.getTournament(tournament.id).then(function (data) {
            console.log('getEvents', data);
        });
        return deffered.promise;
    };

//    //Adds new fencer to fencingtimeArray
//    this.addToFencingTime = function (fencer) {
//        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/fencingTimeFencers'));
//        fencer.inFencingTime = false;
//        fbArray.$update(fencer);
//    };
//    
//    this
    //Moves the fencer to the fencingTime array
//    this.moveFencerToFencingTime = function (fencer) {
//        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/fencingTimeFencers'));
//        fencer.inFencingTime = false;
//        console.log('fencer', fencer);
////        fbArray.$update(fencer);
////        fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
////        fbArray.$remove(fencer);
//    };
//
//    //Moves fencer back to the checkedInFencers array
//    this.moveFromFencingTime = function (fencer) {
//        console.log('moveFromFencingTime', fencer)
//        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/fencingTimeFencers'));
//        fbArray.$add(fencer);
//        fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
//
//    };
    
    this.fencingTime = function(fencer){
        fencer.inFencingTime = ! fencer.inFencingTime;
        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
        fbArray.$save(fencer);
    };

});