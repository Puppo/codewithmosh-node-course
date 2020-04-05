const mongoose = require('mongoose');
const { model: Movie } = require('../models/movie');

async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return mongoose.Types.ObjectId.isValid(id) ? await Movie.findById(id) : null;
}

async function create(movie) {
    return await new Movie(movie).save();
}

async function update(id, movie) {
    return await Movie.findOneAndUpdate({ _id: id }, {
        ...movie
    }, { new: true })
}

async function remove(id) {
    return await Movie.deleteOne({ _id: id});
}

async function incrementMovieStock(id) {
    await Movie.updateOne({ _id: id }, {
        $inc: { numberInStock: 1 } 
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    incrementMovieStock
}