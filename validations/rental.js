const Joi = require('@hapi/joi');

function validateRental(customer) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(customer);
}

module.exports = validateRental;