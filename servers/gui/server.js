// Set Default Variables
const Hapi = require('hapi')                    // Server Plugin
    , settings = require('./config/settings')   // List of Predefult Paths
    , config = require('../../config');         // Context Variables (Ports, DB Credentianals)

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({host: config.gui.host, port: config.gui.port, labels: ['web'], routes: {cors: true, log: true}});

require('http').globalAgent.maxSockets = 35;
require('https').globalAgent.maxSockets = 35;

// Hapi Server Plugins (Auth, DB Objects, Assets, etc)
require('./config/plugins')(server, config);
// Register Server Authentication
// require('./auth_validation');
// require('./auth/authentication')(server, config);
// Require the routes and pass the server object.
var routes = require('./config/routes')(server);

// Register Plugins:
// Vision = Store HTML plus swig ( Templater )
// Inert Constant Content Hash
server.register([require('inert')], function (err) {
    if (err) throw err;

    // Add the server routes
    server.route(routes);

    if (!module.parent) {
        server.start(function () {
            var message = 'GUI started at: ' + server.info.uri;
            console.log(message);
        });
    }
});

module.exports = server;
