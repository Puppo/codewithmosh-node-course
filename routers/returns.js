const express = require('express');
const router = express.Router();

const rentalQuery = require('../db/queries/rental');
const movieQuery = require('../db/queries/movie');

const authMiddleware = require('../middleware/auth');

const validate = require('../validations/return');
const validateMiddleware = require('../middleware/validate');

async function post(req, res) {
    if (!req.body.customerId) {
        return res.status(400).send('customerId not provided');
    }

    if (!req.body.movieId) {
        return res.status(400).send('movieId not provided');
    }

    const rental = await rentalQuery.getByCustomerAndMovie(req.body.customerId, req.body.movieId);
    if (!rental) {
        return res.status(404).send('Rental not found');
    }

    if (rental.dateReturn) {
        return res.status(400).send('Return already processed');
    }

    rental.return();
    await rental.save();

    movieQuery.incrementMovieStock(req.body.movieId);

    return res.send(rental);
    
}

module.exports = router
.post('/', [authMiddleware, validateMiddleware(validate)], post);