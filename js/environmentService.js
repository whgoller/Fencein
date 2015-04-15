var app = angular.module('fencin');

app.service('environmentService', function ($window, $http) {
    return {
      getEnv: function () {
        return $window.env;
      },
      
      saveUsername: function(username){
        $window.localStorage.setItem('username', username);
      },
      
      getUsername: function(){
        return $window.localStorage.getItem('username');
      },
      
      saveClubName: function(clubname){
        $window.localStorage.setItem('clubname', clubname);
      },

      getClubName: function(){
        return $window.localStorage.getItem('clubname');
      },
    
      saveClubInitials: function(clubInitials){
        $window.localStorage.setItem('clubInitials', clubInitials);
      },

      getClubInitials: function(){
        return $window.localStorage.getItem('clubInitials');
      },
    
      //keeps track of current tournament id called when the tournament is selected
      saveTournament: function(tournamentId){
        $window.localStorage.setItem('tournamentId', tournamentId);
      },

      getTournament: function(){
        return $window.localStorage.getItem('tournamentId');
      },
      
      saveCurrentFencerEventsTotal: function(total){
        $window.localStorage.setItem('total', total);
      },
      
      getCurrentFencerEventsTotal: function(){
        $window.localStorage.setItem('total', total);
      }
      
    }

    
//  this.getEnv = function () {
//    return $window.env;
//  };

//  this.saveUsername = function(username){
//    $window.localStorage.setItem('username', username);
//  };
//
//  this.getUsername= function(){
//    return $window.localStorage.getItem('username');
//  }
//    
//  this.saveClubName = function(clubname){
//    $window.localStorage.setItem('clubname', clubname);
//  };
//
//  this.getClubName= function(){
//    return $window.localStorage.getItem('clubname');
//  }
//    
//  
//  this.saveClubInitials = function(clubInitials){
//    $window.localStorage.setItem('clubInitials', clubInitials);
//  };
//
//  this.getClubInitials= function(){
//    return $window.localStorage.getItem('clubInitials');
//  }
//    
//  
//  //keeps track of current tournament id called when the tournament is selected
//  this.saveTournament = function(tournamentId){
//    $window.localStorage.setItem('tournamentId', tournamentId);
//  };
//
//  this.getTournament= function(){
//    return $window.localStorage.getItem('tournamentId');
//  }
  
  

});