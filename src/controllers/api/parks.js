(function(controller){

    var db = require('../../data');

    var error = {

        send: function (response, error) {
            response.send(500, {
                message: 'Error trying to access data.',
                error: error
            })
        },

        sendIfRequestHangs: function (response, send) {
                var timeout = setTimeout(function () {
                    if(send){
                        error.send(response);
                    }
                }, 3000);
        }
    };

    controller.init = function(app){

        app.get('/api/parks', function(request, response){
            try {
                db.parks.get(function (error, parks) {
                    if (error) {
                        error.send(response, error);
                    } else {
                        sendBlankResponse = false;
                        response.set('Content-Type', 'application/json');
                        response.send(parks);
                    }
                });
            }
            catch (e) {
                error.send(response);
            }
        });

        app.get('/api/parks/:parkName', function(request, response){
            try {
                var name = request.params.parkName;

                db.parks.getByName(name, function (error, park) {
                    if (error) {
                        error.send(response, error);
                    } else {
                        sendBlankResponse = false;
                        response.set('Content-Type', 'application/json');
                        response.send(park);
                    }
                });
            }
            catch (e) {
                error.send(response);
            }
        });

        // create (insert) new park
        app.post('/api/parks/:parkName', function(request, response){
            var name = request.params.parkName;

            try {
                db.parks.insert(name, function(error, park){
                    if (error) {
                        error.send(response, error);
                    } else {
                        response.send(200, park);
                    }
                });
            }
            catch (e) {
                error.send(response);
            }
        });

        app.delete('/api/parks/:parkName', function(request, response){
            var name = request.params.parkName;

            try {
                db.parks.delete(name, function(error){               
                    if (error) {
                        error.send(response, error);
                    } else {
                        response.send(200);
                    }
                });
            }
            catch (e) {
                error.send(response);
            }
        });
    };

}(module.exports));