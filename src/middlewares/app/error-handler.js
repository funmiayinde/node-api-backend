import MongooseError from 'mongoose/lib/error';
import config from 'config';
import AppError from "../../core/api/app.error";
import AppLogger from "../../core/api/app.logger";
import AppResponse from "../../core/api/app.response";


export default (error, req, res, next) => {

	const meta = {};
	if (error instanceof MongooseError) {
		const code = 503;
		meta.status_code = code;
		meta.error = {code, message: 'Some setup problems, try again'};
		meta.developer_message = error;

	} else if (error instanceof AppError) {
		const err = error.format();
		const code = err.code;
		meta.status_code = code;
		meta.error = {code, message: err.message};
		if (err.messages) {
			meta.messages = err.messages;
		}
		if (err.type) {
			meta.error_type = err.type;
		}
	} else {
		let code = 500;
		meta.status_code = code;
		meta.error = {code: code, message: 'A problem with our server, currently fixing , please try again'};
		meta.developer_message = error;
	}

	if (`${config.util.getEnv('NODE_ENV')}` !== 'production') {
		AppLogger.logger('error').error(">>>>>>>>>>: " + error);
	}
	return res.status(meta.status_code).json(AppResponse.format(meta));
};
