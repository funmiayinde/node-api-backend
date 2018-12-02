import _ from 'underscore';
import config from 'config';

const language = config.get("lang");

/**
 * @param {Object} prop The property key to check
 * @return {Object} return property
 * */
function get(prop) {
	if (this.hasOwnProperty(prop))
		return this[prop];
	else
		throw new Error(`There's no property defined as ${prop} in your translations`)
}

const lang = {
	get
};

let obj = require(`./${language}.js`).default;
_.each(Object.getOwnPropertyNames(obj), (property) => {
	const prop = property;
	lang[prop] = Object.assign({}, obj[prop], {get});
});

export default lang;
