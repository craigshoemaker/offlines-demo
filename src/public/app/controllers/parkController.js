'use strict';

offlinesApp.controller('parkController', 

            ['$scope','$window', '$location', '$timeout', 'parkService', 'syncService', 
    function ($scope,  $window,   $location,   $timeout,   parkService,   syncService) {

        var loc = $location.absUrl();
        var parts = loc.split('/');

        var parkName = parts[parts.length-1];

        var buildDurationOptions = function (){
            var arr = [];

            for(var i=0;i<181;i+=5){
                arr.push({ duration: i});   
            }

            return arr;
        };

        var reportError = function(error){
            $scope.error = error;
            $scope.$apply();
        };

        $scope.error = null;
        $scope.showConfirm = false;
        $scope.durationOptions = buildDurationOptions();

        $scope.parks = parkService.getParksAndRides().done(
            function(parks){
                $scope.parks = parks;
            },
            reportError);

        parkService.getParkByName(parkName).done(
            function(park){
                $scope.park = park;
            },
            reportError);

        $scope.back = function(){
            $window.history.back();
        };

        $scope.save = function(){
            parkService.addWaitTime($scope.park).done(

                function(waitTime){

                    // initialize confirmation message
                    $scope.showConfirm = false;
                    $scope.doFade = false;

                    // clean up model to clear out 
                    // drop down bindings on the UI
                    $scope.park.rides.forEach(function(ride){
                        ride.waitTimes = [];
                        delete ride.newDuration;
                    });

                    $scope.showConfirm = true;

                    $timeout(function(){
                        $scope.doFade = true;    
                    }, 2500);

                    
                    $scope.$apply();
                },
                reportError);
        };
    }]);