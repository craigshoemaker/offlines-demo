'use strict';

offlinesApp.factory('Enums', [function(){

    return {
        localStorageKeys: {
            parksAndRides: 'offlines.parks.rides',
            waitTimes: function(parkName){
                return 'offlines.park.' + encodeURIComponent(parkName);    
            }    
        }
    };

}]);

offlinesApp.factory('localPersistenceStrategy', 
           ['$window', '_', 'Enums', 
    function($window,   _,   Enums){

        var svc = {
            key: function(parkName){
                return 'offlines.park.' + parkName;    
            },

            addWaitTime: function(park){

                var deferred = Q.defer();

                try {
                    var currentPark = _.clone(park, true);

                    var localStorageKey = Enums.localStorageKeys.waitTimes(park.name);

                    var addNewDurationIntoWaitTimesArray = function(currentPark){
                        currentPark.rides.forEach(function(ride){
                            if(ride.newDuration){

                                if(!ride.waitTimes){
                                    ride.waitTimes = [];
                                }

                                ride.waitTimes.push({dateTime: new Date(), duration: ride.newDuration.duration });

                                delete ride.newDuration;
                            }
                        });
                        return currentPark;
                    };
                    
                    var extractExistingDataFromLocalStorage = function(){

                        var localData = $window.localStorage[localStorageKey];

                        if(localData){
                            localData = JSON.parse(localData);
                            return localData;
                        }

                        return null;
                    };

                    var mergeNewAndLocalData = function(currentPark, localPark){

                        if(localPark){
                            localPark.rides.forEach(function(ride, i){
                                ride.waitTimes = ride.waitTimes.concat(currentPark.rides[i].waitTimes);
                            });
                            return localPark;
                        } else {
                            return currentPark;    
                        }
                    };

                    currentPark = addNewDurationIntoWaitTimesArray(currentPark);  
                    var localPark = extractExistingDataFromLocalStorage();

                    var dataToPersist = mergeNewAndLocalData(currentPark, localPark);

                    $window.localStorage[localStorageKey] = JSON.stringify(dataToPersist);

                    deferred.resolve();

                } catch(e){
                    deferred.reject(e);    
                }

                return deferred.promise;
            },

            getParksAndRides: function(){

                var deferred = Q.defer();

                var localStorageKey = Enums.localStorageKeys.parksAndRides;

                var parks = JSON.parse($window.localStorage[localStorageKey]);
                deferred.resolve(parks);

                return deferred.promise;                
            }
        };

        return {
            addWaitTime: svc.addWaitTime,
            getParksAndRides: svc.getParksAndRides
        };
    
    }]);

offlinesApp.factory('remotePersistenceStrategy', 
           ['$http', 
    function($http){

    var svc = {

        addWaitTime: function(park){
            var deferred = Q.defer();

            park.rides.forEach(function(ride){
                if(ride.newDuration){

                    var url = '/api/parks/' + 
                                park.name + '/' + 
                                encodeURIComponent(ride.name) + '/' + 
                                ride.newDuration.duration;

                    $http.post(url, {}).success(function(waitTime){
                        deferred.resolve(waitTime);
                    }).error(function(error){
                        deferred.reject(error);
                    });
                }
            })

            return deferred.promise;
        },

        getParksAndRides: function(){

            var deferred = Q.defer();

            $http.get('/api/parks')
                .success(function(parks){
                    deferred.resolve(parks);  
                })
                .error(function(error){
                    deferred.reject(error);
                });

            return deferred.promise;

        }
    };

    return {
        addWaitTime: svc.addWaitTime,
        getParksAndRides: svc.getParksAndRides
    };
    
}]);

offlinesApp.service('parkService', 
            ['$http', '$window', 'remotePersistenceStrategy', 'localPersistenceStrategy', 'Enums',
    function ($http,   $window,   remotePersistenceStrategy,   localPersistenceStrategy,   Enums){

        var persistenceStrategy = localPersistenceStrategy;

        $window.Offline.on('confirmed-down', function () {
            persistenceStrategy = localPersistenceStrategy;
        });

        $window.Offline.on('confirmed-up', function () {
            persistenceStrategy = remotePersistenceStrategy;
        });

        $window.Offline.check();

        var svc = {

            parks: null,

            getParksAndRides: function(){

                var deferred = Q.defer();

                var localStorageKey = Enums.localStorageKeys.parksAndRides;

                if(svc.parks != null){

                    deferred.resolve(svc.parks);    

                } else if($window.localStorage[localStorageKey] === undefined){

                    remotePersistenceStrategy.getParksAndRides().done(
                        function(parks){
                            $window.localStorage[localStorageKey] = JSON.stringify(parks);
                            svc.parks = parks;
                            deferred.resolve(svc.parks);
                        },
                        function(error){
                            deferred.reject(error);
                        });

                } else {

                    localPersistenceStrategy.getParksAndRides().done(
                        function(parks){
                            svc.parks = parks;
                            deferred.resolve(svc.parks);
                        },
                        function(error){
                            deferred.reject(error);
                        });
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
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
        
            addWaitTime: function(park){
                return persistenceStrategy.addWaitTime(park);
            }   
        };

        return {
            getParksAndRides: svc.getParksAndRides,
            getParkByName: svc.getParkByName,
            addWaitTime: svc.addWaitTime    
        };

    }]);