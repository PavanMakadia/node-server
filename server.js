// Import required external node modules
process.chdir(__dirname);
var http = require('http');
var compression = require('compression')
var express = require('express');
var util = require('util');

var config = require('./config');
//var middlewares = require('./middlewares/index');
//var routes = require('./routes/index');
var logger = require('./utils/logger');

var app = express();
app.use(compression());

try {

    // set port and env.
    app.set('port', config.get('port'));
    app.set('env', config.get('env'));

    // setup middlewares
    //middlewares(app);
    // setup routes
    //routes(app);

    // start http server
    var server = http.createServer(app).listen(app.get('port'), () => {
        logger.info(util.format('Server with pid: %s listening on port: %s', process.pid, app.get('port')));
        logger.info(util.format('Environment: %s', app.get('env')));
    });

} catch (ex) {
    logger.error(util.format('Error: %j', ex.stack));
}