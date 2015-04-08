var app = angular.module('fencin');

app.service('firebaseService', function ($firebaseArray, $firebaseObject, $q, environmentService) {
  
  var firebaseUrl = 'https://fencein.firebaseio.com/';
  var clubUsersUrl = 'https://fencein.firebaseio.com/users/';
  var clubsUrl = 'https://fencein.firebaseio.com/clubs';
  var tournamentsUrl = 'https://fencein.firebaseio.com/clubs/tournaments';
  var equipmentTypeURL = 'https://fencein.firebaseio.com/clubs/equipment/equipmentType';
  var equipmentURL = 'https://fencein.firebaseio.com/clubs/equipment';
  var membersUrl = 'https://fencein.firebaseio.com/members/';
  var fencersToAdd = [];
  var clubUserId;
  var tournamentId;
  var clubInitials = "";

  //keeps track of current tournament id called when the tournament is selected
  this.setTournamentId = function (id) {
    tournamentId = id;
  };

  this.getClubUserInfo = function(){
    return clubUserInfo;
  }
  
  this.setClubInitials = function(initials){
    clubInitials = initials;
  }
  
  // competitorId, competitorFirstName, competitorLastName, competitorRating, competitorYearBorn
  this.setClub = function (clubName, clubId) {
    var list = $firebaseArray(new Firebase(clubsUrl));
    list.$add({
      clubName: clubName,
      clubId: clubId
    }).then(function (ref) {
        var id = ref.key();
        console.log("added record with id " + id);
        list.$indexFor(id); // returns location in the array
    });
  };
  
  this.getUsersClub = function(userId){
    uId = userId.replace('simplelogin:', '');
    var deffered = $q.defer();
    deffered.resolve($firebaseObject(new Firebase(clubUsersUrl + uId)).$loaded(function(data){
      console.log("loadeddata", data);
      clubUserId = data.$id;
      return data;
    }));
    return deffered.promise;
  };
  
  this.getUser = function(userId){
    uId = userId.replace('simplelogin:', '');
    var deffered = $q.defer();
    deffered.resolve($firebaseObject(new Firebase(firebaseUrl + 'users/' + uId)).$loaded().then(function (data) {
        clubUserId = data.$id;
        return data;
    }));
    return deffered.promise;
  };
  
  
  
  
  

  this.setFenncerCheckedIn = function (fencer) {
    //console.log('setFenncerCheckedIn', fencer)
    var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
    fbArray.$add(fencer);
  };
  
  this.updateFencerCheckedIn = function(fencer) {
    fencer.checkInComplete = !fencer.checkInComplete;
    var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));
    fbArray[0] = fencer;  //no clue why this works or why i need it, but just save didn't work so I have to set the fencer, and setting any fencer to fbarray[0] changes the correct fencer
    fbArray.$save(fencer);
  }
  
  
//Returns a specific tournament by its ID
  this.getTournament = function (tournamentId) {
    var deffered = $q.defer();
    deffered.resolve($firebaseArray(new Firebase(tournamentsUrl)).$loaded().then(function (data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].tournament.tournamentId);
        if (data[i].tournament.tournamentId === tournamentId) {
          return data[i];
        }
      }
    }));
    return deffered.promise;
  };



//Returns all the tournaments
    this.getTournaments = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(tournamentsUrl)).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };

//Sets a tournament in the database if it doesn't already exsist
    this.setTournament = function (tournament) {
        this.getTournament(tournament.tournamentId).then(function (data) {
            if (!data) {
                var fbArray = $firebaseArray(new Firebase(tournamentsUrl));
                fbArray.$add({
                    tournament: tournament
                }).then(function (ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                    fbArray.$indexFor(id); // returns location in the array
                });
            }
        });
    };

    //Get the usfencing.org fencer information
    this.getUSFAFencer = function (usfs_competitor_Id) {
        var deffered = $q.defer();
        deffered.resolve($firebaseObject(new Firebase(membersUrl + usfs_competitor_Id)).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };


//Returns all equipmentTypes in the database
    this.getEquipmentList = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(equipmentTypeURL)).$loaded().then(function (data) {
            console.log('equipment', data);
            return data;
        }));
        return deffered.promise;
    };

    //Creates all equipmentTypes in the database
    this.setEquipmentList = function (equipment) {
        var list = $firebaseArray(new Firebase(equipmentTypeURL));
        list.$add({
            equipmentType: equipment
        });
    };

    //Creates equipment checkout list in the database
    this.setEquipmentCheckoutList = function (fencerEquipmentObject) {
        var list = $firebaseArray(new Firebase(equipmentURL + '/equipmentCheckedOut'));
        list.$add(fencerEquipmentObject);
    };

    //returns the equipmentCheckoutList for the tournament.
    this.getEquipmentCheckoutList = function () {

    };




    this.getFencer = function (competitor_Id) {
        if (!(competitor_Id in this.fencers)) {
            console.log('this.fencers.competitor_Id', this.fencers.competitor_Id);
            fencersToAdd.push(this.fencers.competitor_Id);
        }
        ;
    };


    this.setFencers = function () {
        this.getFencers().then(function (data) {
            for (i in data) {
                this.getFencer(data[i].competitor_Id);
            }
            this.setFencersInFirebase();
        });
    };


//Get an array of events for the tournament
    this.getEvents = function () {
        var deffered = $q.defer();
        this.getTournament(tournament.id).then(function (data) {
            console.log('getEvents', data);
        });
        return deffered.promise;
    };

//Updates the fencer in the array checkedInFencers swaping inFencingTime boolean
    this.fencingTime = function (fencer) {
        fencer.inFencingTime = !fencer.inFencingTime;
        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers'));

        fbArray[0] = fencer;  //no clue why this works or why i need it, but just save didn't work so I have to set the fencer, and setting any fencer to fbarray[0] changes the correct fencer
        fbArray.$save(fencer);
    };

//Gets the array of checked in fencers for the current tournament
    this.getCheckedInFencers = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/checkedInFencers')).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };
    
    //Gets the tournament fencer array from firebase
    this.getTournamentFencers = function () {
        var deffered = $q.defer();
        deffered.resolve($firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/tournamentFencers')).$loaded().then(function (data) {
            return data;
        }));
        return deffered.promise;
    };
    
    //Updates the fencer in the array tournamentFencers swaping checkedIn boolean
    this.checkedIn = function (fencer) {
        fencer.checkedIn = true;
        var fbArray = $firebaseArray(new Firebase(tournamentsUrl + '/' + tournamentId + '/tournament/tournamentFencers'));

        fbArray[0] = fencer;  //no clue why this works or why i need it, but just save didn't work so I have to set the fencer, and setting any fencer to fbarray[0] changes the correct fencer
        fbArray.$save(fencer);
    };
  
  



  
  
});