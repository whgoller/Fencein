var app = angular.module('fencin');
        
app.service('firebaseService', function ($firebase, $firebaseArray, $firebaseObject) {
  var firebaseUrl = 'https://fencein.firebaseio.com/';
  
  
  // Not sure if the following are correct yet for our data structure. we can talk about it on Sat.

  this.getClub = function(clubId){
    return $firebase(new Firebase(firebaseUrl + 'clubs/' + clubId)).$asObject();
  };

  this.getTournament = function(clubId){
    return $firebase(new Firebase(firebaseUrl + 'clubss/' + clubId + '/tournaments')).$asArray();
  }
  
  this.getTournamentEvents = function(clubId, tournamentId){
    return $firebase(new Firebase(firebaseUrl + 'clubss/' + clubId + '/tournaments/' + tournamentId)).$asArray();
  }
  
  this.setClub = function(clubId){
    
    
  }
  
})