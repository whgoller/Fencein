var app = angular.module('fencin');

app.controller('backroomController', function ($scope, checkinService, firebaseService, $modal) {
    var firebaseUrl = 'https://fencein.firebaseio.com/';
  var ref = new Firebase(firebaseUrl)
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
        $scope.currentTournament = checkinService.getCurrentTournament();

    //gets the checked in fencers from firebase and binds them to scope for display
        $scope.checkedInFencers = function () {
            firebaseService.getCheckedInFencers().then(function (data) { 
                $scope.fencers = data;
            });
        };


        $scope.fencingTime = function (fencer) {
            firebaseService.fencingTime(fencer);
        };



        $scope.getTournaments = function () {
            firebaseService.getTournaments().then(function (data) {
                $scope.tournaments = data;
                $scope.tournamentNames = [];
                for(i = 0; i < $scope.tournaments.length; i++){
                    $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
                }           
            });    
        }();



        if(!$scope.currentTournament){
          $scope.open = function () {      
            var modalInstance = $modal.open({
              templateUrl: '/js/pages/checkin/checkinSelection.html',
              controller: 'checkinSelectionController',
              size: 'sm',
              resolve: {
                tournaments: function () {
                  return $scope.tournaments;
                },
                tournamentNames: function () {
                  return $scope.tournamentNames;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.currentTournament = selectedItem;
              $scope.checkedInFencers();
            }, function () {
              console.log('Modal instance');
            });
          }();
        } else {
          $scope.checkedInFencers();
        }
    }
  });
});