var app = angular.module('fencin');

app.controller('equipmentCheckinController', function ($scope, firebaseService, equipmentService, $location, currentAuth) {
  var ref = new Firebase('https://fencein.firebaseio.com/')
  ref.onAuth(function(authData){
    console.log(authData);
    if(authData){
        $scope.equipmentCheckedOut = [];
        //var equipmentListArray = ['Mask','Body Cord','Mask Cord','Electric Lame Saber','Electric Lame Foil','Saber','Foil','White Lame', 'Pants'];
        $scope.equipmentList = [];
        $scope.currentEquipmentSelections = []

        $scope.getBorrower = function(){
          $scope.participant = equipmentService.getBorrower();
         // $scope.participant = checkinService.getParticipant();
        }();

        $scope.getEqupmentList = function(){
          firebaseService.getEquipmentList().then(function(equipment){
            $scope.equipmentList = equipment;
            $scope.getEquipmentCheckedOutList();
          });
        }();

        $scope.getEquipmentCheckedOutList = function(){
          firebaseService.getEquipmentCheckoutList($scope.participant).then(function(checkedItems){
            console.log('checkedItems', checkedItems);
            $scope.currentEquipmentSelections = checkedItems.equipmentList;
            checkOnload();
          });
        };

        var checkOnload = function(){
          for(var i = 0; i < $scope.equipmentList.length; i++){
            for(var ck = 0; ck < $scope.currentEquipmentSelections.length; ck++){
              if($scope.equipmentList[i].$id === $scope.currentEquipmentSelections[ck]){
                $scope.equipmentList[i].checked = true;
              }
            }
          }
        }

        $scope.addRemoveItem = function (item) {
          //console.log(item.$value);
          if(item.checked){
            $scope.currentEquipmentSelections.push(item.$value);
          } else {      
            $scope.currentEquipmentSelections.splice($scope.currentEquipmentSelections.indexOf(item.$value), 1);    //remove it.
          }
        }

        //finish getting the array
        $scope.setEquipmentCheckedOutList = function(){
          var fencerEquipmentCheckedOut = {
            fencer: $scope.participant,
            equipmentList: $scope.currentEquipmentSelections
          };
          //console.log(fencerEquipmentCheckedOut);
          firebaseService.setEquipmentCheckoutList(fencerEquipmentCheckedOut);

        }

        $scope.equipmentCheckinComplete = function(){
          $scope.RemoveItemFromEquipmentCheckoutList();
          $location.path('/equipmentDashboard');

        }
        
       $scope.equipmentCheckinCompleteAll = function(){
          $scope.removeEqipmentCheckedOutuser();
          $location.path('/equipmentDashboard');
        }
  
      }
  });
  
});