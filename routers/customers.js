const express = require('express')
const router = express.Router();

const customerQuery = require('../db/queries/customer')
const validate = require('../validations/customer');
const getValidationMessage = require('../validations/message-error');

const authMiddleware = require('../middleware/auth');


function createCustomer(req) {
    return {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold || false
    };
}

async function get(req, res) {
    const customer = await customerQuery.getById(req.params.id);
    if (!customer) {
        return res.status(404).send('Customer not found');
    }
    return res.send(customer);
}

async function getAll(req, res) {
    return res.send(await customerQuery.getAll());
}

async function post(req, res) {
    const validation = validate(createCustomer(req));
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }
    return res.send(await customerQuery.create(createCustomer(req)));
}

async function put(req, res) {
    const validation = validate(createCustomer(req));
    if (validation.error) {
        return res.status(400).send(
            getValidationMessage(validation)
        );
    }
    const customer = await customerQuery.update(req.params.id, createCustomer(req));
    if (customer) {
        return res.send(customer);
    }
    return res.status(404).send('Customer not found');
}

async function remove(req, res) {
    const result = await customerQuery.remove(req.params.id);
    if (result && result.deletedCount === 1) {
        return res.send();
    }
    return res.status(404).send('Customer not found');
}

module.exports = router
.get('/:id', get)
.get('/', getAll)
.post('/', authMiddleware, post)
.put('/:id', authMiddleware, put)
.delete('/:id', authMiddleware, remove);

