import mongoose from 'mongoose';
import Q from 'q';
import AppLogger from "../core/api/app.logger";
// import config from  'config';

export default config => {
	mongoose.Promise = Q.Promise;
	mongoose.connection.on('disconnected', () => {
		AppLogger.logger('info').info("Mongoose connection to mongodb shell disconnected");
	});

	return mongoose.connect(config.get('db.url'), {
		useCreateIndex: true,
		useNewUrlParser: true
	}).then(() => {
		AppLogger.logger('info').info('mongodb connected to a mongo shell');
		AppLogger.logger('info').info('mongo db url ', config.get("db.url"));
	}, err => {
		AppLogger.logger('Mongoose could not connect mongo shell');
		AppLogger.logger('debug').debug("mongoose error: " + err);
	})
}
