var db = require('../../data');

describe('/data/index.js: ', function(){

    describe('db.parks', function(){

        it('"get" will return all parks (without projections)', function(done){
            db.parks.get(function(error, parks){
                expect(error).toBeNull();
                expect(parks.length).toBeGreaterThan(0);
                done();
            });
        });

        it('"getByName" returns rides alphabetically', function(done){
            db.parks.getByName('Animal Kingdom',function(error, park){
                expect(error).toBeNull();
                expect(park.rides[0].name).toBe('DINOSAUR');
                expect(park.rides[1].name).toBe('Expedition Everest');
                expect(park.rides[2].name).toBe('Kali River Rapids');
                done();
            });
        });

        it('"getByName" will return only one park matching the given name', function(done){
            var parkName = 'EPCOT'
            db.parks.getByName(parkName, function(error, park){
                expect(park.name).toBe(parkName);
                done();
            });
        });

        it('"insert" will create a new park with the given name', function(done){
            var parkName = 'test';
            db.parks.insert(parkName, function(error){
                expect(error).toBeNull();
                done();
            });    
        });

        it('"insert" will NOT create duplicates', function(done){
            var parkName = 'test';
            db.parks.insert(parkName, function(error){
                expect(error).toBeTruthy();
                done();
            });    
        });

        it('"delete" will delete a park with the given name', function(done){
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
});