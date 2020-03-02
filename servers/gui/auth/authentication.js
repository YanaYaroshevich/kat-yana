const AuthValidation = require('../auth_validation');
//authentication
module.exports = function(server, config) {

	var privateKey = config.AuthKey.privateKey;
	var ttl = config.AuthKey.tokenExpiry;
    var Moment      = require('moment');

	// bring your own validation function
	var validate_session = function (decoded, request, callback) {
	    console.log(" - - - - - - - decoded token:");
	    console.log(decoded);
	    console.log(" - - - - - - - request info:");
	    console.log(request.info);
	    console.log(" - - - - - - - - user agent:");
	    console.log(request.headers['user-agent']);

	    // Check token timestamp
	    var diff = Moment().diff(Moment(decoded.iat * 1000));
	    if (diff > ttl) {
	        console.log('ERROR: Token Expired for ' +diff/30000 + ' mins. Limit Time '+ ttl/30000 + 'mins.');
	        return callback(null, false);
	    }

	    callback(null, true, decoded);
	};

	//Register Authentication Shema JWT Basic
	server.register([
	      {
	          register: require("hapi-auth-jwt2")
	      }
	  ], function(err) {
	      if (err) throw err;
	  });

    //Register Auth Schemas
	server.auth.strategy('jwt', 'jwt', {
	    key: privateKey
	  , validateFunc: AuthValidation.validate
	  , verifyOptions: { ignoreExpiration: true }
	});

	//Adding Schema with Redirect to Home Page
	server.auth.scheme("jwt_login", function (server, options) {
	    return {
	        authenticate: function (request, reply) {
	            server.auth.test("jwt", request, function (err, credentials) {
	                if (err) {
	                	console.log('Redirect to Login Page...');
	                	console.log('Authentication JWT Exception:' + err + '\n Redirect to Login Page...');
	                    reply.redirect("/");
	                }
	                else {
	                	console.log('Authentication JWT: OK.' + err);
	                	console.log('credentials', credentials);
	                    reply.continue({ credentials: credentials });
	                }
	            });
	        }
	    };
	});


	//Register Auth Schemas
	server.auth.strategy('WebSessions', 'jwt_login', {});


	// Apply Default Schema
	server.auth.default('WebSessions');
};
