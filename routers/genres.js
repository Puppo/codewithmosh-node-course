const express = require('express')
const router = express.Router();

const genreQuery = require('../db/queries/genre');
const validate = require('../validations/genre');
const getValidationMessage = require('../validations/message-error');

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const validateObjectIdMiddleware = require('../middleware/validate-object-id');

function createGenre(req) {
    return {
        name: req.body.name
    };
}

async function get(req, res, next) {
    const genre = await genreQuery.getById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    return res.send(genre);
}

async function getAll(req, res) {
    return res.send(await genreQuery.getAll());
}

async function post(req, res) {
    const validation = validate(req.body);
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }
    return res.send(await genreQuery.create(createGenre(req))); 
}

async function put(req, res) {
    const validation = validate(createGenre(req));
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }
    const genre = await genreQuery.update(req.params.id, createGenre(req));
    if (genre) {
        return res.send(genre);
    }
    return res.status(404).send('Genre not found');
}

async function remove(req, res) {
    const result = await genreQuery.remove(req.params.id);
    if (result && result.deletedCount === 1) {
        return res.send();
    }
    return res.status(404).send('Genre not found');
}

module.exports = router
.get('/:id', validateObjectIdMiddleware, get)
.get('/', getAll)
.post('/', authMiddleware, post)
.put('/:id', authMiddleware, put)
.delete('/:id', [authMiddleware, adminMiddleware], remove);

