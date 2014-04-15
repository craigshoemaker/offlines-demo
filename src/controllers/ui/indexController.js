(function(controller){

    controller.init = function(app){

        app.get('/', function(request, response){

            response.render('index',{
                title: 'Parks', 
                isOfflinePage: true
            });

        });

        app.get('/app.appcache',function(request, response){
            response.set('Content-Type', 'text/cache-manifest');
            response.render('appcache');
        });
    };

}(module.exports));