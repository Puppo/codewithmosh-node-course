const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
});

function validateGenre(genre) {
    return schema.validate(genre);
}

module.exports = validateGenre;