const mongoose = require('mongoose');
const { model: GenreModel } = require('../models/genre');

async function getAll() {
    return await GenreModel.find();
}

async function getById(id) {
    return mongoose.Types.ObjectId.isValid(id) ? await GenreModel.findById(id) : null;
}

async function create(genre) {
    return await new GenreModel(genre).save();
}

async function update(id, genre) {
    return await GenreModel.findOneAndUpdate({ _id: id }, {
        ...genre
    }, { new: true })
}

async function remove(id) {
    return await GenreModel.deleteOne({ _id: id});
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}