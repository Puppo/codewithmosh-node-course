const Joi = require('@hapi/joi');

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
}

module.exports = validateGenre;