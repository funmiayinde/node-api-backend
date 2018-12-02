import User from '../../api/user/user.model';
import AppLogger from "../api/app.logger";

/**
 * @class Seeder
 **/

export default class SetUpSeeders {

	/**
	 * @param {Object} options object
	 * @constructor
	 * */
	constructor(options = {count: 5}) {
		process.env.NODE_ENV = 'seeding';
		AppLogger.logger('info').info('Begin Setup Seed');
		this.options = options;
		this.seedUser = this.seedUser.bind(this);

	}


	async seedUser() {
		try {
			await User.deleteMany({}).exec();

			for (let i = 0; i <= 5; i++) {
				const user = new User({
					username: `funmiayinde${i + 1}@gmail.com`,
					password: 'password'
				});
				AppLogger.logger("info").info("user: " + user);
				this.user = await user.save();
			}

		} catch (e) {
			AppLogger.logger('error').error(e);
		}
	}
}
