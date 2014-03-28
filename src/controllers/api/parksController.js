(function(controller){

    var db = require('../../data');

    var error = {

        send: function (response, error) {
            response.send(500, {
                message: 'Error trying to access data.',
                error: error
            })
        },

        sendIfRequestHangs: function (response) {
            var timeout = setTimeout(function () {
                error.send(response);
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
                        response.set('Content-Type', 'application/json');
                        response.send(parks);
                    }
                });
                error.sendIfRequestHangs(response);
            }
            catch (e) {
                error.send(response);
            }
        });

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
                error.sendIfRequestHangs(response);
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
                error.sendIfRequestHangs(response);
            }
            catch (e) {
                error.send(response);
            }
        });
    };

}(module.exports));