const express = require('express')
const router = express.Router();

const customerQuery = require('../db/queries/customer')
const validate = require('../validations/customer');
const getValidationMessage = require('../validations/message-error');


function createCustomer(req) {
    return {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold || false
    };
}

async function get(req, res) {
    try {
        const customer = await customerQuery.getById(req.params.id);
        if (!customer) {
            return req.status(404).send('Customer not found');
        }
        return res.send(customer);
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function getAll(req, res) {
    try {
        return res.send(await customerQuery.getAll());
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function post(req, res) {
    try {
        const validation = validate(createCustomer(req));
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }
        return res.send(await customerQuery.create(createCustomer(req)));
    } catch (ex) {
        console.error(ex);
        const errors = [];
        if (ex.errors) {
            for (const field in ex.errors) {
                errors.push(ex.errors[field].message);
            }
        }
        return res.status(500).send(errors.length ? errors : ex);
    }    
}

async function put(req, res) {
    try {
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
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function remove(req, res) {
    try {
        const result = await customerQuery.remove(req.params.id);
        if (result && result.deletedCount === 1) {
            return res.send();
        }
        return res.status(404).send('Customer not found');
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

module.exports = router
.get('/:id', get)
.get('/', getAll)
.post('/', post)
.put('/:id', put)
.delete('/:id', remove);

