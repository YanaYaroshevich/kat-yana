/**
 * Dependencies.
 * todo: refactor it, espessialy for external ang1.5 modules project adsales-wedge
 */
const requireDirectory = require('require-directory');

module.exports = function(server) {
	// Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space.
	// https://github.com/troygoode/node-require-directory
	const controller = requireDirectory(module, '../controllers');

	// Array of routes for Hapi
	const routeTable = [
		{
			method: 'GET',
			path: '/',
			config: controller.common.index
		},
		{
			method: 'GET',
			path: '/about',
			config: controller.common.index
		},
		{
			method: 'GET',
			path: '/{path*}',
			config: controller.common.dist
		}
	];
	return routeTable;
};
