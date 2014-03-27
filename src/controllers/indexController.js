(function(controller){

    var data = require('../data');

    controller.init = function(app){

        app.get('/', function(request, response){

            data.getParks(function(error, parks){

                response.render('index', 
                    {
                        title:'Parks', 
                        parks: parks,
                        error: error,
                        flashError: request.flash('error')
                    });
            });

        });

        app.post('/new', function(request, response){
            var name = request.body.parkName;

            if(name.length > 0){
                data.createPark(name, function(error){
                    var destination = '/parks/' + name;
                
                    if(error){
                        console.log('Error while trying to create new park. Error: ' + error);
                        destination = '/';
                        request.flash('error', error);
                    }

                    response.redirect(destination);
                });
            }
        });
    };

}(module.exports));