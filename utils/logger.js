const winston = require('winston');
var config = require('../config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            json: true,
            colorize: true
        }),
        // new winston.transports.Console({
        //     level: 'debug',
        //     json: true,
        //     colorize: true
        // }),
        new winston.transports.File({ filename: 'logs/logs.log' }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions.log',
            json: true,
            colorize: true
        })
    ],
    exitOnError: false
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (config.get('env') !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
//}

logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    )
}))

module.exports = logger;