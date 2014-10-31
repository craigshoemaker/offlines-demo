(function(controller){

    var db = require('../../data');

    controller.init = function(app){

        app.get('/data', function(request, response){

            db.parks.get(function(error, parks){

                response.render('list', 
                    {
                        title:'Wait Times by Park', 
                        parks: parks,
                        error: error,
                        isOfflinePage: false
                    });
            });

        });
    };

}(module.exports));