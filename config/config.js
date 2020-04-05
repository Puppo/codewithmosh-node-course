const config = require('config');

module.exports = {
    name: () => config.get('name'),
    jwtKey: () => config.get('jwtPrivateKey'),
    dbConnection:() => config.get('db'),
    dbLoggerConnection:() => config.get('dbLogger'),
};