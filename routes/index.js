module.exports = (app) => {

    //require('../User/index')(app);

    // set response for favicon.ico
    app.get('/favicon.ico', (req, res) => res.status(204));

    // Health Check API
    require('../api/health/index')(app);
}