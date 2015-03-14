var app = angular.module('fencin', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.interceptors.push('httpRequestInterceptor');

    $routeProvider
            .when('/tournamentSelection', {
                templateUrl: '/js/pages/tournaments/tournamentSelection.html',
                controller: 'tournamentSelectionController'//,
//      resolve: {
//        
//        }
            }).when('/checkin', {
        templateUrl: '/js/pages/checkin/checkin.html',
        controller: 'checkInController'

    }).when('/backroom', {
        templateUrl: '/js/pages/backroom/backroom.html',
        controller: 'backroomController'

    }).when('/checkinParticipant', {
        templateUrl: '/js/pages/checkin/checkinParticipant.html',
        controller: 'checkInController'

    }).otherwise({
        redirectTo: '/'
    });
});

