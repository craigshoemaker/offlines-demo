'use strict';

offlinesApp.controller('indexController', 

            ['$scope','parkService', 
    function ($scope,  parkService) {

        $scope.error = null;

        $scope.parks = parkService.getParksAndRides().done(
            function(parks){
                $scope.parks = parks;
                $scope.$apply();
            }, 
            function(error){
                $scope.error = error;
                $scope.$apply();
            });
    }]);