var app = angular.module('lazyLoadOptions', []);

app.directive('lazyLoadOptions', [function() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            options: '='
        },
        link: function($scope, $element, $attrs, $ngModel){
            // Ajax loading notification
            $scope.options = [
                {
                    Description: "Loading..."
                }
            ];
            
            // Control var to prevent infinite loop
            $scope.loaded = false;
            
            $element.bind('mousedown', function() {
                
                // Use setTimeout to simulate web service call
                setTimeout(function(){
                    if(!$scope.loaded) {
                        $scope.$apply(function(){
                            $scope.options = [
                                {
                                    Description: "Option 1"
                                },
                                {
                                    Description: "Option 2"
                                },
                                {
                                    Description: "Option 3"
                                }
                            ];
                        });
                        
                        // Prevent the load from occurring again
                        $scope.loaded = true;
                        
                        // Blur the element to collapse it
                        $element[0].blur();
                        
                        // Click the element to re-open it
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        $element[0].dispatchEvent(e);
                    }
                }, 2000);
            });
        }
    }
}])

;