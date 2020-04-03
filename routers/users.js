const express = require('express');
const router = express.Router();
const _ = require('lodash');

const hashUtil = require('../utils/hash');

const userQuery = require('../db/queries/user');
const validate = require('../validations/user');
const getValidationMessage = require('../validations/message-error');

const authMiddleware = require('../middleware/auth');

function createUser(req) {
    return _.pick(req.body, ['email', 'name', 'password']);
}

async function get(req, res) {
    try {
        const user = await userQuery.getById(req.user._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.send(user);
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function post(req, res) {
    try {
        const validation = validate(createUser(req));
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }

        if (await userQuery.getByEmail(req.body.email)) {
            return res.status(400).send('User already registered.');
        }

        const user = createUser(req)
        user.password = await hashUtil.hash(user.password);

        const userInsert = await userQuery.create(user);

        return res
        .header('x-auth-token', user.generateAuthToken())
        .send(_.pick(userInsert, ['_id', 'email', 'name']));
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
        const validation = validate(createUser(req));
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }
        const user = createUser(req)
        user.password = await hashUtil.hash(user.password);
        const userUpdate = await userQuery.update(req.params.id, user);
        
        if (user) {
            return res.send(userUpdate);
        }
        return res.status(404).send('User not found');
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

async function remove(req, res) {
    try {
        const result = await userQuery.remove(req.params.id);
        if (result && result.deletedCount === 1) {
            return res.send();
        }
        return res.status(404).send('User not found');
    } catch (ex) {
        console.error(ex);
        return res.status(500).send();
    }
}

module.exports = router
.get('/me', authMiddleware, get)
.post('/', post);

