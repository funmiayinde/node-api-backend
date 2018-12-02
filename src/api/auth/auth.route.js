import {Router} from 'express';
import User from '../user/user.model';
import authToken from '../../middlewares/app/auth-token';
import AuthController from './auth.controller';


const router = Router();
const authCtrl = new AuthController(User);

router.use(authToken);
router.post("/login", authCtrl.login);

export default router;
