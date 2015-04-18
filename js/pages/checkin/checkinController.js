var app = angular.module('fencin');
app.controller('checkinController', function ($scope, checkinService, firebaseService, $location, currentAuth) {
  if(currentAuth){
    $scope.$on('checkinClicked', function (event, data) {
      console.log('data', data); // 'Some data'
      if(data){
        $scope.reload();
      }
    });
    
    $scope.participants = [];
    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;
    $scope.currentTournament = checkinService.getCurrentTournament();


    $scope.tournamentName = 'Utah Swords Academy Fencing Club';

    $scope.getTournaments = function () {
        firebaseService.getTournaments().then(function (data) {
            $scope.tournaments = data;
            $scope.tournamentNames = [];
            for (i = 0; i < $scope.tournaments.length; i++) {
                $scope.tournamentNames.push($scope.tournaments[i].tournament.tournamentName);
            }
        });
    }();

//    $scope.getParticipants = function () {
//        var temp = {};
//        //$scope.currentTournament = checkinService.getCurrentTournament();
//        if ($scope.currentTournament && $scope.currentTournament.tournament.tournamentEvents.length) {
//            for (i = 0; i < $scope.currentTournament.tournament.tournamentEvents.length; i++) {
//                for (j = 0; j < $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers.length; j++) {
//                    temp[$scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor_id] =
//                            $scope.currentTournament.tournament.tournamentEvents[i].preRegisteredFencers[j].competitor;
//                }
//            }
//            for (keyName in temp) {
//                if (!temp[keyName].checkedIn) {
//                    temp[keyName].checkedIn = false;
//                }
//                $scope.participants.push(temp[keyName]);
//            }
//        }
//    };



  $scope.emptyFencer = function(){
    var newFencer = {
      first_name:'',
      last_name: '',
      usfa_id: null                          
      };
    checkinService.setParticipant(newFencer);
    window.location.hash = '/checkinParticipant';
    //$location.path('/checkinParticipant');
  };


    $scope.getParticipants = function () {
      firebaseService.getTournamentFencers().then(function (data) {
        $scope.participants = data;
      });
    };

    $scope.getParticipant = function (participant) {
      checkinService.setParticipant(participant);
      window.location.hash = '/checkinParticipant';
      //$location.path('/checkinParticipant');
    };



    if (!$scope.currentTournament) {
        window.location.hash = '/checkinSelection';
    } else {
        $scope.getParticipants();
    }
  }
});
