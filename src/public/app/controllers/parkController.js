'use strict';

offlinesApp.controller('parkController', 

            ['$scope','$window', '$location', '$timeout', 'parkService', 
    function ($scope,  $window,   $location,   $timeout,   parkService) {

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

        parkService.getParkByName(parkName).then(
            function(park){
                $scope.park = park;
            },
            reportError);

        $scope.back = function(){
            $window.history.back();
        };

        $scope.save = function(){
            parkService.addWaitTime($scope.park).then(

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
                },
                reportError);
        };
    }]);