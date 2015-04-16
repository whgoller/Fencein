var app = angular.module('fencin');
app.service('equipmentService', function (firebaseService, checkinService) {
    var participant = checkinService.getParticipant();
  
    this.setBorrower = function(borrower){
      this.equipmentBorrower = borrower;
    };
    
    this.getBorrower = function(){
      return this.equipmentBorrower;
    };
  
});
