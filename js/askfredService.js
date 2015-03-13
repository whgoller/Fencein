var app = angular.module('fencin');
        
app.service('askfredService', function($http, $q, keys){
  this.apiKey = keys.getFredApi;
  
  this.getTournaments = function(tournamentName){
    var deffered = $q.defer();
    $http({
      method: 'jsonp',
      url: 'https://api.askfred.net/v1/tournament?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100&location=' + tournamentName      
    }).then(function(data){
      console.log('askfredservice getTournaments', data.data.tournaments)
      deffered.resolve(data.data.tournaments);
    });
    return deffered.promise;
  }
  
  this.getSingleTournamentEvents = function(tournamentId){
    var deffered = $q.defer();
    $http({
      method: 'jsonp',
      url: 'https://api.askfred.net/v1/tournament/' + tournamentId + '?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100'     
    }).then(function(data){
      console.log('askfredservice getSingleTournamentEvents', data.data.tournament.events)
      deffered.resolve(data.data.tournament.events);
    });
    return deffered.promise;
  }
  
  
});