'use strict';

angular.module('offlines').controller('parkController', 

                ['$scope','$http','$window', '$location', '$resource', 
        function ($scope,  $http,  $window,   $location,   $resource) {

            var loc = $location.absUrl();
            var parts = loc.split('/');

            var parkName = parts[parts.length-1];

            $scope.park = $http.get('/api/parks/' + parkName).success(function(park){
                $scope.park = park;
            });


            $scope.back = function(){
                $window.history.back();
            };

            $scope.save = function(e){
                $window.alert('save wait times');
            };

        }]);