var app = angular.module('fencin');

app.controller("checkinModalController", function ($scope, firebaseService, checkinService, $modalInstance, tournaments, tournamentNames) {
    var firebaseUrl = 'https://fencein.firebaseio.com/';
  var ref = new Firebase(firebaseUrl)
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
        //important until we get club registration built  
        $scope.tournamentName = 'Utah Swords Academy Fencing Club';


      //  
      //    $scope.getTournaments = function () {
      //        firebaseService.getTournaments().then(function (data) {
      //            $scope.tournaments = data;
      //            $scope.tournamentNames = [];
      //            for(i = 0; i < $scope.tournaments.length; i++){
      //                $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
      //            }           
      //        });      
      //    }();

          $scope.tournaments = tournaments;
          $scope.tournamentNames = tournamentNames;

          $scope.tournamentSelected = function () {
               for(i = 0; i < $scope.tournaments.length; i++){
                   if($scope.tournaments[i].tournament.tournamentName === $scope.selectedTournament){ 
                       checkinService.setCurrentTournament($scope.tournaments[i]);
                      $scope.selected = $scope.tournaments[i]
                       break;
                   }
               }
              $modalInstance.close($scope.selected);
              //window.location.hash = '/checkin';
              //$('#checkinModal').modal('hide'); //hides the model
          };

    }
  });
  
});

