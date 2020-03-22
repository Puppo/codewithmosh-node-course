const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

const genresRoute = require('./genres');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Hello To Vidly');
});

app.use('/api/genres', genresRoute.router)
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
