'use strict';

import BaseController from '../../core/api/base.controller';
import AppError from '../../core/api/app.error';
import {HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK} from '../../utils/status-codes';
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
		console.log('req obj:', obj);
		try {
			const user = await this.model.findOne({email: obj.email}).select("+password");
			const comPassword = user.comparePassword(obj.password);
			if (!comPassword) {
				const error = new AppError(lang.get('auth').wrong_password,HTTP_BAD_REQUEST);
				return next(error);
			}

			const meta = AppResponse.getSuccess();
			meta.token = signToken({userId: user._id});
			user.password = undefined;
			const response = await AppProcessor.getResponseObject(this.model, user, HTTP_CREATED, meta, '');
			return res.status(HTTP_OK).json(response);
		} catch (e) {
			AppLogger.logger("error").error(e);
			return next(e);
		}
	}
}

export default AuthController;
