const express = require('express');
const router = express.Router();
const config = require('../config/config');

module.exports = router.get('/', (req, res) => {
    res.render('index', {
        title: config.name(),
        message: `Hello to ${config.name()}`
    })
});