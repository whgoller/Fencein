var app = angular.module('fencin');
app.controller('equipmentDashboardController', function ($scope, checkinService, firebaseService, $location, currentAuth, equipmentService) {
  if(currentAuth){
    $scope.borrowers = [];
   // $scope.orderByField = 'firstName';
   // $scope.reverseSort = false;
    $scope.currentTournament = checkinService.getCurrentTournament();
   
    $scope.getParticipantsWithEquipment = function () {
      firebaseService.getEquipmentCheckoutListAll().then(function (data) {
        console.log(data);
        $scope.borrowers = data;
      });
    };

    $scope.getBorrower = function (borrower) {
        equipmentService.setBorrower(borrower);
       // checkinService.setParticipant(borrower.fencer)
        console.log('borrower', borrower);
        //window.location.hash = '/equipment';
    };

    if (!$scope.currentTournament) {
      window.location.hash = '/checkinSelection';
    } else {
      $scope.getParticipantsWithEquipment();
    }
  }
});
