var app = angular.module('fencin');
        
app.controller('tournamentSelectionController', function($scope, askfredService, $firebaseObject, $firebaseArray){
  $scope.clubInitials = 'USAFC';
  $scope.tournaments = [];
  $scope.events = [];
  
  
  $scope.getClubInfo = function(clubInitials){
    askfredService.getClub($scope.clubInitials).then(function(response){
      var club = response[0];
      $scope.clubName = club.name
      $scope.clubInitials = club.initials
      $scope.clubId = club.id
      console.log('club', club);
      console.log('$scope.clubName', $scope.clubName);
      console.log('$scope.clubInitials', $scope.clubInitials);
      console.log('$scope.clubId', $scope.clubId);
      $scope.getTournamentsList();
    });
  }();
  
  $scope.getTournamentsList = function(){
    askfredService.getTournaments($scope.clubName).then(function(response){
      $scope.tournaments = response;
      console.log('$scope.tournaments', $scope.tournaments);
    });
  };
  
  
  $scope.getTournamentEvents = function(selectedTournamentId){
    askfredService.getSingleTournamentEvents(selectedTournamentId).then(function(events){
      $scope.events = events; 
      events.map(function(event){
        askfredService.getPreRegisteredFencersInEvent(event.id).then(function(preRegFencers){
          event.preRegisteredFencers = preRegFencers
        });
      });
      console.log('$scope.events', $scope.events);
    });
  }
  
  $scope.getEventFencers = function(eventId){
    askfredService.getPreRegisteredFencersInEvent(eventId).then(function(response){
      $scope.fencers = response;
      console.log('$scope.fencers', $scope.fencers);
    });
  }
  
  $scope.selectAction = function() {
    console.log($scope.selectedTournament);
    $scope.getTournamentEvents($scope.selectedTournament);
    
  }
  
  
  
  
  
   $scope.importIntoFirebase = function(){
     var list = $firebaseArray(new Firebase('https://fencein.firebaseio.com/clubs'));
     list.$add({
       clubName: $scope.clubName,
       clubId: $scope.clubId
               
     }).then(function(ref){
       var id = ref.key();
       console.log("added record with id " + id);
       list.$indexFor(id); // returns location in the array
            
     });
     
   }
  
  
  
  
});
