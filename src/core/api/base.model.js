'use strict';

import {Schema} from "mongoose";
import Validator from 'validatorjs';
import util  from 'util';
import validations from './base.validation';

/**
 * The Base types object where other types inherits or
 * overrides pre defined and static methods
 */
function BaseSchema(...args) {
	Schema.apply(this, args);

	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with specified rules.
	 * */
	this.statics.validateCreate = (obj = {}) => {
		let rules = {};
		return new Validator(obj, rules);
	};

	/**
	 * @param {String} type
	 * @param {Object} body
	 * @return {Object} The validator object with specified rules
	 * */
	this.statics.validations = (type, body) => {
		return validations[type](body);
	}
}

util.inherits(BaseSchema, Schema);

export default BaseSchema;
