var app = angular.module('fencin');

app.controller("mainController", function($scope, askfredService){
    $scope.tournamentName = 'Utah Swords Academy Fencing Club';
    $scope.tournaments = ['one', 'two'];
    console.log('tournaments', $scope.tournaments);
  
    $scope.tournamentlogin = function(){
      href="welcome.html";
    };
    
    $scope.checkIn = function (){
      console.log('checkIn');  
    };
    
    $scope.tournamentSelected = function (){
      window.location.hash = '/checkin';
      $('#checkinModal').modal('hide');     //hides the model
    };
  
  
//  $scope.getTournamentData = function(){
//    askfredService.getTournaments($scope.tournamentName).then(function(response){
//      //console.log('ctrl', response);
//      $scope.tournaments = response;
//      console.log('$scope.tournaments', $scope.tournaments);
//    });
//  }();

});

