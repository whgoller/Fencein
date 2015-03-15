var app = angular.module('fencin');
        
app.service('firebaseService', function ($firebase, $firebaseArray, $firebaseObject) {
  var firebaseUrl = 'https://fencein.firebaseio.com/';
  
  
  // Not sure if the following are correct yet for our data structure. we can talk about it on Sat.

  this.setClub = function(clubId, clubName){
    
  };
  
  this.getClub = function(clubId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId)).$asObject();
  };

  
  this.setTournament = function(){
    
  }
  
  this.getTournament = function(clubId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId + '/tournaments')).$asArray();
  }
  
  
  this.setTournamentEvents = function(clubId, tournamentId, tournamentName, ){
    
  }
  
  this.getTournamentEvents = function(clubId, tournamentId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId + '/tournaments/' + tournamentId)).$asArray();
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