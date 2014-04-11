'use strict';

offlinesApp.controller('syncController', 

            ['$scope', '$rootScope', '$window', 'parkService', 'syncService',
    function ($scope,   $rootScope,   $window,   parkService,   syncService) {

        $rootScope.error = null;
        $scope.showSyncMessage = false;

        var checkForNeedToSync = function(){
            $scope.showSyncMessage = syncService.check($rootScope.parks);
            $scope.$apply(); 
        };

        $window.Offline.on('confirmed-down', function () {
            $scope.showSyncMessage = false;
            $scope.$apply();
        });

        $window.Offline.on('confirmed-up', function () {
            checkForNeedToSync();
        });

        $scope.sync = function(){
            syncService.sync();
        };

        parkService.getParksAndRides().done(
            function(parks){
                $rootScope.parks = parks;
            }, 
            function(error){
                $rootScope.error = error;
                $scope.$apply();
            });
    }]);