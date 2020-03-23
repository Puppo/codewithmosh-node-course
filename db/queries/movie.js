const { model: Movie } = require('../models/movie');

async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return await Movie.findOne({ _id: id });
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

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}