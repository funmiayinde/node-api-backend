'use strict';

import BaseController from '../../core/api/base.controller';
import AppError from '../../core/api/app.error';
import {HTTP_CREATED, HTTP_OK} from '../../utils/status-codes';
import AppProcessor from '../../core/api/app.processor';
import lang from '../../lang';
import AppLogger from '../../core/api/app.logger';
import UserProcessor from '../user/user.processor';
import AppResponse from '../../core/api/app.response';
import {signToken} from '../../utils/helper';

/**
 * The Auth Controller
 * */
class AuthController extends BaseController {

	/**
	 * @param {Model} name The name property is inherited from the parent
	 * @constructor
	 * */
	constructor(name) {
		super(name);
		this.login = this.login.bind(this);
	}


	/**
	 * @param {Object} req The request Object
	 * @param {Object} res The response Object
	 * @param {callback} next The callback to the next program handler
	 * @return {Object} res The response Object
	 **/
	async login(req, res, next) {
		const obj = await AppProcessor.prepareBodyObject(req);
		// const validate = AppProcessor.validate(this.model, "login", obj, lang.get("error").inputs);
		// if (validate instanceof AppError) {
		// 	return next(validate);
		// }
		try {
			const user = await this.model.findOne({email: obj.email}).select("+password");
			console.log("user:", user);
			// const loginError = UserProcessor.userCanLogin(user, obj);
			const comPassword = user.comparePassword(obj.password);
			console.log('comPassword:', comPassword);
			if (!comPassword) {
				console.log('login error:', comPassword);
				// throw loginError;
			}
			const meta = AppResponse.getSuccess();
			meta.token = signToken({userId: user._id});
			user.password = undefined;
			const response = await AppProcessor.getResponseObject(this.model, user, HTTP_CREATED, meta, '');
			return res.status(HTTP_OK).json(response);
		} catch (e) {
			AppLogger.logger("error").error(e);
			console.log("error:", e);
			return next(e);
		}
	}
}

export default AuthController;
