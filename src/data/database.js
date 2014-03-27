(function(database){

    //How should I pass options to a node module?
    //http://stackoverflow.com/questions/6366029/how-should-i-pass-options-to-a-node-module
    // TODO: move config out of module to allow for injection

    var config = require('../config');

    var 
        _mongodb = require('mongodb'),
        _mongoUrl = 'mongodb://'+ config.host +':' + 
                                  config.ports.database.api + '/' + 
                                  config.databaseName,
        _db = null;

    database.get = function(next){
        if(!_db){
            _mongodb.MongoClient.connect(_mongoUrl, function(error, db){
                
                if(error){
                    next(error, null);    
                } else {
                    _db = {
                        instance: db,
                        parks: db.collection('parks')
                    };
                    next(null, _db);    
                }
            });
        } else {
            next(null, _db);
        }
    };
}(module.exports));