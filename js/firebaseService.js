var app = angular.module('fencin');

app.service('firebaseService', function ($firebaseArray, $firebaseObject, $q) {
    console.log('here');
    var clubsUrl = 'https://fencein.firebaseio.com/clubs';
    var tournamentsUrl = 'https://fencein.firebaseio.com/tournaments';
    var fencersUrl = 'https://fencein.firebaseio.com/fencers';
    var eventsUrl = 'https://fencein.firebaseio.com/events';

    var fencersRef = new Firebase("https://fencein.firebaseio.com/fencers");
    // competitorId, competitorFirstName, competitorLastName, competitorRating, competitorYearBorn
    this.setCompetitor = function () {
        var list = $firebaseArray(new Firebase('https://fencein.firebaseio.com/clubs'));

        list.$add({
            clubName: 'bob',
            clubId: 'this.clubId'

        }).then(function (ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            list.$indexFor(id); // returns location in the array

        });
    };

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

    this.setTournament = function (tournament) {
        this.getTournament(tournament.id).then(function (data) {
            if (!data) {
                var fbArray = $firebaseArray(new Firebase(tournamentsUrl));
                fbArray.$add({
                    tournamentId: tournament.id,
                    tournamentName: tournament.name,
                    tournamentEvents: tournament.events,
                    tournamentClubId: tournament.clubId,
                    tournamentClubName: tournament.clubName,
                    tournamentStartDate: tournament.startDate
                }).then(function (ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                    fbArray.$indexFor(id); // returns location in the array

                });
            }
        });       
    };
    
      
  this.getFencer = function(competitorId){

  };
  
  this.setFencer = function (fencer){
      
  };
  


























//  var firebaseUrl = 'https://fencein.firebaseio.com/';
//  
//  var clubRef = new Firebase("https://fencein.firebaseio.com/clubs/");
//  var competitorListRef = new Firebase("https://fencein.firebaseio.com/clubs/clubId/competitorsList");
//  var equipmentRef = new Firebase("https://fencein.firebaseio.com/clubs/clubId/equipment");
//  // Not sure if the following are correct yet for our data structure. we can talk about it on Sat.
//
//  this.setClub = function(clubId, clubName){    
//    clubRef.push({
//      clubId : clubId,
//      clubName: clubName
//    });
//  };
//  
//  this.getClub = function(clubId){
//    return $firebaseObject(new Firebase(firebaseUrl + 'clubs/' + clubId)).$asObject();
//  };
//
//  
//  
//  
//  this.setTournamentEvents = function(clubId, tournamentId, tournamentName, ){
//    
//  }
//  
//  this.getTournamentEvents = function(clubId, tournamentId, eventId){
//    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId + '/tournaments/' + tournamentId '/events/' + eventId)).$asArray();
//  }
//  
//  

//  
//  this.setEquipment = function(competitorId, equipmentList){
//    
//  }
//  
//  this.getEquipment = function(){
//    
//  }
//  

})