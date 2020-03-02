const runSequence = require('run-sequence');
const config = require('./gui_gulpfile_config');
const exec = require('child_process').exec;
const mkdir = require('mkdirp');
const gulp = require('gulp');
const path = require('path');
const del = require('del');

let env = 'dev';
const projectName = 'secondpartymedia';

gulp.task('build', (callback) => {
	runSequence('clean:build', 'build-ng2-project', 'gui-copy-files', 'copy-ng2-build', 'gui-copy-core', 'clean:dist', callback);
});


gulp.task('build:prod', (callback) => {
	env = 'prod';
	runSequence('build', callback);
});

gulp.task('build:dev', (callback) => {
	env = 'dev';
	runSequence('build', callback);
});

gulp.task('build:uat', (callback) => {
	env = 'uat';
	runSequence('build', callback);
});

gulp.task('clean:build', () => {
	del.sync(config.paths.server_gui_build, { force: true })
});

// Not sure this is the right way to delete this folder
gulp.task('clean:dist', () => {
	del.sync(`${config.paths.server_gui}/${projectName}/dist`, { force: true })
});

gulp.task('build-ng2-project', (callback) => {
	const command = `npm --prefix ${config.paths.server_gui}/${projectName} run build-${env}`;
	return exec(command, { maxBuffer: 1024 * 1000 }, (err, stdout, stderr) => {
		callback(err);
	});
});

gulp.task('gui-copy-files', ['gui-create-output-dir'], (cb) => {
	const dest = `${config.paths.server_gui_build}/servers/gui`;

	// Public
	gulp.src(`${config.paths.server_gui}/auth_validation/*.*`).pipe(gulp.dest(`${dest}/auth_validation`));
	gulp.src(`${config.paths.server_gui}/controllers/*.*`).pipe(gulp.dest(`${dest}/controllers`));
	gulp.src(`${config.paths.server_gui}/config/*.*`).pipe(gulp.dest(`${dest}/config`));
	gulp.src(`${config.paths.server_gui}/auth/*.*`).pipe(gulp.dest(`${dest}/auth`));

	gulp.src(`${config.paths.server_gui}/server.js`).pipe(gulp.dest(dest));
	gulp.src(`${config.paths.server_gui}/config.js`).pipe(gulp.dest(dest));

	// Root
	gulp.src(`${config.paths.server_gui_build_resources}/**/*`)
		.pipe(gulp.dest(config.paths.server_gui_build));
	gulp.src(`${config.paths.server_gui_build_resources}/.gitignore`)
		.pipe(gulp.dest(config.paths.server_gui_build));
	gulp.src(`${config.paths.server_gui_build_resources}/images/.dockerignore`)
		.pipe(gulp.dest(`${config.paths.server_gui_build}/images`));

	// Api config
	gulp.src([`${config.paths.server_gui_api_config}/*.*`])
		.pipe(gulp.dest(`${dest}/CommonResourses/${projectName}`));

	return cb(null);
});

gulp.task('gui-create-output-dir', ['gui-clean-api'], (cb) => {
	mkdir(path.join(process.cwd(), config.paths.server_gui_build), (err) => {
		if (err) {
			console.error('Cannot create output directory to build the "gui" project!', err);
			return cb(err);
		}

		return cb(null);
	});
});

gulp.task('gui-clean-api', (cb) => {
	del.sync([config.paths.server_gui_build], { force: true });
	return cb(null);
});

gulp.task('copy-ng2-build', () =>
	gulp.src([
		`${config.paths.server_gui}/${projectName}/dist/**/*.*`,
		`!${config.paths.server_gui}/${projectName}/dist/CommonResourses/**/*.*`
	]).pipe(gulp.dest(`${config.paths.server_gui_build}/public/dist`))
);

gulp.task('gui-copy-core', (cb) => {
	gulp.src([
		`${config.paths.server_gui}/${projectName}/node_modules/amc-login-module/dist/login/**/*`,
		`!${config.paths.server_gui}/${projectName}/node_modules/amc-login-module/dist/login/CommonResourses/**/*`
	]).pipe(gulp.dest(`${config.paths.server_gui_build}/public/dist/login`));

	// gulp.src(`${config.paths.server_gui}/${projectName}/node_modules/amc-login-module/CommonResourses/config/**/*`)
	// .pipe(gulp.dest(`${config.paths.server_gui_build}/servers/gui/CommonResourses/`)

	// todo: correct?
	gulp.src([
		`${config.paths.server_gui_api_config}/api.context.json`,
		`${config.paths.server_gui}/${projectName}/node_modules/amc-login-module/CommonResourses/config/login/api.settings.json`])
		.pipe(gulp.dest(`${config.paths.server_gui_build}/servers/gui/CommonResourses/login`));

	return cb(null);
});
