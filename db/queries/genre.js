const Genre = require('../models/genre');

async function getAll() {
    return await Genre.find();
}

async function getById(id) {
    return await Genre.findOne({ _id: id });
}

async function create(genre) {
    return await new Genre(genre).save();
}

async function update(id, genre) {
    return await Genre.findOneAndUpdate({ _id: id }, {
        ...genre
    }, { new: true })
}

async function remove(id) {
    return await Genre.deleteOne({ _id: id});
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}