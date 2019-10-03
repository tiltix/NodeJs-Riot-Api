const winston = require('winston');
const url = require('url');
const path = require('path');

const {createLogger,format,transports} = winston;

const {combine,timestamp,label,prettyPrint} = format;

const logger = winston.createLogger({
    format: combine(
        label({label: 'right meow!'}),
        timestamp(),
        prettyPrint()
    ),
    transports : [
        new transports.Console(),
        // burada oluşacak hataların loglarının kayıt edileeceği kısım.
        new winston.transports.File({filename:'log/combined.log'})
    ]
});
var at = 'kulak'
logger.log({
    level : 'info',
    message : at
});