var app = angular.module('fencin');
        
app.controller('tournamentSelectionController', function($scope, askfredService){
  $scope.tournamentName = 'Utah Swords Academy Fencing Club';
  $scope.tournaments = [];
  
  $scope.selectAction = function() {
    console.log($scope.selectedTournament);
    $scope.getTournamentData($scope.selectedTournament);
  };
  
  $scope.getTournamentsList = function(){
    askfredService.getTournaments($scope.tournamentName).then(function(response){
      //console.log('ctrl', response);
      $scope.tournaments = response;
      console.log('$scope.tournaments', $scope.tournaments);
    });
  }();
  
  $scope.getTournamentData = function(selectedTournamentId){
    askfredService.getSingleTournamentEvents(selectedTournamentId).then(function(response){
      $scope.selectedTournamentInfo = response;
      
      console.log('$scope.selectedTournamentInfo', $scope.selectedTournamentInfo);
    });
  }
  
  
  
  
  
});