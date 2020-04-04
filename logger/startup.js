const winston = require('winston');
const { format } = require('winston');
const { json, timestamp, combine, prettyPrint } = format;
require('winston-mongodb');

module.exports = function() {    

    winston.configure({
        format: combine(
            timestamp(),
            json()
        ),
        exceptionHandlers: [
            new winston.transports.Console({
                format: combine(
                    prettyPrint({ colorize: true })
                )
            }),
            new winston.transports.File({ filename: './logs/exceptionHandlers.log' })
        ],
        transports: [
            new winston.transports.File({ 
                filename: './logs/info.log',
                levels: ['info', 'warn']
            }),
            new winston.transports.MongoDB({
                db: 'mongodb://localhost/vidly-logger',
                levels: ['info', 'warn'],
                options: {
                    useUnifiedTopology: true
                }
            }),
            new winston.transports.File({
                filename: './logs/error.log',
                level: 'error'
            }),
            new winston.transports.MongoDB({
                db: 'mongodb://localhost/vidly-logger',
                level: 'error',
                collection: 'error',
                options: {
                    useUnifiedTopology: true
                }
            })
        ]
      });


    process.on('unhandledRejection', ex => {
        throw ex;
    });
}