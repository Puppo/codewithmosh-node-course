const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

const genresApi = require('./genres');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello To Vidly');
});


app.get(genresApi.getAll.path, genresApi.getAll.method);
app.get(genresApi.get.path, genresApi.get.method);
app.post(genresApi.post.path, genresApi.post.method);
app.put(genresApi.put.path, genresApi.put.method);
app.delete(genresApi.delete.path, genresApi.delete.method);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
