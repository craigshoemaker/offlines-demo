'use strict';

offlinesApp.factory('localPersistenceStrategy', 
           ['$window', '_', 
    function($window,   _){

        var svc = {
            key: function(parkName){
                return 'offlines.park.' + parkName;    
            },

            addWaitTime: function(park){

                var deferred = Q.defer();

                try {
                    var currentPark = _.clone(park, true);

                    var addNewDurationIntoWaitTimesArray = function(currentPark){
                        currentPark.rides.forEach(function(ride){
                            if(ride.newDuration){

                                if(!ride.waitTimes){
                                    ride.waitTimes = [];
                                }

                                ride.waitTimes.push({dateTime: new Date(), duration: ride.newDuration});

                                delete ride.newDuration;
                            }
                        });
                        return currentPark;
                    };
                    
                    var extractExistingDataFromLocalStorage = function(){

                        var localData = $window.localStorage[svc.key(currentPark.name)];

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

                    $window.localStorage[svc.key] = JSON.stringify(dataToPersist);

                    deferred.resolve();

                } catch(e){
                    deferred.reject(e);    
                }

                return deferred.promise;
            }
        };

        return {
            addWaitTime: svc.addWaitTime
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
        }    
    };

    return {
        addWaitTime: svc.addWaitTime
    };
    
}]);

offlinesApp.service('persistenceService', 
           ['$window','remotePersistenceStrategy', 'localPersistenceStrategy', 
    function($window,  remotePersistenceStrategy,   localPersistenceStrategy){

        var persistenceStrategy = localPersistenceStrategy;

        $window.Offline.on('confirmed-down', function () {
            persistenceStrategy = localPersistenceStrategy;
        });

        $window.Offline.on('confirmed-up', function () {
            persistenceStrategy = remotePersistenceStrategy;
        });

        $window.Offline.check();

        this.addWaitTime = function(park){
            return persistenceStrategy.addWaitTime(park);
        };
    
    }]);

offlinesApp.factory('parkService', 
            ['$http', '$window', 'persistenceService',
    function ($http,   $window,   persistenceService){

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
                        deferred.reject(error);
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
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
        
            addWaitTime: function(park){
                return persistenceService.addWaitTime(park);
            }   
        };

        return {
            getParksAndRides: svc.getParksAndRides,
            getParkByName: svc.getParkByName,
            addWaitTime: svc.addWaitTime    
        };

    }]);