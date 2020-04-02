const express = require('express')
const router = express.Router();

const genreQuery = require('../db/queries/genre');
const validate = require('../validations/genre');
const getValidationMessage = require('../validations/message-error');

function createGenre(req) {
    return {
        name: req.body.name
    };
}

async function get(req, res) {
    try {
        const genre = await genreQuery.getById(req.params.id);
        if (!genre) {
            return res.status(404).send('Genre not found');
        }
        return res.send(genre);
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function getAll(req, res) {
    try {
        return res.send(await genreQuery.getAll());
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function post(req, res) {
    try {
        const validation = validate(req.body);
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }
        return res.send(await genreQuery.create(createGenre(req)));
    } catch (ex) {
        console.error(ex);
        const errors = [];
        if (ex.errors) {
            for (const field in ex.errors) {
                errors.push(ex.errors[field].message);
            }
        }
        return res.status(500).send(errors.length ? errors : ex);
    }    
}

async function put(req, res) {
    try {
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
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function remove(req, res) {
    try {
        const result = await genreQuery.remove(req.params.id);
        if (result && result.deletedCount === 1) {
            return res.send();
        }
        return res.status(404).send('Genre not found');
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

module.exports = router
.get('/:id', get)
.get('/', getAll)
.post('/', post)
.put('/:id', put)
.delete('/:id', remove);

