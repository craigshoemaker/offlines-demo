(function(controller){

    var db = require('../../data');

    controller.init = function(app){

        app.get('/parks', function(request, response){

            db.parks.get(function(error, parks){

                response.render('list', 
                    {
                        title:'Parks', 
                        parks: parks,
                        error: error
                    });
            });

        });

        app.get('/parks/:parkName', function(request, response){
            var parkName = request.params.parkName;

            response.render('park',{title: parkName}); 
        });
    };

}(module.exports));