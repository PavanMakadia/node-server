//var bodyParser = require('body-parser');
var compression = require('compression');
var config = require('../config');
var logger = require('../utils/logger');
var contrants = require('../utils/contrants')

module.exports = (app, express, root) => {

    // To catch uncaught exception and give an appropriate response to the user
    app.use((err, req, res, next) => {
        // and optionally displayed to the user for support.
        logger.error(util.format('Uncaught exception caught, error:- %j', err));
        return res.status(500).send({
            code: 5002,
            messageKey: contrants.messageKeys.code_5000,
            data: {}
        });
    });

    // Enable http logging
    if (config.get('server.enableHttpLogging'))
        app.use(logger.startHttpLogger());

    // Enable compression
    if (config.get('server.enableCompression'))
        app.use(compression());

    // Eanble CORS support
    //if (config.get('server.security.enableCORS'))
    //    require('./CORS')(app);

    // Enable request body parsing
    // app.use(bodyParser.urlencoded({
    //     extended: true,
    //     limit: config.get('server.bodyParser.limit')
    //}));

};