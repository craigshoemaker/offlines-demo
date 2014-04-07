'use strict';

angular.module('offlines').controller('parkController', 

                ['$scope','$http','$window', '$location', '$resource', 
        function ($scope,  $http,  $window,   $location,   $resource) {

            var loc = $location.absUrl();
            var parts = loc.split('/');

            var parkName = parts[parts.length-1];

            var buildDurationOptions = function (){
                var arr = [];

                for(var i=0;i<121;i+=5){
                    arr.push({ duration: i});   
                }

                arr.push({duration: '120+'});

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
                    var url = '/api/parks/' + parkName + '/' + encodeURIComponent(ride.name) + '/' + ride.newDuration.duration;
                    $http.post(url, {}).success(function(waitTime){
                        ride.waitTimes.push(waitTime);
                    });
                });
            };
        }]);