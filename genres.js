const Joi = require('@hapi/joi');

const PATH = '/api/genres';

const genres = [
    { id: 1, name: 'Genre 1' },
    { id: 2, name: 'Genre 2' },
    { id: 3, name: 'Genre 3' },
    { id: 4, name: 'Genre 4' }
];

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

function validationMessages(validation) {
    return validation.error.details.map(d => d.message)
}

function get(req, res) {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        return req.status(404).send('Genre not found');
    }

    return res.send(genre);
}

function getAll(req, res) {
    return res.send(genres);
}

function post(req, res) {
    const validation = validateGenre(req.body);
    if (validation.error) {
        return res.status(400).send(
            validationMessages(validation)
        );
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);

    return res.send(genre);
}

function put(req, res) {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        return req.status(404).send('Genre not found');
    }
    const validation = validateGenre(req.body);
    if (validation.error) {
        return res.status(400).send(
            validationMessages(validation)
        );
    }
    genre.name = req.body.name;
    return res.send(genre);
}

function remove(req, res) {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        return req.status(404).send('Genre not found');
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
}


module.exports = {
    get: {
        path: PATH + '/:id',
        method: get
    },
    getAll: {
        path: PATH,
        method: getAll
    },
    post: {
        path: PATH,
        method: post
    },
    put: {
        path: PATH + '/:id',
        method: put
    },
    delete: {
        path: PATH + '/:id',
        method: remove
    },
}

