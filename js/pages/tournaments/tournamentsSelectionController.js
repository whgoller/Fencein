var app = angular.module('fencin');

app.controller('tournamentSelectionController', function ($scope, askfredService, firebaseService) {
    $scope.clubInitials = 'USAFC';
    $scope.tournaments = [];
    $scope.events = [];


    $scope.getClubInfo = function (clubInitials) {
        askfredService.getClub($scope.clubInitials).then(function (response) {
            var club = response[0];
            $scope.clubName = club.name;
            $scope.clubInitials = club.initials;
            $scope.clubId = club.id;
            $scope.getTournamentsList($scope.clubName);
        });
    }();

  
    $scope.getTournamentsList = function (clubName) {
        askfredService.getTournaments(clubName).then(function (response) {
            $scope.tournaments = response;
        });
    };


    $scope.getTournamentEvents = function (selectedTournamentId) {
        askfredService.getSingleTournamentEvents(selectedTournamentId).then(function (events) {
            $scope.events = events;
            events.map(function (event) {
                askfredService.getPreRegisteredFencersInEvent(event.id).then(function (preRegFencers) {
                    event.preRegisteredFencers = preRegFencers;
                });
            });
        });
    };

  
    $scope.getEventFencers = function (eventId) {
        askfredService.getPreRegisteredFencersInEvent(eventId).then(function (fencers) {
            $scope.fencers = fencers;
            //trial code
            fencers.map(function (fencer) {
                askfredService.getAthleteByID(fencer.competitor_id).then(function (fencerDetails) {
                    fencer.fencerDetails = fencerDetails;
                });
            });

            //end trial code
        });
    };

  
    $scope.selectAction = function () {
        $scope.getTournamentEvents($scope.selectedTournament);
    };
  

    $scope.importIntoFirebase = function () {
      var tournament = {};
      for (i in $scope.tournaments) {
        if ($scope.tournaments[i].id === $scope.selectedTournament) {
          tournament = {
            id: $scope.tournaments[i].id,
            name: $scope.tournaments[i].name,
            events: $scope.tournaments[i].events,
            clubId: $scope.clubName,
            clubName: $scope.clubId,
            startDate: $scope.tournaments[i].start_date
          };
          break;
        }
      }
      console.log('tournament', tournament);
      firebaseService.setTournament(tournament);
    };
  

});
