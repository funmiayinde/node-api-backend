import _ from 'underscore';
import User from './user.model';
import AppError from '../../core/api/app.error';
import {HTTP_NOT_FOUND, HTTP_UNAUTHORIZED} from '../../utils/status-codes';
import lang from '../../lang';
/**
 * User Processor
 * */
export class UserProcessor {


	/**
	 * @param {Object} user The user property
	 * @param {Object} object The object properties
	 * @return {Object} return the api error if user cannot verified
	 */
	static async userCanLogin(user, object) {
		if (!user) {
			return new AppError(lang.get("auth").auth_failed, HTTP_NOT_FOUND);
		}
		let authenticated = object.password && user.password && user.comparePassword(object.password);
		if (!authenticated) {
			return new AppError(lang.get("auth").wrong_password, HTTP_UNAUTHORIZED);
		}
		user.password = undefined;
	}


}

export default UserProcessor;
