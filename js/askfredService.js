var app = angular.module('fencin');

app.service('askfredService', function ($http, $q, keys) {
    this.apiKey = keys.getFredApi;
    this.tournament = 'https://api.askfred.net/v1/tournament';
    this.fencer = 'https://api.askfred.net/v1/fencer?_api_key=';
    this.format = '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100';

    this.getTournaments = function (tournamentName) {
      return $http({
          method: 'jsonp',
          url: 'https://api.askfred.net/v1/tournament?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100&location=' + tournamentName
      }).then(function (response) {
          console.log('askfredservice getTournaments', response.data.tournaments);
          return response.data.tournaments;
      });
    };

    this.getSingleTournamentEvents = function (tournamentId) {
      return $http({
          method: 'jsonp',
          url: 'https://api.askfred.net/v1/tournament/' + tournamentId + '?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100'
      }).then(function (response) {
          console.log('askfredservice getSingleTournamentEvents', response.data.tournament.events);
          return response.data.tournament.events;
      });
    };
  
    this.getPreRegisteredFencersInEvent = function(eventId){
      return $http({
          method: 'jsonp',
          url: 'https://api.askfred.net/v1/event/' + eventId + '?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100'
      }).then(function (response) {
          console.log('askfredservice getPreRegisteredFencersInEvent', response.data.event.preregs);
          return response.data.event.preregs
      });
    };
  

    this.getAthleteByID = function (usfaID) {
      return $http({
          method: 'jsonp',
          url: this.fencer + this.apiKey + '&usfa_id=' + usfaID + this.format
      }).then(function (response) {
          console.log('askfredservice getAthleteByID', response.data.fencers[0]);
          return response.data.fencers[0];
      });
    };
    
    this.getAthleteByName = function (firstName, lastName) {
      return $http({
          method: 'jsonp',
          url: this.fencer + this.apiKey + '&first_name_contains=' + firstName + '&last_name_contains=' + lastName + this.format
      }).then(function (response) {
          console.log('askfredservice url', url);
          response.data.fencers[0];
      });
    };
  
  


});