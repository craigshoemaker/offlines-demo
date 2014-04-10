'use strict';

offlinesApp.controller('indexController', 

            ['$scope','parkService', 'syncService',
    function ($scope,  parkService,   syncService) {

        $scope.error = null;

        syncService.init();

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