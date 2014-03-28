(function (db) {

    var config = require('../config');

    var
        _seed = require('./seed'),
        _database = require('./database')(config);

    db.parks = {
        
        get: function (next) {
            _database.get(function(error, db){
                if(error){
                    next(error, null);
                } else {
                    db.parks.find().sort({name: 1}).toArray(function(error, parks){
                        next(error, parks);
                    });
                }
            });
        },

        getByName: function (name, next) {
            _database.get(function(error, db){
                if(error){
                    next(error, null);
                    return;
                }

                db.parks.findOne({name:name}, function(error, park){
                    park.rides.sort(function(a, b) {
                        return a.name - b.name;
                    });
                    next(error, park);
                });

            });
        },

        'delete': function (name, next) {
            _database.get(function(error, db){
                if(error){
                    next(error, null);
                    return;
                }

                db.parks.remove({name: name}, function(error){
                    next(error);
                });

            });
        },

        insert: function(name, next){
            _database.get(function(error, db){

                if(error){
                    next(error, null);
                    return;
                }

                db.parks.find({name: name}).count(function(error, count){

                    var doInsert = !(error);

                    if(error){
                        next(error, null);
                    }

                    if(doInsert && count != 0){
                        next('That park already exists.', null);
                        doInsert = false;
                    }

                    if(doInsert){

                        var park = {
                            name: name,
                            rides: []    
                        };

                        db.parks.insert(park, function(error, newPark){
                            next(error, newPark[0]);
                        });    
                    }
                });
            });
        }
    };

    var util = {
        seedDatabase: function () {

            _database.get(function (error, db) {

                if(error){
                    console.log('Failed to seed database. Error: ' + error);
                    return;
                }

                db.parks.count(function (error, count) {
            
                    if(error){
                        console.log('Error while attempting to get count from "parks" store. Error: ' + error);
                        return;
                    }

                    if(count === 0){
                        console.log('Seeding database...');

                        _seed.parks.forEach(function(park){
                            db.parks.insert(park, function(error){
                                if(error){
                                    console.log('Error while trying to write ' + park.name + ' to document store. Error: ' + error);
                                }
                            });
                        });

                        console.log('Seeding complete.');
                    } else {
                        console.log('Database already seeded.'); 
                    }     
                });
            });
        }
    }

    util.seedDatabase();

}(module.exports));