var jwt = require('jsonwebtoken');
var config = require('../../../config');
var Moment = require('moment');
var extract = require('hapi-auth-jwt2/lib/extract');    // extract token from Auth Header, URL or Coookie
const Boom = require('boom');

var internals = {};

module.exports.register = function (server, options, next) {
    internals.initialize();
    next();
};

module.exports.validate = function (decoded, request, callback) {
    internals.validate(decoded, request, callback);
};

internals.initialize = function () {
};

internals.validate = function (decoded, request, callback) {
    var token = extract(request, {}); // extract token from Header, Cookie or Query param
    var userInfo = internals.verify(token);
    if (userInfo) {
        var access = false;
        var currScope = '';
        // if the route has own scope - get it, otherwise - use default scope 'user'.
        var routeScope = (request.route.settings
        && request.route.settings.auth
        && request.route.settings.auth.access
        && request.route.settings.auth.access[0]
        && request.route.settings.auth.access[0].scope) ? request.route.settings.auth.access[0].scope.selection : ['admin'];

        if (!request.user) {
            request.user = {};
            request.user.logged_time = new Date().getTime();
            request.user.login = userInfo.login;
            request.user.email = userInfo.email;
            request.user.first_name = userInfo.first_name;
            request.user.last_name = userInfo.last_name;
            request.user.user_type = userInfo.role_type;
            request.user.roles = userInfo.roles;


            function findRoles(elem) {
                return (userInfo.roles.indexOf(elem) != -1);
            };

            var filteredRoles = routeScope.find(findRoles);
            if (filteredRoles && filteredRoles.length > 0) {
                access = true;
                currScope = filteredRoles.toString();
            }
        }

        var event = {};
        event.user = request.user;
        event.method = request.method;
        event.path = request.path;
        event.host = request.headers.host;

        var ttl = config.AuthKey.tokenExpiry;
        var diff = Moment().diff(Moment(decoded.iat * 1000));
        if (diff > ttl) {
            var errorMessage = 'ERROR: Token Expired for ' + diff / 30000 + ' mins. Limit Time ' + ttl / 30000 + 'mins.';
            event.message = errorMessage + ' Requested URL: ' + request.path;
            var error = new Error(event.message);
            console.log(error);
            return callback(Boom.unauthorized(errorMessage), true);
        }

        if(currScope.length == 0){
            event.message = "Invalid credentials to access: " + request.path;
        }
        return callback(null, access, {scope: currScope});
    }
    else {
        return callback(null, false);
    }
};

internals.verify = function (token) {
    var valid = null;
    try {
        valid = jwt.verify(token, config.AuthKey.privateKey);
    } catch (exc) {
        valid = false;
        console.error('Token verification exception: ', exc);
    }
    return valid;
};


module.exports.register.attributes = {
    pkg: require('./package.json')
};