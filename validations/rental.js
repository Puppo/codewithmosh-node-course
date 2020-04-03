const Joi = require('@hapi/joi');

const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
});

function validateRental(customer) {
    return schema.validate(customer);
}

module.exports = validateRental;