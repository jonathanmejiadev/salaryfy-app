import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controllers';
import { checkUserEmailExists } from '../middlewares/auth';
import { passportJwtGuard } from '../middlewares/auth-guard';
import { postRegisterUserValidation } from '../middlewares/validations';

const authRouter = Router();

authRouter.post('/register', [postRegisterUserValidation, checkUserEmailExists])//, authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/profile', passportJwtGuard, authCtrl.profile);

export default authRouter;