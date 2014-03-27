(function(controllers){

    var indexController = require('./indexController.js');

    controllers.init = function(app){
        indexController.init(app);
    };
    
}(module.exports));