import {Router} from 'express';
import User from './user.model';
import authToken from '../../middlewares/app/auth-token';
import UserController from "./user.controller";
import UploadFile from '../../middlewares/upload-file';


const router = Router();
const userCtrl = new UserController(User);

router.use(authToken);
router.post("/users/upload", new UploadFile({
	type: 'file',
	folder: './uploads'
}).init(), userCtrl.uploadImage);

export default router;
