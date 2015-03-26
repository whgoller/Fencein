var app = angular.module('fencin');

app.controller('equipmentController', function ($scope, firebaseService, checkinService) {
  
  $scope.equipmentCheckedOut = [];
  var equipmentListArray = ['Mask','Body Cord','Mask Cord','Electric Lame Saber','Electric Lame Foil','Saber','Foil','White Lame', 'Pants'];
  $scope.equipmentList = [];
  
  
  $scope.getParticipant = function(){
    $scope.participant = checkinService.getParticipant();
  }();
  
  
  $scope.setEquipmentList = function(){
    firebaseService.setEquipmentList(equipmentListArray);
  };
  
  
  $scope.getEqupmentList = function(){
    firebaseService.getEquipmentList().then(function(equipment){
      console.log(equipment);
      $scope.equipmentList = equipment;
      //$scope.equipmentList = equipment[0].equipmentType
      console.log($scope.equipmentList);
    });
  }();
  
  $scope.getEquipmentCheckedOutList = function(){
    
  };
  
  
  $scope.addRemoveItem = function (item) {
    console.log(item.$value);
    if(item.$value){
      $scope.equipmentCheckedOut.push(item.$value);
    } else {      
      $scope.equipmentCheckedOut.splice($scope.equipmentCheckedOut.indexOf(item.$value), 1);    //remove it.
    }
  }

  //finish getting the array
  $scope.setEquipmentCheckedOutList = function(){
    var fencerEquipmentCheckedOut = {
      fencer: $scope.participant,
      equipmentList: $scope.equipmentCheckedOut
    };
    console.log(fencerEquipmentCheckedOut);
    firebaseService.setEquipmentCheckoutList(fencerEquipmentCheckedOut);
    
  }
  
  $scope.equipmentCheckoutComplete = function(){
    $scope.setEquipmentCheckedOutList();
    window.location.hash = '/checkinParticipant';
    
  }
  
});