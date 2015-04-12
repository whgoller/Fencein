var app = angular.module('fencin');

app.service('session', function($log, $window){  
     this.theAuthData = JSON.parse($window.sessionStorage.getItem('session.authData'));
  
    this.getAuthData = function(){
//      return JSON.parse($window.sessionStorage.getItem('session.authData'));
      return  this.theAuthData;
    };

    this.setAuthData = function(authData){
      this.theAuthData = authData;
      $window.sessionStorage.setItem('session.authData', JSON.stringify(authData));
      return authData;
    };

    this.getAccessToken = function(){
      if(this.theAuthData){
//      if(JSON.parse($window.sessionStorage.getItem('session.authData'))){
//        return JSON.parse($window.sessionStorage.getItem('session.authData')).token;
        return this.theAuthData.token;
      }
      return null;
    };

    /**
     * Destroy session
     */
    this.destroy = function destroy(){
      this.setAuthData(null);
    };

});