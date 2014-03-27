var db = require('../../data');

describe('/data/index.js: ', function(){

    it('"getParks" will return all parks (without projections)', function(){
        db.parks.get(function(parks){
            expect(parks.length).toBeGreaterThan(0);   
        });
    });

    it('"getParkByName" will return only one park matching the given name', function(){
        var parkName = 'EPCOT'
        db.parks.getByName(parkName, function(park){
            expect(park.name).toBe(parkName);    
        });
    });

    it('"createPark" will create a new park with the given name', function(){
        db.parks.create('test', function(error){
            expect(error).toBeNull();
        });    
    });

    it('"createPark" will NOT create duplicates', function(){
        db.parks.create('test', function(error){
            expect(error).toBeTruthy();
        });    
    });

    it('"deletePark" will delete a park with the given name', function(){
        var parkName = 'test'

        db.parks.delete(parkName, function(error){
            expect(error).toBeNull();
        }); 
        
        db.parks.getByName(parkName, function(park){
            expect(park).toBeNull();    
        });
    });
});