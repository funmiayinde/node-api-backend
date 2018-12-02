import Q from 'q';
import errorHandler from '../middlewares/app/error-handler';


export default (app) => {
	app.use(errorHandler);
	return Q.resolve(app);
}
