var app = angular.module('fencin');
        
app.service('firebaseService', function ($firebase, $firebaseArray, $firebaseObject) {
  var firebaseUrl = 'https://fencein.firebaseio.com/';
  
  var clubRef = new Firebase("https://fencein.firebaseio.com/clubs/");
  var competitorListRef = new Firebase("https://fencein.firebaseio.com/clubs/clubId/competitorsList");
  var equipmentRef = new Firebase("https://fencein.firebaseio.com/clubs/clubId/equipment");
  var fencersRef = new Firebase("https://fencein.firebaseio.com/fencers");
  // Not sure if the following are correct yet for our data structure. we can talk about it on Sat.

  this.setClub = function(clubId, clubName){    
    clubRef.push({
      clubId : clubId,
      clubName: clubName
    });
  };
  
  this.getClub = function(clubId){
    return $firebaseObject(new Firebase(firebaseUrl + 'clubs/' + clubId)).$asObject();
  };

  
  this.setTournament = function(clubId, tournamentId, tournamentName, numberOfEvents){
    
  }
  
  this.getTournament = function(clubId, tournamentId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId + '/tournaments' + tournamentId)).$asArray();
  }
  
  
  this.setTournamentEvents = function(clubId, tournamentId, tournamentName, ){
    
  }
  
  this.getTournamentEvents = function(clubId, tournamentId, eventId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId + '/tournaments/' + tournamentId '/events/' + eventId)).$asArray();
  }
  
  
  this.setCompetitor = function(competitorId, competitorFirstName, competitorLastName, competitorRating, competitorYearBorn){
    
  }
  
  this.getCompetitor = function(competitorId){
    
  }
  
  this.setEquipment = function(competitorId, equipmentList){
    
  }
  
  this.getEquipment = function(){
    
  }
  
  
})