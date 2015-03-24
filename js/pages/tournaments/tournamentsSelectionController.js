var app = angular.module('fencin');

app.controller('tournamentSelectionController', function ($scope, askfredService, firebaseService) {
    $scope.clubInitials = 'USAFC';
    $scope.tournaments = [];
   // $scope.events = [];


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
      //var fencerIds = [];
      askfredService.getSingleTournamentEvents(selectedTournamentId).then(function (events) {
        $scope.events = events;
        console.log('$scope.getTournamentEvents', $scope.events);
        events.map(function (event) {
          var fencerIds = [];
          askfredService.getPreRegisteredFencersInEvent(event.id).then(function (preRegFencers) {
            for(var i=0; i<preRegFencers.length; i++){
              //preRegFencers[i].competitor.rating = preRegFencers[i].rating;
              //preRegFencers[i].competitor.competitor_id = preRegFencers[i].competitor_id;
              preRegFencers[i].competitor.club = preRegFencers[i].club;
              fencerIds.push(preRegFencers[i].competitor_id);
            //console.log('preRegFencers', preRegFencers[i])
            }
              event.preRegisteredFencers = preRegFencers;
           // console.log('preRegFencers', preRegFencers)
          });
          event.fencerIds = fencerIds;
        });
      });
      
    };
  

    $scope.getEventFencers = function (eventId) {
      askfredService.getPreRegisteredFencersInEvent(eventId).then(function (fencers) {
        $scope.fencers = fencers;
        fencers.map(function (fencer) {
          askfredService.getAthleteByID(fencer.competitor_id).then(function (fencerDetails) {
            fencer.fencerDetails = fencerDetails;
          });
        });
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
            tournamentId: $scope.tournaments[i].id,
            tournamentName: $scope.tournaments[i].name,
            tournamentEvents: $scope.events,
            tournamentClubId: $scope.clubName,
            tournamentClubName: $scope.clubId,
            tournamentStartDate: $scope.tournaments[i].start_date
          };
          break;
        }
      }
      console.log('tournament', tournament);
      firebaseService.setTournament(tournament);
    };




});
