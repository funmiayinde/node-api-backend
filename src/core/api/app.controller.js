import _ from 'underscore';
import BaseController from "./base.controller";
import QueryPaser from "./query.parser";
import AppProcessor from "./app.processor";
import lang from "../../lang";
import AppLogger from "./app.logger";
import {HTTP_CREATED} from "../../utils/status-codes";


/**
 * The App Controller class where other controller inherits or
 * overrides some pre defined and existing resources
 **/
class AppController extends BaseController {

	/**
	 * @param {Model} model The default model object
	 * for the controller . It will be required to create
	 * an instance of the controller
	 * @constructor
	 * */
	constructor(model) {
		super(model);
		this.create = this.create.bind(this);
	}

	/**
	 * @param {Object} req The request obj
	 * @param {Object} res The response obj
	 * @param {callback} next The callback to handle the next program
	 * @return {Object} res The res Object
	 * */
	async create(req, res, next) {
		const queryParser = new QueryPaser(Object.assign({}), req.query);
		const obj = await AppProcessor.prepareBodyObject(req);
		const validate = AppProcessor.validate(this.model, "create", obj, lang.get("error").inputs);
		if (validate) {
			return next(validate);
		}
		try {
			let object = new this.model(obj);
			object = await object.save();
			const response = await AppProcessor.getSimpleResponse(this.model, object, HTTP_CREATED, this.lang.create, queryParser);
			return res.status(HTTP_CREATED).json(response);
		} catch (e) {
			AppLogger.logger("error").error("err: " + e);
			console.log("error:", e);
		}
	}
}

export default AppController;
