'use strict';

offlinesApp.service('parkService', 
            ['$http', '$window', '$q', 'remotePersistenceStrategy', 'localPersistenceStrategy', 'Enums',
    function ($http,   $window,   $q,   remotePersistenceStrategy,   localPersistenceStrategy,   Enums){

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

                var deferred = $q.defer();

                var localStorageKey = Enums.localStorageKeys.parks;

                if($window.localStorage[localStorageKey] === undefined){

                    remotePersistenceStrategy.getParksAndRides().then(
                        function(parks){
                            $window.localStorage[localStorageKey] = JSON.stringify(parks);
                            deferred.resolve(parks);
                        },
                        function(error){
                            deferred.reject(error);
                        });

                } else {

                    localPersistenceStrategy.getParksAndRides().then(
                        function(parks){
                            deferred.resolve(parks);
                        },
                        function(error){
                            deferred.reject(error);
                        });
                }

                return deferred.promise;
            },

            getParkByName: function(name){
                var deferred = $q.defer();

                var parkName = decodeURIComponent(name);

                svc.getParksAndRides().then(
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