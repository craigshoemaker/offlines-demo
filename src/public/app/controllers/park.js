'use strict';

offlinesApp.factory('waitTimesService', ['$http', '$window', function($http, $window){

    var offline = $window.Offline;
    var isOffline = false;

    offline.on('confirmed-down', function () {
        isOffline = true;
    });

    offline.on('confirmed-up', function () {
        isOffline = false;
    });

    var svc = {
        save: function(park, success){
            park.rides.forEach(function(ride){
                if(ride.newDuration){

                    var url = '/api/parks/' + 
                              park.name + '/' + 
                              encodeURIComponent(ride.name) + '/' + 
                              ride.newDuration.duration;

                    $http.post(url, {}).success(function(waitTime){
                        success(ride, waitTime);
                    });
                }
            })
        }
    };

    return svc;
}]);

offlinesApp.factory('parksService', ['$http', function($http){

    var svc = {
        get: function(parkName, success){
            return $http.get('/api/parks/' + parkName).success(function(park){
                success(park);
            });
        }    
    };

    return svc;

}]);

offlinesApp.controller('parkController', 

                ['$scope','$http','$window', '$location', '$resource', 'waitTimesService', 'parksService', 
        function ($scope,  $http,  $window,   $location,   $resource,   waitTimesService,   parksService) {

            var loc = $location.absUrl();
            var parts = loc.split('/');

            var parkName = parts[parts.length-1];

            var buildDurationOptions = function (){
                var arr = [];

                for(var i=0;i<181;i+=5){
                    arr.push({ duration: i});   
                }

                return arr;
            };

            $scope.durationOptions = buildDurationOptions();

            $scope.park = parksService.get(parkName, function(park){
                $scope.park = park;
            });

            $scope.back = function(){
                $window.history.back();
            };

            $scope.save = function(){
                waitTimesService.save($scope.park, function(ride, waitTime){
                    ride.waitTimes.push(waitTime);
                });
            };
        }]);