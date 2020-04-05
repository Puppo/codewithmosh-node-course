const getValidationMessage = require('../validations/message-error');

module.exports = function(validator) {
    return (req, res, next) => {
        const validation = validator(req.body);
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }
        next();
    };
}