const mongoose = require('mongoose');
const debug = require('debug')('app:startup')

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => debug('Connected to MongoDb...'))
.catch(ex => {
    debug('Could not connect to MongoDb...', ex);
    throw ex;
});