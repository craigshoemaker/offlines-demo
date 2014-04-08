(function(controller){

    controller.init = function(app){

        app.get('/', function(request, response){

            response.render('index');

        });
    };

}(module.exports));