require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const express = require('express');

const genresRoute = require('./genres');
const customersRoute = require('./customers');
const moviesRoute = require('./movies');
const rentalsRoute = require('./rentals');
const usersRoute = require('./users');
const authRoute = require('./auth');
const homeRoute = require('./home');

const errorMiddleware = require('../middleware/error');

module.exports = function(app) {

    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        debug('Morgan enabled...')
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());

    app.use(express.json());
    app.use('/', homeRoute);
    app.use('/api/genres', genresRoute);
    app.use('/api/customers', customersRoute);
    app.use('/api/movies', moviesRoute);
    app.use('/api/rentals', rentalsRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(errorMiddleware);
    
}