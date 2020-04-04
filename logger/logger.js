const winston = require('winston');

module.exports = {
    info: (message, data) => {
        winston.info(message, { metadata: data });
    },
    warn: (message, data) => {
        winston.warn(message, { metadata: data });
    },
    error: (message, ex) => {
        winston.error(message, { metadata: ex });
    }
}