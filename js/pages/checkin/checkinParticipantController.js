var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService, firebaseService, currentAuth, $location, equipmentService) {

  // var ref = new Firebase('https://fencein.firebaseio.com/')
  //ref.onAuth(function(authData){
  console.log(currentAuth);
  if(currentAuth){
    $scope.currentTournament = checkinService.getCurrentTournament();
    if($scope.currentTournament){
      $scope.currentParticipant = checkinService.getParticipant();
      var additionalCheckedEvents = checkinService.getEventsChecked();
      console.log('additionalCheckedEvents', additionalCheckedEvents)
      //console.log('$scope.currentParticipant', $scope.currentParticipant);
      $scope.totalAmountDue = 0;
      $scope.eventsParticipatingIn = [];
      var totalEventsParticipatingIn;
      var discountAmountperEvent = 5;
      $scope.discountTotal = 0;

      if($scope.currentParticipant !== undefined){
        //Pulls the usfencing.org fencer information 
        $scope.currentParticipantDetails = function (id) {
          if(id){
            firebaseService.getUSFAFencer(id).then(function (data) {
              $scope.fencerDetails = data;
            });
          } else {
            $scope.fencerDetails = null;
          }
        }($scope.currentParticipant.usfa_id);
      }



      //when a event is selected it add/removes it from the eventsParticipatingIn array
      $scope.eventSelected = function (selected) {
        if ($scope.eventsParticipatingIn.indexOf(selected.full_name) === -1) {
          $scope.eventsParticipatingIn.push(selected.full_name);
          additionalCheckedEvents.push(selected.full_name);
        } else {
          if ($scope.eventsParticipatingIn.length === 0) {
            $scope.eventsParticipatingIn = [];
          } else {
            $scope.eventsParticipatingIn.splice($scope.eventsParticipatingIn.indexOf(selected.full_name), 1);
          }
        }
        totalEventsParticipatingIn = $scope.eventsParticipatingIn.length;
        calculateAmountDue();
      };

      //calculates the amount due
      var calculateAmountDue = function () {
        $scope.totalAmountDue = 0;
        for (i = 0; i < $scope.eventsParticipatingIn.length; i++) {
          for (j = 0; j < $scope.tournamentEvents.length; j++) {
            if ($scope.tournamentEvents[j].full_name === $scope.eventsParticipatingIn[i]) {
              $scope.totalAmountDue += parseInt($scope.tournamentEvents[j].fee);
            }
          }
        }
        totalEventsParticipatingIn = $scope.eventsParticipatingIn.length;
        if(totalEventsParticipatingIn > 1){
          $scope.discountTotal = (totalEventsParticipatingIn - 1) * discountAmountperEvent;
        } else {
          $scope.discountTotal = 0;
        }
        $scope.totalAmountDue = $scope.totalAmountDue - $scope.discountTotal;
      };

      //saves method of payment to checkinService
      $scope.paidBy = function () {
        if ($scope.paymentType === 'cash') {
          checkinService.setPaidCash($scope.totalAmountDue);
        } else if ($scope.paymentType === 'check') {
          checkinService.setPaidCheck($scope.totalAmountDue);
        } else if ($scope.paymentType === 'card') {
          checkinService.setPaidCredit($scope.totalAmountDue);
        }
      };

      //sends user to the equipment checkout page
      $scope.equipmentCheckout = function () {
        checkinService.setEventsChecked(additionalCheckedEvents);
        //equipmentService.setBorrower($scope.currentParticipant)
        window.location.hash = '/equipment';
      };


      $scope.updateMember = function(){
        var memberNumber = '';
        var firstName = '';
        var lastName = '';

        if($scope.currentParticipant.usfa_id === undefined){
          memberNumber = null;
        } else {
          memberNumber = $scope.currentParticipant.usfa_id;
        }     
        if($scope.currentParticipant.first_name === undefined){
          firstName = null;
        } else {
          firstName = $scope.currentParticipant.first_name;
        }  
        if($scope.currentParticipant.last_name === undefined){
          lastName = null;
        } else {
          lastName = $scope.currentParticipant.last_name;
        }  
        firebaseService.setUSFAFencerToCheck(memberNumber, firstName, lastName);
        if(memberNumber){
          firebaseService.getUSFAFencer(memberNumber).then(function(data){
            if($scope.currentParticipant.first_name === ''){
              $scope.currentParticipant.first_name = data.first_name;
            }              
            if($scope.currentParticipant.last_name === ''){
              $scope.currentParticipant.last_name = data.last_name;
            }              
            if(!$scope.currentParticipant.gender || $scope.currentParticipant.gender === ''){
              $scope.currentParticipant.gender = data.gender;
            }    
            $scope.fencerDetails = data;
            $scope.currentParticipant.details = $scope.fencerDetails;
          });
        }
        if(!memberNumber){
          if(lastName){            
            firebaseService.getUSFAFencerByLastName(lastName, firstName).then(function(data){
              var myArray = [];
              angular.forEach(data, function(value, key) {
                myArray.push(key);
              });   
              if($scope.currentParticipant.usfa_id === ''){
                $scope.currentParticipant.usfa_id = myArray[0];
              }
              memberNumber = myArray[0];
              alert('You must push the update member button again once you have the member number populated.')
            });
          }
        }
      }

      //submits fencer to the database for backroom access. 
      //will need the fencer duplicated per event registered
      $scope.submit = function () {
        additionalCheckedEvents = [];
        checkinService.setEventsChecked(additionalCheckedEvents);
        if($scope.fencerDetails){
          if($scope.fencerDetails.competitive === 'Yes' || $scope.fencerDetails.competitive === true){
            if(!$scope.paymentType){
              alert("You must select a payment type");
              return false;
            }
            //Need to remove fencer from checkin list and add to a checked-in list.
            firebaseService.checkedIn($scope.currentParticipant);
            $scope.currentParticipant.details = $scope.fencerDetails;
            $scope.currentParticipant.inFencingTime = false;
            $scope.checkInComplete = true;

            if ($scope.eventsParticipatingIn.length > 0) {
              for (var i = 0; i < $scope.eventsParticipatingIn.length; i++) {
                $scope.currentParticipant.eventName = $scope.eventsParticipatingIn[i];
                firebaseService.setFenncerCheckedIn($scope.currentParticipant);
              }
            }
            window.location.hash = '/checkin';
          } else {
            alert("This fencer cannot be submitted until their membership is updated.");
            return false;
          }
        } //else {
          //alert("A USAFC membership number is required.");
        //}
      };



      //Will select preregistered events for the fencer.
      var checkEventsPreregistered = function () {
        if($scope.currentParticipant){
          for (i = 0; i < $scope.tournamentEvents.length; i++) {
            //console.log($scope.tournamentEvents[i].fencerIds);
            //console.log($scope.currentParticipant.competitor_id);
            if($scope.tournamentEvents[i].fencerIds){
              if ($scope.tournamentEvents[i].fencerIds.indexOf($scope.currentParticipant.competitor_id) !== -1) {
                if ($scope.eventsParticipatingIn.indexOf($scope.tournamentEvents[i].full_name) === -1) {
                  $scope.eventsParticipatingIn.push($scope.tournamentEvents[i].full_name);
                  //This array is attached to the checked model and auto checks the checkboxes
                  $scope.tournamentEvents[i].preRegistered = true;
                } else {
                  $scope.tournamentEvents[i].preRegistered = false;
                }
              }
            }
          }
          if(additionalCheckedEvents.length > 0){
            for(var i= 0; i < additionalCheckedEvents.length; i++){
              if($scope.eventsParticipatingIn.indexOf(additionalCheckedEvents[i]) === -1){
                $scope.eventsParticipatingIn.push(additionalCheckedEvents[i]);
              }
            }
          }
          calculateAmountDue();
        }
      };

      //populates all the events within this tournament
      $scope.getEvents = function () {
        $scope.tournamentEvents = $scope.currentTournament.tournament.tournamentEvents;
        checkEventsPreregistered();
      }();    //self call
    } else {        
      $location.path('/checkinSelection');
    }    
  }
});

