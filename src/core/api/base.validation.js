import Validator from 'validatorjs';


export default {

	/**
	 * @param {Object} body The object the validate
	 * @return {Object} Validator
	 * */
	create: (body) => {
		const rules = {};
		const validator = new Validator(body, rules);
		return {
			validator,
			validated: validator.passes()
		}
	}
}

