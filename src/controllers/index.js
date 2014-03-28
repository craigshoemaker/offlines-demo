(function(controllers){

    var ui = {
        index: require('./ui/indexController.js')
    };

    var api = {
        parks: require('./api/parksController.js')
    };

    controllers.init = function(app){
        ui.index.init(app);
        api.parks.init(app);
    };
    
}(module.exports));