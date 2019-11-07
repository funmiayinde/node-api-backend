import {Router} from 'express';
import User from './user.model';
import authToken from '../../middlewares/app/auth-token';
import UserController from './user.controller';
import UploadFile from '../../middlewares/upload-file';


const router = Router();
const userCtrl = new UserController(User);

router.use(authToken);
router.post('/users/upload', new UploadFile({
	type: 'files',
	folder: './uploads/ '
}).init(), userCtrl.uploadImage);

router.post('/users/patch/json', userCtrl.jsonPatch);

export default router;
