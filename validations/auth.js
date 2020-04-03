const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity')

const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
});

function validateAuth(user) {
    return schema.validate(user);
}

module.exports = validateAuth;