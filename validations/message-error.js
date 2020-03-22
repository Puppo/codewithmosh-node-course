function validationMessages(validation) {
    return validation.error.details.map(d => d.message)
}

module.exports = validationMessages;