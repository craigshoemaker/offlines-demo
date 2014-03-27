var data = require('../../data');

describe('/data/index.js: ', function(){

    it('"getParks" will return all parks (without projections)', function(){
        data.getParks(function(parks){
            expect(parks.length).toBeGreaterThan(0);   
        });
    });

    it('"getParkByName" will return only one park matching the given name', function(){
        var parkName = 'EPCOT'
        data.getParkByName(parkName, function(park){
            expect(park.name).toBe(parkName);    
        });
    });

    it('"createPark" will create a new park with the given name', function(){
        data.createPark('test', function(error){
            expect(error).toBeNull();
        });    
    });

    it('"createPark" will NOT create duplicates', function(){
        data.createPark('test', function(error){
            expect(error).toBeTruthy();
        });    
    });

    it('"deletePark" will delete a park with the given name', function(){
        var parkName = 'test'

        data.deletePark(parkName, function(error){
            expect(error).toBeNull();
        }); 
        
        data.getParkByName(parkName, function(park){
            expect(park).toBeNull();    
        });
    });
});