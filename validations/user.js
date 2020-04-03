const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity')

const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    name: Joi.string().min(1).max(100).required(),
    password: passwordComplexity({
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
      }),
});

function validateUser(user) {
    return schema.validate(user);
}

module.exports = validateUser;