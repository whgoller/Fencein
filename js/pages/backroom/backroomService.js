var app = angular.module('fencin');

app.service('backroomService', function (firebaseService) {
    this.getAthletes = function(){
        this.needToAdd = [
            {firstName: 'bob',
                lastName: 'allen',
                event: 'foil'
            },
            {firstName: 'alex',
                lastName: 'allen',
                event: 'sword'
            },
            {firstName: 'sam',
                lastName: 'goller',
                event: 'epee'
            }
        ];
        return this.needToAdd;
    };    
});

