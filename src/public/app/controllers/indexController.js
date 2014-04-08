'use strict';

offlinesApp.controller('indexController', 

            ['$scope','parkService', 
    function ($scope,  parkService) {

        $scope.parks = parkService.getParksAndRides().done(function(parks){
            $scope.parks = parks;
            $scope.$apply();
        });

    }]);