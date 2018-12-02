import Validator from 'validatorjs';
import config from 'config';

/**
 * The user validation clase
 * */
export default {

	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with specified rules
	 **/
	login: (obj) => {
		const rules = {
			username: 'required|string',
			password: 'required|string'
		};
		const validator = new Validator(obj, rules);
		return {
			validator,
			validated: validator.passes()
		};
	}
}
