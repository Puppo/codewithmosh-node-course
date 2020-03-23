const mongoose = require('mongoose');

const { model: genreModel } = require('./genre');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreModel.schema,
        required: true
    },
    numberInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    }
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = {
    model: MovieModel,
    schema: movieSchema
};