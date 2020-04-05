const mongoose = require('mongoose');
const { model: Customer } = require('../models/customer');

async function getAll() {
    return await Customer.find();
}

async function getById(id) {
    return mongoose.Types.ObjectId.isValid(id) ? await Customer.findById(id) : null;
}

async function create(customer) {
    return await new Customer(customer).save();
}

async function update(id, customer) {
    return await Customer.findOneAndUpdate({ _id: id }, {
        ...customer
    }, { new: true })
}

async function remove(id) {
    return await Customer.deleteOne({ _id: id});
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}