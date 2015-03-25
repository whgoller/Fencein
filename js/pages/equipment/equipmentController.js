var app = angular.module('fencin');

app.controller('equipmentController', function ($scope, firebaseService, checkinService) {
  
  $scope.getParticipant = function(){
    $scope.participant = checkinService.getParticipant();
  }();
  
  
  //console.log($scope.fencer);
  
  var equipmentListArray = ['Mask','Body Cord','Mask Cord','Electric Lame Saber','Electric Lame Foil','Saber','Foil','White Lame', 'Pants'];
  $scope.equipmentList = [];
  
  
  $scope.setEquipmentList = function(){
    firebaseService.setEquipmentList(equipmentListArray);
  };
  
  $scope.getEqupmentList = function(){
    firebaseService.getEquipmentList().then(function(equipment){
      console.log(equipment);
      $scope.equipmentList = equipment[];
      //$scope.equipmentList = equipment[0].equipmentType
      console.log($scope.equipmentList);
    })
  }();
  
  $scope.getEquipmentCheckedOutList = function(){
    
  }
  
  
  
  //finish getting the array
  $scope.setEquipmentCheckedOutList = function(){
    var fencerEquipmentCheckedOut = {
      firstName: $scope.participant.firstName,
      lastName: $scope.participant.lastName,
      equipmentList: []
    };
    firebaseService.setEquipmentCheckedOutListList(fencerEquipmentCheckedOut);
    
  }
  
  $scope.equipmentCheckoutComplete = function(){
    window.location.hash = '/checkinParticipant';
    
  }
  
});