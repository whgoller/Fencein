var app = angular.module('fencin');
        
app.service('mainService', function(authService, session){
  this.userSignedIn = authService.isLoggedIn();
  

  
});