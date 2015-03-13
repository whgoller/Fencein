var app = angular.module('fencin', ['ngRoute']);
        
app.config(function($routeProvider, $httpProvider){
  //$httpProvider.interceptors.push('httpRequestInterceptor');
  
  $routeProvider
    .when('/tournamentSelection', {
      templateUrl: '/js/pages/tournaments/tournamentSelection.html',
      controller: 'tournamentSelectionController'//,
//      resolve: {
//        
//        }
  }).when('/backroom', {
      templateUrl: '/js/pages/backroom/backroom.html',
      controller: 'backroomController'
  }).otherwise({
    redirectTo: '/'
  });

});