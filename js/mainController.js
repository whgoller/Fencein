var app = angular.module('fencin');
app.controller("mainController", function ($scope, askfredService, firebaseService, checkinService, $firebaseAuth, authService) {
  
  //var ref = new Firebase('https://fencein.firebaseio.com/');
  //$scope.auth = $firebaseAuth(ref);
  
  if(authService.isLoggedIn()){
    $scope.tournamentName = 'Utah Swords Academy Fencing Club';
    $scope.authorized = true;

    $scope.getTournaments = function () {
      firebaseService.getTournaments().then(function (data) {
        $scope.tournaments = data;
        $scope.tournamentNames = [];
        for(i = 0; i < $scope.tournaments.length; i++){
          $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
        }           
      });
    }();


    $scope.signout = function(){            
      authService.logOut();
      toggleLogin();
    }
    
    var toggleLogin = function(){   
      $scope.authorized = authService.isLoggedIn();
    }
  }
});