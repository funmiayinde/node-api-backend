import jwt from 'jsonwebtoken';
import config from 'config';
import cloudinary from 'cloudinary';
import Q from 'q';
import {applyOperation} from 'fast-json-patch';
import _ from 'lodash';
import Joi from 'joi';
import AppLogger from '../core/api/app.logger';

cloudinary.config({
	cloud_name: config.get('cloudinary.cloud_name'),
	api_key: config.get('cloudinary.api_key'),
	api_secret: config.get('cloudinary.api_secret')
});

/**
 * @param {Object} obj the Obj to sign
 * @return {Object} The signed object
 * */
export const signToken = (obj) => {
	return jwt.sign(obj, config.get('auth_token.secret'), {expiresIn: config.get('auth_token.expiresIn')});
};


/**
 * @param {Object} file The obj to upload
 * @return {Promise}
 **/
export const uploadFile = (file) => {
	let uploadedFile = [];
	return new Promise(async (resolve, reject) => {
		if (file instanceof Array) {
			for (let i = 0; i < file.length; i++) {
				cloudinary.v2.uploader.upload(file[i].path, {width: 50, height: 50}, (err, res) => {
					if (file.length === uploadFile.length) {
						console.log('upload file res:', res);
						resolve(res);
					} else if (res) {
						uploadedFile.push(res.url);
					} else {
						console.log('upload file error:', err);
						reject(err);
					}
				});
			}
		} else {
			cloudinary.v2.uploader.upload(file.path, {width: 50, height: 50}, (err, res) => {
				if (file.length === uploadFile.length) {
					console.log('upload file res:', res);
					resolve(res);
				} else {
					console.log('upload file err:', err);
					reject(err);
				}
			});
		}
	}).then((result) => result)
		.catch((err) => err);
};


/**
 * @param {Object} file The obj to upload
 * @return {Promise}
 **/
export const upload = (file) => {
	return new Q.Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(file, {width: 50, height: 50}, (err, res) => {
			if (err) {
				console.log('cloudinary err:', err);
				reject(err);
			} else {
				console.log('cloudinary res:', res);
				return resolve(res.url);
			}
		});
	});
};

/**
 * @param {Object} obj The Object to patch
 * @param {Object} schema The Object to apply patch to
 * @param {Object} patch The Object to for the patch
 *
 * */
export const validate = (obj, schema, patch) => {
	let iterationObj = _.cloneDeep(obj);
	for (let i = 0; i < patch.length; i++) {
		let p = patch[i];

		console.log('p', p);
		// keep a copy before this round of patching so
		// we can clean and compare it later
		let cleanUnpatchObj = cleanObj(_.cloneDeep(iterationObj), schema);
		applyOperation(iterationObj, [p]);

		// clean a copy of the iterationObj
		let cleanPatchObj = cleanObj(_.cloneDeep(iterationObj), schema);

		/*
		* Now patch the object that was:
		* * cleaned (not patched this iteration)
		*
		* It should match the object that was:
		* patched and cleaned
		* */
		let patchedCleanObj = _.cloneDeep(cleanUnpatchObj);
		fastJsonPath.apply(patchedCleanObj, [p]);

		// Delete case:
		// (clean obj) and (clean obj and apply patch) should be different
		let deleteComparisonDiff = fastJsonPath.compare(cleanUnpatchObj, patchedCleanObj);
		let patchedHadNoEffect = (deleteComparisonDiff.length === 0);
		if (patchedHadNoEffect) {
			if (p.op === 'remove') {
				throw new Error('deleted protected field or patch had no effect ');
			} else {
				AppLogger.logger('warn').warn('Patch ' + JSON.stringify(p) + ' had no effect');
			}
		}

		// compare the two cleaned object
		let compareDifferent = fastJsonPath.compare(patchedCleanObj, cleanPatchObj);
		if (compareDifferent.length > 0) {
			throw new Error('Patch ' + JSON.stringify(p) + ' is illegal');
		}
	}
};

/**
 * @param {Object} obj
 * @param {Object} schema
 *@return the cleaned Object
 **/
function cleanObj(obj, schema) {
	// remove protected fields from provided object
	console.log('clean obj', obj);
	// console.log("clean schema", schema);
	return Joi.validate(obj, schema).value;
}


