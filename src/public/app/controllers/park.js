'use strict';

offlinesApp.factory('parkService', 
    
            ['$http', '$window',
    function ($http,   $window){

        var offline = $window.Offline;
        var isOffline = false;

        offline.on('confirmed-down', function () {
            isOffline = true;
        });

        offline.on('confirmed-up', function () {
            isOffline = false;
        });

        var svc = {
            get: function(parkName){
                return $http.get('/api/parks/' + parkName);
            },
        
            addWaitTime: function(park){
                debugger;
                var deferred = Q.defer();

                park.rides.forEach(function(ride){
                    if(ride.newDuration){

                        var url = '/api/parks/' + 
                                  park.name + '/' + 
                                  encodeURIComponent(ride.name) + '/' + 
                                  ride.newDuration.duration;

                        $http.post(url, {}).success(function(waitTime){
                            deferred.resolve();
                        });
                    }
                })

                return deferred.promise;
            }   
        };

        return svc;

    }]);

offlinesApp.controller('parkController', 

            ['$scope','$http','$window', '$location', '$resource', 'parkService', 
    function ($scope,  $http,  $window,   $location,   $resource,   parkService) {

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

        $scope.park = parkService.get(parkName).success(function(park){
            $scope.park = park;
        });

        $scope.back = function(){
            $window.history.back();
        };

        $scope.save = function(){
            parkService.addWaitTime($scope.park).done(function(){

            });
        };
    }]);