import config from 'config';
import auth from './auth/auth.route';
import user from './user/user.route';
import Q from 'q';
import AppError from "../core/api/app.error";
import lang from "../lang";
import {HTTP_NOT_FOUND} from "../utils/status-codes";
import AppLogger from "../core/api/app.logger";


const prefix = config.get("api.prefix");

/**
 * The routes will add all the application defined routes
 * @param {express} app The app is an instance of an express application
 * @return {Promise<void>}
 **/

export default (app) => {
	app.use(prefix, auth);
	app.use(prefix, user);

	app.use((req, res, next) => {
		const err = new Error("Not Found");
		err.status = 404;
		next(err);
	});

	app.use("*", (req, res, next) => {
		AppLogger.logger('info').info("all");
		const appError = new AppError(lang.get("error").resource_not_found, HTTP_NOT_FOUND);
		return next(appError);
	});
	return Q.resolve(app);
};
