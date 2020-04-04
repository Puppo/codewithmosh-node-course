const express = require('express');
const app = express();
const logger = require('./logger/logger');

require('./logger/startup')();
require('./validations/startup')();
require('./routers/startup')(app);
require('./views/startup')(app);
require('./db/startup')();
require('./config/startup')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}...`);
});
