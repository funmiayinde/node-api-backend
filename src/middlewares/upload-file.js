import multer from 'multer';

/**
 * @class
 * */
class UploadFile {


	/**
	 * @constructor
	 * @param {Object} options The Object options
	 **/
	constructor(options = {type: 'media', size: 1, folder: 'media', limit: 100000000}) {
		this.type = options.type;
		this.size = options.size;
		this.folder = options.folder;
		this.limit = options.limit;
	}

	/**
	 * @function
	 * */
	getMulter() {
		return multer({
			storage: multer.diskStorage({
				destination: function (req, file, cb) {
					// cb(null, this.folder);
					cb(null, './uploads/');
				},
				filename: function (req, file, cb) {
					// console.log("multer file:",file);
					cb(null, file.originalname)
				},
				limits: {
					fileSize: this.limit
				}
			})
		});
	}

	/**
	 * @function
	 * */
	init() {
		let middlware = this.getMulter().array(this.type, this.size);
		// if (this.size > 1) {
		// 	middlware = this.getMulter().array(this.type, this.size);
		// }
		return middlware;
	}
}

export default UploadFile;
