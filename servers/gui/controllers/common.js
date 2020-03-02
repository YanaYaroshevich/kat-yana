// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
	index: {
		handler: function(request, reply) {
			return reply.file('./public/dist/index.html');
		},
		auth: false
	},
	assets: {
		handler: {
			directory: {
				path: ['./public/dist/assets/images']
			}
		},
		app: {
			name: '/assets/images'
		},
		auth: false
	},
	config: {
		handler: {
			directory: {
				path: ['./servers/gui/CommonResourses/ddm']
			}
		},
		app: {
			name: './servers/gui/CommonResourses/ddm'
		},
		auth: false
	},
	dist: {
		handler: {
			directory: {
				path: './public/dist/'
			}
		},
		app: {
			name: '/'
		},
		auth: false
	}
};
