var app = angular.module('pending', []);

app.directive('pending', function($q){
  return {
    restrict: 'AE',
    scope:{
      request: '&'
    },
    link: function(scope, element, attr){
      console.log("scope", scope);
      console.log("element", element);
      console.log("attr", attr);
      element.bind('click', function(response){
        var deffered = $q.defer();
        element.text('Pending...');
        element.prop('disabled', true);
        scope.request().then(function(response){
          element.text('Submit');
          element.removeAttr('disabled');
          deffered.resolve(response);
      });
      return deffered.promise;
    });
      
    }
  }
});