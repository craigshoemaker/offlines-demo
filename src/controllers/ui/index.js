(function(controller){

    var db = require('../../data');

    controller.init = function(app){

        app.get('/', function(request, response){

            db.parks.getNames(function(error, parks){

                parks.forEach(function(park){
                    park.nameEncoded = encodeURIComponent(park.name);    
                });

                response.render('index', 
                    {
                        parks: parks,
                        error: error
                    });
            });

        });
    };

}(module.exports));