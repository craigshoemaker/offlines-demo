'use strict';

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

                var localStorageKey = Enums.localStorageKeys.parks;

                if($window.localStorage[localStorageKey] === undefined){

                    remotePersistenceStrategy.getParksAndRides().done(
                        function(parks){
                            $window.localStorage[localStorageKey] = JSON.stringify(parks);
                            deferred.resolve(parks);
                        },
                        function(error){
                            deferred.reject(error);
                        });

                } else {

                    localPersistenceStrategy.getParksAndRides().done(
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