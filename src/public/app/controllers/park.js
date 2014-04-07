'use strict';

angular.module('offlines').controller('parkController', 

                ['$scope','$http','$window', '$location', '$resource', 
        function ($scope,  $http,  $window,   $location,   $resource) {

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

            $scope.park = $http.get('/api/parks/' + parkName).success(function(park){
                $scope.park = park;
            });

            $scope.back = function(){
                $window.history.back();
            };

            $scope.save = function(){
                $scope.park.rides.forEach(function(ride){
                    if(ride.newDuration){
                        var url = '/api/parks/' + parkName + '/' + encodeURIComponent(ride.name) + '/' + ride.newDuration.duration;
                        $http.post(url, {}).success(function(waitTime){
                            ride.waitTimes.push(waitTime);
                        });
                    }
                });
            };
        }]);