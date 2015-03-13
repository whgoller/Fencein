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
  }).otherwise({
    redirectTo: '/'
  });

});