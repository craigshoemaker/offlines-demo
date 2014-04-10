'option strict'

offlinesApp.factory('syncService',
            ['$window', 'Enums', 'parkService', 
    function( $window,   Enums,   parkService){
    
    var svc = {

        init: function(){

            //parkService.getParksAndRides().done(
            //    function(parks){
            //        alert(parks);                    
            //    }, 
            //    function(error){
            //        alert(error);
            //    });
        }    
    };

    return svc;
    
    }]);