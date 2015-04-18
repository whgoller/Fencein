var app = angular.module('fencin');
app.controller("mainController", function ($scope, askfredService, firebaseService, checkinService, $firebaseAuth, authService, $rootScope) {
  
  if(authService.isLoggedIn()){
    $scope.clubName = 'Utah Swords Academy Fencing Club';
    $scope.authorized = true;

    $scope.getTournaments = function () {
      firebaseService.getTournaments().then(function (data) {
        $scope.tournaments = data;
        $scope.tournamentNames = [];
        for(i = 0; i < $scope.tournaments.length; i++){
          $scope.tournamentNames.push($scope.tournaments[i].tournament.clubName);
        }           
      });
    }();

   $scope.$on('login', function (event, data) {
      console.log(data); // 'Some data'
    });
    
    
    $scope.signout = function(){            
      authService.logOut();
      toggleLogin();
    }
    
    var toggleLogin = function(){   
      $scope.authorized = authService.isLoggedIn();
    }
    
    $rootScope.$broadcast('checkinClicked', true);
    
    
  }
});