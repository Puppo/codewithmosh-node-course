const express = require('express')
const router = express.Router();

const rentalQuery = require('../db/queries/rental');
const customerQuery = require('../db/queries/customer');
const movieQuery = require('../db/queries/movie');
const validate = require('../validations/rental');
const getValidationMessage = require('../validations/message-error');

const authMiddleware = require('../middleware/auth');

async function get(req, res) {
    const rental = await rentalQuery.getById(req.params.id);
    if (!rental) {
        return res.status(404).send('Rental not found');
    }
    return res.send(rental);
}

async function getAll(req, res) {
    return res.send(await rentalQuery.getAll());
}

async function post(req, res) {
    const validation = validate(req.body);
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }

    const customer = await customerQuery.getById(req.body.customerId);
    if (!customer) {
        return res.status(400).send('Customer not found');
    }

    const movie = await movieQuery.getById(req.body.movieId);
    if (!movie) {
        return res.status(400).send('Movie not found');
    }

    if (movie.numberInStock === 0) {
        return res.status(400).send('Movie not in stock');
    }

    return res.send(await rentalQuery.create(customer, movie));    
}

async function put(req, res) {
    try {
        const validation = validate(createRental(req));
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }

        const customer = await customerQuery.getById(req.customerId);
        if (!customer) {
            return res.status(400).send('Customer not found');
        }

        const movie = await movieQuery.getById(req.movieId);
        if (!movie) {
            return res.status(400).send('Movie not found');
        }

        const rental = await rentalQuery.update(req.params.id, createRental(req));
        if (rental) {
            return res.send(rental);
        }
        return res.status(404).send('Rental not found');
    } catch (ex) {
        next(ex);
    }
}

async function remove(req, res) {
    try {
        const result = await rentalQuery.remove(req.params.id);
        if (result && result.deletedCount === 1) {
            return res.send();
        }
        return res.status(404).send('Rental not found');
    } catch (ex) {
        next(ex);
    }
}

module.exports = router
.get('/:id', get)
.get('/', getAll)
.post('/', authMiddleware, post)
.put('/:id', authMiddleware, put)
.delete('/:id', authMiddleware, remove);

