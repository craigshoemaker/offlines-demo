offlinesApp.controller('syncController', 

            ['$scope', '$rootScope', '$timeout', 'parkService', 'syncService', 'Offline', '_',
    function ($scope,   $rootScope,   $timeout,   parkService,   syncService,   Offline,   _) {

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

        var debouncedGetDataAndSetSyncMessage = _.debounce(getDataAndSetSyncMessage, 500);

        Offline.on('confirmed-down', function () {
            $scope.showSyncMessage = false;
        });

        Offline.on('confirmed-up', function () {
            debouncedGetDataAndSetSyncMessage();
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

        debouncedGetDataAndSetSyncMessage();

    }]);