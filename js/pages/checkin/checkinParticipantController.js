var app = angular.module('fencin');

app.controller('checkinParticipantController', function ($scope, checkinService) {
    $scope.currentParticipant = checkinService.getParticipant();
    $scope.totalAmountDue = 0;
    
    $scope.getEvents = function(){
        //pass $scope.currentParticipant to firebase 
        
        $scope.events = [
            {name: 'foil',
                cost: '10',
            preRegistered: true},
            {name: 'epee',
                cost: '20',
            preRegistered: false},
            {name: 'saber',
                cost: '30',
            preRegistered: false}
        ];
        
        for(event in $scope.events){
            if($scope.events[event].preRegistered){
               $scope.totalAmountDue += parseInt($scope.events[event].cost);
            }
        }
    }();    //self call
    
    $scope.eventSelected = function(selected){
        console.log('selected', selected.cost);
        $scope.totalAmountDue += parseInt(selected.cost);
    };
    
    $scope.paidBy = function(){
        if( $scope.paymentType === 'cash'){
            checkinService.setPaidCash($scope.totalAmountDue);
        }else if( $scope.paymentType === 'check'){
            checkinService.setPaidCheck($scope.totalAmountDue);
        }else if( $scope.paymentType === 'card'){
            checkinService.setPaidCredit($scope.totalAmountDue);
        }
        
        window.location.hash = '/checkin';
    };
});

