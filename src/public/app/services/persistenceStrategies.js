angular.module('offlinesApp').factory('localPersistenceStrategy',

           ['localStorage', '_', '$q', 'Enums', 
    function(localStorage,   _,   $q,   Enums){

        'use strict';

        var svc = {

            addWaitTime: function(park){

                var deferred = $q.defer();

                try {
                    var currentPark = _.clone(park, true);

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
                    
                    var localStorageKey = Enums.localStorageKeys.parks;

                    var extractExistingDataFromLocalStorage = function(){

                        var localData = localStorage[localStorageKey];

                        if(localData){
                            localData = JSON.parse(localData);
                            return localData;
                        }

                        return null;
                    };

                    var mergeNewAndLocalData = function(parks, currentPark){

                        var i;
                        var existingPark = _.find(parks, function(park, index){
                            var match = (park.name === currentPark.name);
                            if(match) i = index;
                            return match;
                        });

                        existingPark.rides.forEach(function(ride, i){
                            if(!_.isArray(ride.waitTimes)){
                                ride.waitTimes = [];
                            }

                            if(_.isArray(currentPark.rides[i].waitTimes)){
                                ride.waitTimes = ride.waitTimes.concat(currentPark.rides[i].waitTimes);
                            }
                        });

                        parks[i] = existingPark;

                        return parks;
                    };

                    currentPark = addNewDurationIntoWaitTimesArray(currentPark);

                    var parks = extractExistingDataFromLocalStorage();

                    var dataToPersist = mergeNewAndLocalData(parks, currentPark);

                    localStorage[localStorageKey] = JSON.stringify(dataToPersist);

                    deferred.resolve();

                } catch(e){
                    deferred.reject(e);    
                }

                return deferred.promise;
            },

            getParksAndRides: function(){

                var deferred = $q.defer();

                var localStorageKey = Enums.localStorageKeys.parks;

                var parks = JSON.parse(localStorage[localStorageKey]);
                deferred.resolve(parks);

                return deferred.promise;                
            }
        };

        return {
            addWaitTime: svc.addWaitTime,
            getParksAndRides: svc.getParksAndRides
        };
    
    }]);

angular.module('offlinesApp').factory('remotePersistenceStrategy',

           ['$http', '$q',
    function($http,   $q){

    var svc = {

        addWaitTime: function(park){
            var deferred = $q.defer();

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

            var deferred = $q.defer();

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