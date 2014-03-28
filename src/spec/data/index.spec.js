var db = require('../../data');

describe('/data/index.js: ', function(){

    it('"getParks" will return all parks (without projections)', function(done){
        db.parks.get(function(error, parks){
            expect(parks.length).toBeGreaterThan(0);
            done();
        });
    });

    it('"getParkByName" will return only one park matching the given name', function(done){
        var parkName = 'EPCOT'
        db.parks.getByName(parkName, function(error, park){
            expect(park.name).toBe(parkName);
            done();
        });
    });

    it('"createPark" will create a new park with the given name', function(done){
        var parkName = 'test';
        db.parks.create(parkName, function(error){
            expect(error).toBeNull();
            done();
        });    
    });

    it('"createPark" will NOT create duplicates', function(done){
        var parkName = 'test';

        db.parks.create(parkName, function(error){
            expect(error).toBeTruthy();
            done();
        });    
    });

    it('"deletePark" will delete a park with the given name', function(done){
        var parkName = 'test'
        db.parks.delete(parkName, function(error){
            expect(error).toBeNull();
            db.parks.getByName(parkName, function(park){
                expect(park).toBeNull();
                done(); 
            });
        }); 
    });
});