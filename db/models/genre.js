const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
});

const GenreModel = mongoose.model('Genre', genreSchema);

module.exports = {
    model: GenreModel,
    schema: genreSchema
};