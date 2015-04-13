var app = angular.module('pending', []);

app.directive('pending', function($q){
  return {
    restrict: 'A',
    scope:{
      request: '&'
    },
    link: function(scope, element, attr){
      //console.log("scope", scope);
      //console.log("element", element);
      //console.log("attr", attr);
      var deffered = $q.defer();
      element.bind('click', function(){
        scope.originalHtml = element[0].innerHTML;
        element[0].innerHTML = '<img height=30 width=30 src="./js/pending/circle-loading-animation.gif">';
        scope.request().then(function(response){
          element[0].innerHTML = scope.originalHtml;
          deffered.resolve(response);
      });
      return deffered.promise;
    });
      
    }
  }
});