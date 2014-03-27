module.exports = function(config){

    var
        database = {},
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

    return database;
    
};