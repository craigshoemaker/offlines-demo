(function(controllers){

    var ui = {
        index: require('./ui/index.js'),
        parks: require('./ui/parks.js')
    };

    var api = {
        parks: require('./api/parks.js')
    };

    controllers.init = function(app){

        ui.index.init(app);
        ui.parks.init(app);

        api.parks.init(app);
    };
    
}(module.exports));