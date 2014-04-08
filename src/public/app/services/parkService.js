'use strict';

offlinesApp.factory('parkService', 
    
            ['$http', '$window',
    function ($http,   $window){

        var offline = $window.Offline;
        var isOffline = false;

        offline.on('confirmed-down', function () {
            isOffline = true;
        });

        offline.on('confirmed-up', function () {
            isOffline = false;
        });

        var svc = {

            key: 'offlines.parks.rides',

            parks: null,

            getParksAndRides: function(){

                var deferred = Q.defer();

                if(svc.parks != null){

                    deferred.resolve(svc.parks);    

                } else if($window.localStorage[svc.key] === undefined){

                    $http.get('/api/parks').success(function(parks){
                        $window.localStorage[svc.key] = JSON.stringify(parks);
                        svc.parks = parks;  
                        deferred.resolve(svc.parks);  
                    }).error(function(error){
                        deferred.reject(new Error(error));
                    });

                } else {

                    svc.parks = JSON.parse($window.localStorage[svc.key]);
                    deferred.resolve(svc.parks);

                }

                return deferred.promise;
            },

            getParkByName: function(name){
                var deferred = Q.defer();

                var parkName = decodeURIComponent(name);

                svc.getParksAndRides().done(
                    function(parks){
                        parks.forEach(function(park){
                            if(park.name === parkName){
                                deferred.resolve(park);
                            }
                        });
                    }, 
                    function(error){
                        deferred.reject(new Error(error));
                    });

                return deferred.promise;
            },
        
            addWaitTime: function(park){
                var deferred = Q.defer();

                park.rides.forEach(function(ride){
                    if(ride.newDuration){

                        var url = '/api/parks/' + 
                                  park.name + '/' + 
                                  encodeURIComponent(ride.name) + '/' + 
                                  ride.newDuration.duration;

                        $http.post(url, {}).success(function(waitTime){
                            deferred.resolve();
                        }).error(function(error){
                            deferred.reject(new Error(error));
                        });
                    }
                })

                return deferred.promise;
            }   
        };

        return svc;

    }]);