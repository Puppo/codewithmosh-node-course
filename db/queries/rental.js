const Fawn = require('fawn');
const mongoose = require('mongoose');
const { model: RentalModel } = require('../models/rental');

function createRental(customer, movie) {
    return RentalModel({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: customer._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
}

async function getAll() {
    return await RentalModel.find().sort('-dateOut');
}

async function getById(id) {
    return await RentalModel.findOne({ _id: id });
}

async function create(customer, movie) {
    try {
        const rental = createRental(customer, movie);
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
        })
        .run();

        return rental;
    } catch (ex) {
        throw ex;
    }
}

async function update(id, rental) {
    return await RentalModel.findOneAndUpdate({ _id: id }, {
        ...rental
    }, { new: true })
}

async function remove(id) {
    return await RentalModel.deleteOne({ _id: id});
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}