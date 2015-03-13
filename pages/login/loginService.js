var app = angular.module('fencin');
        
app.service('loginService', function($http, $q, Keys, Firebase, $FirebaseObject, $FirebaseArrays){
  
  this.getUser = function(){
    return {
      clubName: 'Utah Swords Academy Fencing Club'
    }
  };
  
  this.setUser = function(clubName){
    
  }
  
  
});