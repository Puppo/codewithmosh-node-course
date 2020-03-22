const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const express = require('express');
const app = express();

const genresRoute = require('./genres');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: env: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Mail Host: ${config.get('mail').host}`);
console.log(`Application Mail Password: ${config.get('mail').password}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}


app.get('/', (req, res) => {
    res.send('Hello To Vidly');
});

app.use('/api/genres', genresRoute.router)
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
