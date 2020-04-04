const Fawn = require('fawn');
const mongoose = require('mongoose');
const logger = require('../logger/logger');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => logger.info('Connected to MongoDB...'));

    Fawn.init(mongoose);
}