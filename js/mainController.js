var app = angular.module('fencin');
app.controller("mainController", function ($scope, askfredService, firebaseService, checkinService) {
  //important until we get club registration built  
      var firebaseUrl = 'https://fencein.firebaseio.com/';
  var ref = new Firebase(firebaseUrl)
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
      $scope.tournamentName = 'Utah Swords Academy Fencing Club';
  
        $scope.getTournaments = function () {
            firebaseService.getTournaments().then(function (data) {
                $scope.tournaments = data;
                $scope.tournamentNames = [];
                for(i = 0; i < $scope.tournaments.length; i++){
                    $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
                }           
            });
        }();

        $scope.tournamentlogin = function () {
            href = "welcome.html";
        };
        $scope.checkIn = function () {
            console.log('checkIn');
        };
    //    $scope.tournamentSelected = function () {
    //         for(i = 0; i < $scope.tournaments.length; i++){
    //             if($scope.tournaments[i].tournament.tournamentName === $scope.selectedTournament){ 
    //                 checkinService.setCurrentTournament($scope.tournaments[i]);
    //                 break;
    //             }
    //         }
    //        window.location.hash = '/checkin';
    //        $('#checkinModal').modal('hide'); //hides the model
    //    };
    }
  });

});

