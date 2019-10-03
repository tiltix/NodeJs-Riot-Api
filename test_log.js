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
        // loglarının kayıt edileeceği yerin belirlenmesi
        new winston.transports.File({filename:'log/combined.log'})
    ]
});
var mesaj = 'mesaj içeriği dışardanda tanımlanamabilir'
logger.log({
    level : 'info',
    message : mesaj
});