var app = angular.module('fencin', ['ngRoute', 'firebase', 'smart-table']);

app.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.interceptors.push('httpRequestInterceptor');

    $routeProvider
    .when('/tournamentSelection', {
        templateUrl: '/js/pages/tournaments/tournamentSelection.html',
        controller: 'tournamentSelectionController'
    }).when('/checkin', {
        templateUrl: '/js/pages/checkin/checkin.html',
        controller: 'checkinController'

    }).when('/backroom', {
        templateUrl: '/js/pages/backroom/backroom.html',
        controller: 'backroomController'

    }).when('/equipment', {
        templateUrl: '/js/pages/equipment/equipment.html',
        controller: 'equipmentController'

    }).when('/checkinParticipant', {
        templateUrl: '/js/pages/checkin/checkinParticipant.html',
        controller: 'checkinParticipantController' //,
//        resolve: {
//          tournament: function(checkinService){
//            if(haveSelectedTournament){
//              return selectedTournament;
//            } else {
//              return false;
//            }
//          }
        }

    }).otherwise({
        redirectTo: '/'
    });
});
