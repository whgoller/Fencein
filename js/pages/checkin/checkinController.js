var app = angular.module('fencin');
app.controller('checkinController', function ($scope, checkinService, firebaseService, $modal) {
    $scope.participants = [];
    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;
      $scope.currentTournament = checkinService.getCurrentTournament();

    $scope.getParticipants = function () {
      var temp = {};
      //$scope.currentTournament = checkinService.getCurrentTournament();
      if($scope.currentTournament && $scope.currentTournament.tournament.tournamentEvents.length){  
        for (i = 0; i < $scope.currentTournament.tournament.tournamentEvents.length; i++) {
            for (j = 0; j < $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers.length; j++) {
                temp[$scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor_id] =
                        $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor;
            }
        }
        for (keyName in temp) {
            $scope.participants.push(temp[keyName]);
        }
      }
    }; //self calling function

    $scope.getParticipant = function (participant) {
        checkinService.setParticipant(participant);
        window.location.hash = '/checkinParticipant';
    };
  
    $scope.tournamentName = 'Utah Swords Academy Fencing Club';
  
    $scope.getTournaments = function () {
        firebaseService.getTournaments().then(function (data) {
            $scope.tournaments = data;
            $scope.tournamentNames = [];
            for(i = 0; i < $scope.tournaments.length; i++){
                $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
            }           
        });    
    }()
  
    if(!$scope.currentTournament){
      $scope.open = function () {      
        console.log('opened')
        var modalInstance = $modal.open({
          templateUrl: '/js/pages/checkin/checkinModal.html',
          controller: 'checkinModalController',
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
          $scope.getParticipants();
        }, function () {
          console.log('Modal instance');
        });
      }();
    } else {
      $scope.getParticipants();
    }
  
  
  
  
});








//
//app.controller('checkinController', function ($scope, checkinService) {
//    $scope.participants = [];
//    $scope.orderByField = 'firstName';
//    $scope.reverseSort = false;
//
//
//    $scope.getParticipants = function () {
//        var temp = {};
//        $scope.currentTournament = checkinService.getCurrentTournament();
//        for (i = 0; i < $scope.currentTournament.tournament.tournamentEvents.length; i++) {
//            for (j = 0; j < $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers.length; j++) {
//                temp[$scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor_id] =
//                        $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor;
//            }
//        }
//        for (keyName in temp) {
//            $scope.participants.push(temp[keyName]);
//        }
//    }(); //self calling function
//
//    $scope.getParticipant = function (participant) {
//        checkinService.setParticipant(participant);
//        window.location.hash = '/checkinParticipant';
//    };
//});