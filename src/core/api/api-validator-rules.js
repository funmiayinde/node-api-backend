'use strict';
import Validator from 'validatorjs';

/**
 * The UserValidation class
 * */
export class ApiValidatorRule {

    /**
     * @param {object} obj the object to perform validation on
     * @param {Validator} the validator object with specified data
     * */
    static login(obj) {
        const rules = {
            'username': 'required',
            'password' : 'required'
        };
        return new Validator(obj, rules);
    }


}
