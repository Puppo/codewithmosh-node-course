const express = require('express');
const router = express.Router();
const _ = require('lodash');

const hashUtil = require('../utils/hash');

const userQuery = require('../db/queries/user');
const validate = require('../validations/auth');
const getValidationMessage = require('../validations/message-error');


function createAuth(req) {
    return _.pick(req.body, ['email', 'password']);
}


async function post(req, res) {
    try {
        const validation = validate(createAuth(req));
        if (validation.error) {
            return res.status(400).send(
                getValidationMessage(validation)
            );
        }

        const user = await userQuery.getByEmail(req.body.email);
        if (!user || !await hashUtil.compare(req.body.password, user.password)) {
            return res.status(400).send('Invalid email or password');
        }

        return res.send(user.generateAuthToken());
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

module.exports = router
.post('/', post);

