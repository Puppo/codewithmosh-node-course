const express = require('express')
const router = express.Router();

const movieQuery = require('../db/queries/movie');
const genreQuery = require('../db/queries/genre');
const validate = require('../validations/movie');
const getValidationMessage = require('../validations/message-error');

const authMiddleware = require('../middleware/auth');

function createGenre(genre) {
    return {
        id: genre._id,
        name: genre.name
    };
}

function createMovie(req, genre) {
    return {
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    };
}

async function get(req, res) {
    const movie = await movieQuery.getById(req.params.id);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    return res.send(movie);
}

async function getAll(req, res) {
    return res.send(await movieQuery.getAll());
}

async function post(req, res) {
    const validation = validate(req.body);
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }

    const genre = await genreQuery.getById(req.body.genreId);
    if (!genre) {
        return res.status(400).send('Invalid Genre');
    }

    return res.send(await movieQuery.create(createMovie(req, createGenre(genre))));    
}

async function put(req, res) {
    const validation = validate(req.body);
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }

    const genre = await genreQuery.getById(req.body.genreId);
    if (!genre) {
        return res.status(400).send('Invalid Genre');
    }

    const movie = await movieQuery.update(req.params.id, createMovie(req, createGenre(genre)));
    if (movie) {
        return res.send(movie);
    }
    return res.status(404).send('Movie not found');
}

async function remove(req, res) {
    const result = await movieQuery.remove(req.params.id);
    if (result && result.deletedCount === 1) {
        return res.send();
    }
    return res.status(404).send('Movie not found');
}

module.exports = router
.get('/:id', get)
.get('/', getAll)
.post('/', authMiddleware, post)
.put('/:id', authMiddleware, put)
.delete('/:id', authMiddleware, remove);

