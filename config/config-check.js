const config = require('config');

function checkConfig() {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwt key not defined');
        process.exit(1);
    }
}

module.exports = {
    check: checkConfig
};