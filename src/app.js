import http from 'http';
import config from 'config';
import routes from './api/index';
import mongooseConfig from './setup/mongoose';
import Q from 'q';
import apiVerison from './setup/api-version';
import expressConfig from './setup/express';
import AppLogger from "./core/api/app.logger";
import middlewareConfig from './setup/middleware';

/**
 * @author funmiayinde
 **/
export default mongooseConfig(config)
	.then(() => {
		return apiVerison(config);
	})
	.then(() => {
		return expressConfig;
	})
	.then((app) => {
		return routes(app);
	})
	.then((app) => {
		return middlewareConfig(app);
	})
	.then(async (app) => {
		app.set('port', config.get("app.port"));
		return Q.all([http.createServer(app), app]);
	})
	.spread((server, app) => {
		return Q.all([server.listen(config.get('app.port')), app]);
	})
	.spread((server, app) => {
		AppLogger.logger('info').info(`Application listening on ${config.get('app.baseUrl')}, Environment => ${config.util.getEnv('NODE_ENV')}`);
		return Q.resolve(app);
	}, err => {
		AppLogger.logger('error').error('There was an uncatch error');
		AppLogger.logger('error').error(err);
	});
