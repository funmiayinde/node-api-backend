'use strict';

import lang from "../../lang/index";
import AppLogger from "./app.logger";

/**
 * The Base controller class where other controller inherits or
 * overrides the pre-defined and existing properties
 **/
class BaseController {

	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 **/
	constructor(model) {
		if (new.target === BaseController) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}

		this.model = model;
		if (model) {
			// get the lang assign to the
			this.lang = lang.get(model.collection.collectionName);
		}
	}
}

export default BaseController;
