const config = require('config');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', (req, res) => {
    res.render('index', {
        title: config.get('name'),
        message: `Hello Word`
    })
});