module.exports = function(server, config) {

    // Options to pass into the 'Good' plugin
    const goodOptions = {
        ops: {
            interval: 10000
        },
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ops: '*', response: '*', log: '*', error: '*'}]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    };

    //Basic Plugins
    server.register([
        {
            register: require("good"),
            options: goodOptions
        },
        {
            register: require("hapi-named-routes")
        },
        {
            register: require("hapi-cache-buster")
        }
    ], function(err) {
        if (err) throw err;
    });
};
