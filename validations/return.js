const Joi = require('@hapi/joi');

const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
});

module.exports = function(item) {
    return schema.validate(item);
};