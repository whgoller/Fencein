var app = angular.module('fencin');
        
app.service('askfredService', function($http,$q){
  
  this.getClubTournamentList = function(){
    var deffered = $q.defer();
    $http({
      method: 'jsonp',
      url: 'https://api.askfred.net/v1/tournament?_api_key=XXXXXXXXXXXX&_format=jsonp&_jsonp_callback=JSON_CALLBACK'      
    }).then(function(data){
      console.log('get',data);
      deffered.resolve(data);
    });
    return deffered.promise;
  }
  
  

  
});