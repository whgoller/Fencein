var app = angular.module('fencin', ['ngRoute', 'firebase', 'smart-table', 'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.interceptors.push('httpRequestInterceptor');

    $routeProvider
    .when('/tournamentSelection', {
      templateUrl: '/js/pages/tournaments/tournamentSelection.html',
      controller: 'tournamentSelectionController'
    }).when('/checkinSelection', {
        templateUrl: '/js/pages/checkin/checkinSelection.html',
        controller: 'checkinSelectionController'
    }).when('/checkin', {
        templateUrl: '/js/pages/checkin/checkin.html',
        controller: 'checkinController'
    }).when('/login', {
        templateUrl: '/js/pages/login/login.html',
        controller: 'loginController'
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
//            var selectedTournament = checkinService.getCurrentTournament();
//            if(selectedTournament){
//              return selectedTournament;
//            } else {
//              return false;
//            }
//          }
//        }

    }).when('/dashboard', {
      templateUrl: '/js/pages/dashboard/dashboard.html',
      controller: 'dashboardController'

    }).when('/dashboard/:userId', {
      templateUrl: '/js/pages/dashboard/dashboard.html',
      controller: 'dashboardController',
      resolve: {
        userReference: function(firebaseService, $route){
          return firebaseService.getUser($route.current.params.userId).then(function(data){
            return data;
          });
        },
        clubReference: function(firebaseService, $route){
          return firebaseService.getUsersClub($route.current.params.userId).then(function(data){
            return data;
          });
        }
//        userReference: function(firebaseService, $route){
//          return firebaseService.getUser($route.current.params.userId);
//        },
//        clubReference: function(firebaseService, $route){
//          return firebaseService.getClub($route.current.params.userId);
//        }
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
});


app.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeStart', function(next, current){
    var ref = new Firebase('https://fencein.firebaseio.com/');
    ref.onAuth(function(authData){
      if (!authData){
        $location.path('/login');
      }
      
    })
  })
});