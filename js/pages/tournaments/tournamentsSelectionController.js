var app = angular.module('fencin');

app.controller('tournamentSelectionController', function ($scope, askfredService, firebaseService, $location) {
    $scope.clubInitials = 'USAFC';
    //$scope.clubName = 'Utah State Fair Park'
    $scope.clubId = 251;
    $scope.tournaments = [];
    $scope.fencersInAllEvents = [];
   // $scope.events = [];

//      //will pull the club information based off of the clubInitials from the askfredService.
//    $scope.getClubInfo = function (clubId) {
//        askfredService.getClub($scope.clubId).then(function (response) {
//            console.log(response);
//            //var club = response[0];
//            $scope.clubName = response.name;
//            $scope.clubInitials = response.initials;
//            //$scope.clubId = response.id;
//            $scope.getTournamentsList($scope.clubName);
//        });
//    };
  
    //will pull the club information based off of the clubInitials from the askfredService.
    $scope.getClubInfo = function (clubInitials) {
        askfredService.getClub($scope.clubInitials).then(function (response) {
            var club = response[0];
            $scope.clubName = club.name;
            $scope.clubInitials = club.initials;
            $scope.clubId = club.id;
            $scope.getTournamentsList($scope.clubName);
        });
    }();

//    $scope.getTournamentsList = function (clubName) {
//        askfredService.getTournaments(clubName).then(function (response) {
//            $scope.tournaments = response;
//        });
//    }($scope.clubName);
  
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
              $scope.fencersInAllEvents.push(preRegFencers[i]);
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
                    tournamentStartDate: $scope.tournaments[i].start_date,
                    tournamentFencers: createUniqueFencersArray($scope.events)
                };
                break;
            }
        }
        console.log('tournament', tournament);
        firebaseService.setTournament(tournament);        
        //TODO: need to change to use $location and send the user back to the dashboard(welcome page)for the specific user.
        //var user = firebaseService.getClubUserInfo();
        //console.log(user);
        //$location.path('/dashboard/' + user.uid);
        window.location.hash = '/checkinSelection';
    };

//returns the unique fencers that are registered for the tournament
    var createUniqueFencersArray = function (events) {
        var fencers = [];
        var add = false;
        if(events){
          for (i = 0; i < events.length; i++) {
            if(events[i].preRegisteredFencers){
              for (j = 0; j < events[i].preRegisteredFencers.length; j++) {
                  add = true;
                  for (k = 0; k < fencers.length; k++) {
                      if (fencers[k].competitor_id === events[i].preRegisteredFencers[j].competitor_id) {
                          add = false;    //duplicate
                          break;
                      }
                  }
                  if (add) {
                      var fencer = {};
  //                    console.log('events[i].preRegisteredFencers[j]', events[i].preRegisteredFencers[j])
                      fencer.checkedIn = false;
                      fencer.birthyear = events[i].preRegisteredFencers[j].competitor.birthyear;
                      fencer.club = events[i].preRegisteredFencers[j].club;
                      fencer.first_name = events[i].preRegisteredFencers[j].competitor.first_name;
                      fencer.gender = events[i].preRegisteredFencers[j].competitor.gender;
                      fencer.last_name = events[i].preRegisteredFencers[j].competitor.last_name;
                      fencer.usfa_id = events[i].preRegisteredFencers[j].competitor.usfa_id;
                      fencer.rating = events[i].preRegisteredFencers[j].rating;
                      fencer.competitor_id = events[i].preRegisteredFencers[j].competitor_id;
                      fencer.id = events[i].preRegisteredFencers[j].id;
                      fencers.push(fencer);
                  }
              }
            }
          }
        }
        return fencers;
    };
});
