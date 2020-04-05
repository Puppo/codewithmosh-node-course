const Fawn = require('fawn');
const mongoose = require('mongoose');
const logger = require('../logger/logger');
const config = require('../config/config');

module.exports = function() {
    mongoose.connect(config.dbConnection(), { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => logger.info(`Connected to ${config.dbConnection()}...`));

    Fawn.init(mongoose);
}