var app = angular.module('fencin', ['ngRoute']);
        
app.config(function($routeProvider, $httpProvider){
  //$httpProvider.interceptors.push('httpRequestInterceptor');
  
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'mainController'     
  }).when('/tournamentSelection', {
      templateUrl: 'pages/tournaments/tournaments.html',
      controller: 'tournamentsController',
      resolve: {
        
        }
  }).otherwise({
    redirectTo: '/'
  });

});