const config = require('./config');

module.exports = function() {
    if (!config.jwtKey()) {
        throw new Error('FATAL ERROR: jwt key not defined');
    }
    if (!config.dbConnection()) {
        throw new Error('FATAL ERROR: db connection key not defined');
    }
    if (!config.dbLoggerConnection()) {
        throw new Error('FATAL ERROR: db logger connection key not defined');
    }
}