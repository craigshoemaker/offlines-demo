(function(controllers){

    var ui = {
        index: require('./ui/indexController.js'),
        parks: require('./ui/parksController.js')
    };

    var api = {
        parks: require('./api/parksController.js')
    };

    controllers.init = function(app){

        ui.index.init(app);
        ui.parks.init(app);

        api.parks.init(app);
    };
    
}(module.exports));