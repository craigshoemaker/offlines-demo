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
            response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            response.render('appcache');
        });
    };

}(module.exports));