var app = angular.module('fencin', ['ngRoute', 'firebase', 'smart-table', 'ui.bootstrap', 'pending']);


app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://fencein.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);


app.config(["$routeProvider", function ($routeProvider, $httpProvider, Auth, routeLoadingIndicator) {

    $routeProvider
      .when('/login', {
        templateUrl: '/js/pages/login/login.html',
        controller: 'loginController'
    }).when('/tournamentSelection', {
        templateUrl: '/js/pages/tournaments/tournamentSelection.html',
        controller: 'tournamentSelectionController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
    }).when('/checkinSelection', {
        templateUrl: '/js/pages/checkin/checkinSelection.html',
        controller: 'checkinSelectionController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
    }).when('/checkin', {
        templateUrl: '/js/pages/checkin/checkin.html',
        controller: 'checkinController',
        resolve: {
          "clearCheckin": function(checkinService, $route){
            checkinService.setParticipant(null);
            checkinService.setEventsChecked([]);
            console.log($route);
            console.log(checkinService.getParticipant());
            console.log(checkinService.getEventsChecked());
          },
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
    }).when('/backroom', {
        templateUrl: '/js/pages/backroom/backroom.html',
        controller: 'backroomController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }

    }).when('/equipmentDashboard', {
        templateUrl: '/js/pages/equipment/equipmentDashboard.html',
        controller: 'equipmentDashboardController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
    }).when('/equipmentCheckin', {
        templateUrl: '/js/pages/equipment/equipmentCheckin.html',
        controller: 'equipmentCheckinController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }

    }).when('/equipmentCheckout', {
        templateUrl: '/js/pages/equipment/equipmentCheckout.html',
        controller: 'equipmentCheckoutController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }

    }).when('/checkinParticipant', {
        templateUrl: '/js/pages/checkin/checkinParticipant.html',
        controller: 'checkinParticipantController',
        resolve: {// controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      
    }).when('/dashboard', {
//    }).when('/dashboard/:userId', {
      templateUrl: '/js/pages/dashboard/dashboard.html',
      controller: 'dashboardController',
      resolve: {
        "userReference": function(firebaseService, $route){
          return firebaseService.getUser($route.current.params.userId).then(function(data){
            return data;
          });
        },
//        "clubReference": function(firebaseService, $route){
//          return firebaseService.getUsersClub($route.current.params.userId).then(function(data){
//            return data;
//          });
//        }, // controller will not be loaded until $requireAuth resolves
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);


app.run(["$rootScope", "$location", function($rootScope, $location, authService, session) {
//    $rootScope.$on("$routeChangeError", function(event, nextRoute, currentRoute) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute, authService, session){
    var ref = new Firebase('https://fencein.firebaseio.com/');
    ref.onAuth(function(authData){
      if (!authData){
        $location.path('/login');
      } else {
        $rootScope.auth = authData;
        $rootScope.session = session;
      }
    });
    
  });
}]);



