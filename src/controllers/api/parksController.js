﻿(function(controller){

    var db = require('../../data');

    controller.init = function(app){

        app.get('/api/parks', function(request, response){

            db.parks.get(function(error, parks){

                response.render('index', 
                    {
                        title:'Parks', 
                        parks: parks,
                        error: error,
                        flashError: request.flash('error')
                    });
            });

        });

        app.post('/api/parks', function(request, response){
            var name = request.body.parkName;

            if(name.length > 0){
                db.parks.insert(name, function(error){
                    var destination = '/parks/' + name;
                
                    if(error){
                        destination = '/';
                        request.flash('error', error);
                    }

                    response.redirect(destination);
                });
            }
        });

        app.post('/api/parks/:parkName', function(request, response){
            var name = request.body.parkName;

            if(name.length > 0){
                db.parks.delete(name, function(error){
                    var destination = '/';
                
                    if(error){
                        request.flash('error', error);
                    }

                    request.flash('error', 'deleted');

                    response.redirect(destination);
                });
            }
        });
    };

}(module.exports));