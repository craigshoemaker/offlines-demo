'option strict'

offlinesApp.service('syncService',
            ['localStorage', '$http', '$rootScope', '_', '$q', 'Enums',
    function( localStorage,   $http,   $rootScope,   _,   $q,   Enums){
    
    var svc = {

        key: Enums.localStorageKeys.parks,

        getLocalData: function(){
            return localStorage[svc.key];
        },

        setLocalData: function(parks){
            parks = JSON.stringify(parks);
            localStorage[svc.key] = parks;
        },

        check: function(parks){

            var returnValue = false;

            if(parks){
                parks.forEach(function(park){
                    park.rides.forEach(function(ride){
                        if(_.isArray(ride.waitTimes) && ride.waitTimes.length > 0){
                            returnValue = true;
                        }
                    });
                });
            }

            return returnValue;
        },

        removeWaitTimesFromLocalData: function(){
            var data = svc.getLocalData();

            var parks = JSON.parse(data);

            parks.forEach(function(park){
                park.rides.forEach(function(ride){
                    ride.waitTimes = [];
                });
            });

            svc.setLocalData(parks);
        },
        
        sync: function(parks){
            
            var deferred = $q.defer();
            var data = svc.getLocalData();

            if(data){
                $http.post('/api/sync', {
                        data : data
                    })
                    .success(function(result){

                        svc.removeWaitTimesFromLocalData();

                        deferred.resolve({
                            success: result,
                        });
                    })
                    .error(function(error){
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }  
    };

    return {
        check: svc.check,
        sync: svc.sync    
    };
    
    }]);