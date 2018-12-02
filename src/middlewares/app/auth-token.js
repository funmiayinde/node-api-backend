import jwt from 'jsonwebtoken';
import config from 'config';
import _ from 'underscore';
import {HTTP_METHODS} from '../../utils/request-methods';
import lang from '../../lang';
import {HTTP_UNAUTHORIZED} from '../../utils/status-codes';
import AppError from '../../core/api/app.error';


export const excluded = [
	{route: '', method: HTTP_METHODS.GET},
	{route: 'login', method: HTTP_METHODS.POST},
];

export default (req, res, next) => {
	const currentUrlPath = req.originalUrl.split('?')[0];
	const filtered = _.filter(excluded, (item) => {
		// const regex = new RegExp(`^/api/v[1-9]/[a-zA-Z]{2}/${item.route}$`);
		const regex = new RegExp(`${config.get('api.prefix')}${item.route}$`);
		return regex.test(currentUrlPath) && req.method.toLowerCase() === item.method;
	});

	if (filtered.length) return next();

	const token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		// verifies secret and checks up
		jwt.verify(token, config.get('auth_token.secret'), (err, decoded) => {
			if (err) {
				let message = '';
				if (err.name) {
					switch (err.name) {
						case 'TokenExpiredError':
							message = lang.get('error').token_expired;
							break;
						default:
							message = lang.get('error').token_auth_failed;
					}
				}
				const appError = new AppError(message, HTTP_UNAUTHORIZED, null, 2);
				return next(appError);
			} else {
				req.userId = decoded.userId;
				next();
			}
		});
	} else {
		const appError = new AppError(lang.get('error').not_auth_token, HTTP_UNAUTHORIZED);
		return next(appError);
	}
}
