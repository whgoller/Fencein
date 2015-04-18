var app = angular.module('fencin');
app.service('checkinService', function (firebaseService, environmentService) {
    this.creditTotal = 0;
    this.cashTotal = 0;
    this.checkTotal = 0;

    this.setCurrentTournament = function (tournament) {
        this.currentTournament = tournament;
        firebaseService.setTournamentId(this.currentTournament.$id);
    };
    
//    this.getCurrentTournament = function(){
//        return this.currentTournament;
//    };

    this.getCurrentTournament = function(){
      if(this.currentTournament !== ""){
        return this.currentTournament;
      } else {
        return environmentService.getTournament();
      }
    }
  
    this.setParticipant = function (participant) {
        this.currentParticipant = participant;
    };

    this.getParticipant = function () {
        return this.currentParticipant;
    };

    this.setPaidCredit = function (amount) {
        this.creditTotal += amount;
    };

    this.setPaidCash = function (amount) {
        this.cashTotal += amount;
    };

    this.setPaidCheck = function (amount) {
        this.checkTotal += amount;
    };
    
    this.checkedInFencer = function(){      
        this.currentParticipant.inFencingTime = false;
        firebaseService.setFenncerCheckedIn(this.currentParticipant);
    };
  
    this.getParticipantDetails = function(participant){
      console.log(participant);      
    };
    
    this.setEventsChecked = function(eventArray){
      this.eventsCheckedArray = eventArray;
      console.log('this.eventsCheckedArray', this.eventsCheckedArray)
    };
  
    this.getEventsChecked = function(){
      //if(this.eventsCheckedArray){
        return this.eventsCheckedArray;
      //}
     // return [];
    };
  
    this.setBorrower = function(borrower){
      this.equipmentBorrower = borrower;
    };
    
    this.getBorrower = function(){
      return this.equipmentBorrower;
    };
  
});

