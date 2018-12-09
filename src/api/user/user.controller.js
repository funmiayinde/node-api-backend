import _ from 'underscore';
import AppController from '../../core/api/app.controller';
import AppError from "../../core/api/app.error";
import lang from "../../lang";
import {HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK} from "../../utils/status-codes";
import fs from 'fs';
import {upload, validate} from "../../utils/helper";
import AppResponse from "../../core/api/app.response";
import {applyPatch, applyOperation,applyReducer} from 'fast-json-patch';
import Joi from 'joi';


/**
 * The User controller which extends AppController
 **/
class UserController extends AppController {

	/**
	 * @param {Model} name The name property is inherited
	 * from parent
	 **/
	constructor(name) {
		super(name);
	}

	/**
	 * @param {Object} req The request obj
	 * @param {Object} res The response obj
	 * @param {callback} next The callback to handle the next program
	 * @return {Object} res The res Object
	 * */
	create(req, res, next) {
		throw new Error("Operation failed!");
	}

	/**
	 * @param {Object} req The request obj
	 * @param {Object} res The response Obj
	 * @param {callback} next The callback to handle the next program
	 * @return {Object} res The response object
	 **/
	async uploadImage(req, res, next) {
		if (!req.file || _.isEmpty(req.file)) {
			const error = new AppError(lang.get('file').no_file_to_upload, HTTP_BAD_REQUEST);
			return next(error);
		}
		const file = req.file.path;
		upload(file).then(result => {
			try {
				const meta = AppResponse.getSuccess();
				// meta.message = this.lang.file;
				meta.message = 'Successfully Uploaded';
				return res.status(HTTP_OK).json(AppResponse.format(meta, {image_url: result.url}));
			} catch (e) {
				return next(e);
			}
		}).catch(err => {
			if (err) {
				const error = new AppError(lang.get("error").upload_error, HTTP_INTERNAL_SERVER_ERROR);
				return next(error);
			}
		});
	}

	/**
	 * @param {Object} req The request obj
	 * @param {Object} res The response Obj
	 * @param {callback} next The callback to handle the next program
	 * @return {Object} res The response object
	 **/
	async jsonPatch(req, res, next) {
		let document = req.body.document;
		let patch = req.body.patch;
		document = applyPatch(document, patch).newDocument;
		return res.json({document: document});
	}
}

export default UserController;
