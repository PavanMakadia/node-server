var controller = require('./health-controller');

module.exports = (app) => {
	app.get('/health', controller.health);

}