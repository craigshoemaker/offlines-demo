'use strict';

angular.module('offlines').controller('parkController', 

                ['$scope','$http','$window', '$location',
        function ($scope,  $http,  $window,   $location) {

            var loc = $location.absUrl();
            var parts = loc.split('/');

            var parkName = parts[parts.length-1];

            $http.get('/api/parks/' + parkName).success(function(park){
                debugger;
            });


            $scope.back = function(){
                $window.history.back();
            };

            $scope.save = function(e){
                $window.alert('save wait times');
            };

        }]);