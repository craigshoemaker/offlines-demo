'use strict';

offlinesApp.controller('parkController', 

            ['$scope','$window', '$location', 'parkService', 
    function ($scope,  $window,   $location,   parkService) {

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

        parkService.getParkByName(parkName).done(
            function(park){
                $scope.park = park;
                $scope.$apply();
            },
            reportError);

        $scope.back = function(){
            $window.history.back();
        };

        $scope.save = function(){
            parkService.addWaitTime($scope.park).done(

                function(waitTime){

                    $scope.park.rides.forEach(function(ride){
                        delete ride.newDuration;
                    });

                    $scope.showConfirm = true;
                    $scope.$apply();
                },
                reportError);
        };
    }]);