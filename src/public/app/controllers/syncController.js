offlinesApp.controller('syncController', 

            ['$scope', '$rootScope', '$timeout', '$window', 'parkService', 'syncService',
    function ($scope,   $rootScope,   $timeout,   $window,   parkService,   syncService) {

        'use strict';

        $rootScope.error = null;
        $scope.showSyncMessage = false;
        $scope.showSyncCompleteMessage = false;
        $scope.doFade = false;

        var getData = function(callback){
            parkService.getParksAndRides().then(
                function(parks){
                    $rootScope.parks = parks;
                    if(callback)callback();
                }, 
                function(error){
                    $rootScope.error = error;
                });
        };

        var getDataAndSetSyncMessage = function(){
            getData(function(){
                $scope.showSyncMessage = syncService.check($rootScope.parks); 
            });
        };

        $window.Offline.on('confirmed-down', function () {
            $scope.showSyncMessage = false;
        });

        $window.Offline.on('confirmed-up', function () {
            getDataAndSetSyncMessage();
        });

        $scope.sync = function(){
            syncService.sync().then(
                function(result){
                    if(result.success){
                        $scope.doFade = false;

                        $scope.showSyncMessage = false;
                        $scope.showSyncCompleteMessage = true;

                        $timeout(function(){
                            $scope.doFade = true;
                        }, 2500);
                    }
                }, 
                function(error){
                    $rootScope.error = error;
                });
        };

        getDataAndSetSyncMessage();

    }]);