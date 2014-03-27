(function(config){

    config.publicFolder = '/public';
    config.viewEngineName = 'vash';
    config.databaseName = 'Offlines';
    config.host = 'localhost';

    config.ports = {
        website: 3000,
        database: {
            api: 27017,
            admin: 28017    
        }    
    };
    
}(module.exports));