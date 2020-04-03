const { model: User } = require('../models/user');

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findOne({ _id: id })
    .select('-password');
}

async function getByEmail(email) {
    return await User.findOne({ email: email});
}

async function create(user) {
    return await new User(user).save();
}

async function update(id, user) {
    return await User.findOneAndUpdate({ _id: id }, {
        ...user
    }, { new: true })
}

async function remove(id) {
    return await User.deleteOne({ _id: id});
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    remove
}