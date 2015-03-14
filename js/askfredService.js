var app = angular.module('fencin');

app.service('askfredService', function ($http, $q, keys) {
    this.apiKey = Keys.getFredApi;
    this.tournament = 'https://api.askfred.net/v1/tournament';
    this.fencer = 'https://api.askfred.net/v1/fencer?_api_key=';
    this.format = '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100';

    this.getTournaments = function (tournamentName) {
        var deffered = $q.defer();
        $http({
            method: 'jsonp',
            url: 'https://api.askfred.net/v1/tournament?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100&location=' + tournamentName
        }).then(function (data) {
            console.log('askfredservice getTournaments', data.data.tournaments);
            deffered.resolve(data.data.tournaments);
        });
        return deffered.promise;
    };

    this.getSingleTournamentEvents = function (tournamentId) {
        var deffered = $q.defer();
        $http({
            method: 'jsonp',
            url: 'https://api.askfred.net/v1/tournament/' + tournamentId + '?_api_key=' + this.apiKey + '&_format=jsonp&_jsonp_callback=JSON_CALLBACK&_per_page=100'
        }).then(function (data) {
            console.log('askfredservice getSingleTournamentEvents', data.data.tournament.events);
            deffered.resolve(data.data.tournament.events);
        });
        return deffered.promise;
    };

    this.getAthleteByID = function (usfaID) {
        var deffered = $q.defer();
        $http({
            method: 'jsonp',
            url: this.fencer + this.apiKey + '&usfa_id=' + usfaID + this.format
        }).then(function (data) {
            console.log('askfredservice getAthleteByID', data.data.fencers[0]);
            deffered.resolve(data.data.fencers[0]);
        });
        return deffered.promise;
    };
    
        this.getAthleteByName = function (firstName, lastName) {
        var deffered = $q.defer();
        $http({
            method: 'jsonp',
            url: this.fencer + this.apiKey + '&first_name_contains=' + firstName + '&last_name_contains=' + lastName + this.format
        }).then(function (data) {
            console.log('askfredservice url', url);
            deffered.resolve(data.data.fencers[0]);
        });
        return deffered.promise;
    };


});