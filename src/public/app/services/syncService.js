'option strict'

offlinesApp.service('syncService',
            ['$window', '_', 'Q', 
    function( $window,   _,   Q){
    
    var svc = {

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
        
        sync: function(){
            alert('I\'mma gonna sync!');
        }  
    };

    return svc;
    
    }]);