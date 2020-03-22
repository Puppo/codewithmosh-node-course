const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();

const logger = require('./middleware/logger');

const genresRoute = require('./routers/genres');
const customersRoute = require('./routers/customers');
const homeRoute = require('./routers/home');

app.set('view engine', 'pug');
app.set('views', './views');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: env: ${app.get('env')}`);

require('./db/connection');

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Mail Host: ${config.get('mail').host}`);
console.log(`Application Mail Password: ${config.get('mail').password}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...')
}

app.use('/', homeRoute);

app.use('/api/genres', genresRoute);
app.use('/api/customers', customersRoute);
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
