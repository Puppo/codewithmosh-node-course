const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

const genresRoute = require('./genres');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello To Vidly');
});

app.use('/api/genres', genresRoute.router)
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
