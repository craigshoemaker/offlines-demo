angular.module('offlinesApp').service('parkService',

            ['$http', '$q', 'localStorage', 'Offline', 'remotePersistenceStrategy', 'localPersistenceStrategy', 'Enums',
    function ($http,   $q,   localStorage,   Offline,   remotePersistenceStrategy,   localPersistenceStrategy,   Enums){

        'use strict';

        var persistenceStrategy = localPersistenceStrategy;

        Offline.on('confirmed-down', function () {
            persistenceStrategy = localPersistenceStrategy;
        });

        Offline.on('confirmed-up', function () {
            persistenceStrategy = remotePersistenceStrategy;
        });

        Offline.check();

        var svc = {

            parks: null,

            getParksAndRides: function () {

                var deferred = $q.defer();

                var localStorageKey = Enums.localStorageKeys.parks;

                var isParkDataNotCachedInLocalStorage = function () { 
                    return localStorage[localStorageKey] === undefined;
                };

                if (isParkDataNotCachedInLocalStorage()) {

                    remotePersistenceStrategy.getParksAndRides().then(
                        function(parks){
                            localStorage[localStorageKey] = JSON.stringify(parks);
                            deferred.resolve(parks);
                        },
                        deferred.reject);

                } else {

                    localPersistenceStrategy.getParksAndRides()
                                            .then(deferred.resolve, deferred.reject);
                }

                return deferred.promise;
            },

            getParkByName: function (name) {

                var deferred = $q.defer();

                var parkName = decodeURIComponent(name);

                svc.getParksAndRides().then(
                    function (parks) {
                        for (var i = 0; i < parks.length; i++) {
                            if (parks[i].name === parkName) {
                                deferred.resolve(parks[i]);
                                break;
                            }
                        }
                    },
                    deferred.reject);

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