/**
 * User Schema
 * */
import bcypt from 'bcrypt-nodejs';
import validations from './user.validation';
import BaseSchema from '../../core/api/base.model';
import mongoose from 'mongoose';

const UserModel = new BaseSchema({
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		select: false
	},
	avatar: {
		type: String
	}
}, {timestamp: true});


UserModel.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password'))
		return next();
	user.password = bcypt.hashSync(user.password);
	next();
});

/**
 * @param {String} password The password to compare against
 * @return {Boolean} The result of the comparison
 * */
UserModel.methods.comparePassword = function (password) {
	return bcypt.compareSync(password, this.password);
};

/**
 * @param {String} type
 * @param {Object} body
 * @return {Object} The validator object with specified rules
 **/
UserModel.static.validations = (type, body) => {
	return validations[type](body);
};

export default mongoose.model('User', UserModel, 'user');
export const User = mongoose.model('User', UserModel, 'user');
