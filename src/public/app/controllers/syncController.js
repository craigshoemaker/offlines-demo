'use strict';

offlinesApp.controller('syncController', 

            ['$scope', '$rootScope', '$timeout', '$window', 'parkService', 'syncService',
    function ($scope,   $rootScope,   $timeout,   $window,   parkService,   syncService) {

        $rootScope.error = null;
        $scope.showSyncMessage = false;
        $scope.showSyncCompleteMessage = false;
        $scope.doFade = false;

        var getData = function(callback){
            parkService.getParksAndRides().done(
                function(parks){
                    $rootScope.parks = parks;
                    if(callback)callback();
                }, 
                function(error){
                    $rootScope.error = error;
                    $rootScope.$apply();
                });
        };

        $window.Offline.on('confirmed-down', function () {
            $scope.showSyncMessage = false;
            $scope.$apply();
        });

        $window.Offline.on('confirmed-up', function () {
            getData(function(){
                $scope.showSyncMessage = syncService.check($rootScope.parks); 
                $scope.$apply();
            });
        });

        $scope.sync = function(){
            syncService.sync().done(
                function(result){
                    if(result.success){
                        $scope.doFade = false;

                        $scope.showSyncMessage = false;
                        $scope.showSyncCompleteMessage = true;

                        $timeout(function(){
                            $scope.doFade = true;
                        }, 2500);

                        $scope.$apply();
                    }
                }, 
                function(error){
                    $rootScope.error = error;
                    $rootScope.$apply();
                });
        };

        getData();

    }]);