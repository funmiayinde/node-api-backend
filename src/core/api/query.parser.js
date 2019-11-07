'use strict';
import _ from 'underscore';
import AppLogger from './app.logger';

/**
 * The QueryParser class
 * */
class QueryPaser {
	/**
     * @constructor
     * @param {String} query This is a query object of the request
     * */
	constructor(query) {
		const excluded = ['per_page', 'limit', 'page'];
		this.obj = _.pick(query, ...excluded);
		if (query.population) {
			try {
				this._population = JSON.parse(query.population);
			} catch (e) {
				AppLogger.logger('error').error(e);
			}
		}

		if (query.nested) {
			try {
				const nested = JSON.parse(query.nested);
				for (const key in nested) {
					if (nested.hasOwnProperty(key)) {
						query[key] = nested[key];
					}
				}
			} catch (e) {
				AppLogger.logger('error').error(e);
			}
		}

		if (query.selection) {
			try {
				this._selection = JSON.parse(query.selection).join(' ');
			} catch (e) {
				AppLogger.logger('error').error(e);
			}
		}

		if (query.includes) {
			const object = query.includes;
			if (object['key'] && object['value']) {
				query[object['key']] = {$in: object['value']};
			}
		}

		if (query.search) {
			this._search = query.search;
		}
		if (query.sort) {
			this._sort = query.sort;
		}
		query = _.omit(query, ...excluded);
		query = _.extend(query, {deleted: false});
		this.query = query;
		Object.assign(this, query);
	}

	/**
     * @return {Object} get the parsed array
     * */
	get getAll() {
		return this.obj['all'];
	}

	/**
     * @return {Object} query set the parsed array
     * */
	set query(query) {
		this.query = query;
	}

	/**
     * @return {Object} get the population object for the query
     * */
	get population() {
		if (this._population) {
			return this._population;
		}
		return [];
	}

	/**
     * @return {Object} get the sort object for query
     * */
	get sort() {
		if (this._sort) {
			return this._sort;
		}
		return '-created_at';
	}

	/**
     * @return {Object} get the selection object for query
     * */
	get selection() {
		if (this._selection) {
			return this._selection;
		}
		return '';
	}

	/**
     * @return {Object} get the search object for query
     * */
	get shouldSearch() {
		if (this._search) {
			this._search = true;
		}
		return false;
	}

	/**
     * @return {Object} get the value for the whole data status
     * */
	get all() {
		return this.all;
	}
}

export default QueryPaser;
