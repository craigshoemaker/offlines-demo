(function(controller){

    var db = require('../../data');

    var error = {

        send: function (response, error) {
            response.send(500, {
                message: 'Error trying to access data.',
                error: error
            })
        }
    };

    controller.init = function(app){

        // get all park info
        app.get('/api/parks', function(request, response){
            try {
                db.parks.getParksAndRides(function (error, parks) {
                    if (error) {
                        error.send(response, error);
                    } else {
                        response.set('Content-Type', 'application/json');
                        response.send(parks);
                    }
                });
            }
            catch (e) {
                error.send(response);
            }
        });

        // get park by name
        app.get('/api/parks/:parkName', function(request, response){
            try {
                var name = request.params.parkName;

                db.parks.getByName(name, function (error, park) {
                    if (error) {
                        error.send(response, error);
                    } else {
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

        // delete park
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

        // add new wait time
        app.post('/api/parks/:parkName/:rideName/:duration', function(request, response){
            var parkName = request.params.parkName;
            var rideName = request.params.rideName;
            var duration = parseInt(request.params.duration);

            if(!isNaN(duration)){
                db.rides.addWaitTime(parkName, rideName, duration, function(error, waitTime){
                    response.send(waitTime);
                });  
            } else {
                error.send(response);
            }

        });

        // sync wait times
        app.post('/api/sync', function(request, response){
            response.send(true);
        });
    };

}(module.exports));