const winston = require('winston');
const morgan = require('morgan');
// var config = require('../config');

var logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'MM-DD-YYYY HH:mm:ss'
    }),
    //winston.format.colorize(),
    winston.format.json(),
    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
)

var httpLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/logs.log',
            maxFiles: 5,
            colorize: false,
            format: logFormat
        }),
        new winston.transports.Console({
            format: logFormat
        })
    ],
    exitOnError: false
});

var logger = winston.createLogger({
    level: 'info',
    //format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            format: logFormat
        }),
        new winston.transports.File({
            filename: 'logs/logs.log',
            format: logFormat
        }),
        new winston.transports.Console({
            format: logFormat
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions.log',
            format: logFormat
        })
    ],
    exitOnError: false
});

// logger.add(new winston.transports.Console({
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: 'MM-DD-YYYY HH:mm:ss'
//         }),
//         winston.format.colorize(),
//         winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
//     )
// }), new winston.transports.File({
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: 'MM-DD-YYYY HH:mm:ss'
//         }),
//         winston.format.colorize(),
//         winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
//     ),
//     filename: 'logs/logs.log'
// }))


stream = {
    write: (message, encoding) => {
        httpLogger.info(message);
    }
};

morgan.format('full', ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer"')
// morgan.format('full', ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"')

// wrapper function act as middleware for express
logger.startHttpLogger = () => {
    return morgan('full', {
        stream: stream
    });
};

module.exports = logger;