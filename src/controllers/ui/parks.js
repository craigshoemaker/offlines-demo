﻿(function(controller){

    var db = require('../../data');

    controller.init = function(app){

        app.get('/parks', function(request, response){

            db.parks.getNames(function(error, parks){

                parks.forEach(function(park){
                    park.nameEncoded = encodeURIComponent(park.name);    
                });

                response.render('index', 
                    {
                        title:'Parks', 
                        parks: parks,
                        error: error
                    });
            });

        });

        app.get('/parks/:parkName', function(request, response){

            var parkName = request.params.parkName;

            db.parks.getByName(parkName, function(error, park) {
               response.render('park', 
                    {
                        title:park.name,
                        park: park,
                        error: error
                    }); 
            });
        });
    };

}(module.exports));