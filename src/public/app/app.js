'use strict';

var offlinesApp = angular.module('offlinesApp', [
    'ngResource'
    ]);

offlinesApp.factory('Enums', [function(){

    return {
        localStorageKeys: {
            parksAndRides: 'offlines.parks.rides',
            waitTimes: function(parkName){
                return 'offlines.park.' + encodeURIComponent(parkName);    
            }    
        }
    };

}]);

offlinesApp.constant('_', window._);