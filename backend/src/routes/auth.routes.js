import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controllers';
import { checkUserEmailExists } from '../middlewares/auth';
import { passportJwtGuard } from '../middlewares/authGuard';
import { postRegisterUserValidation } from '../middlewares/validations';

const authRouter = Router();

authRouter.post('/register', [postRegisterUserValidation, checkUserEmailExists], authCtrl.registerUser);
authRouter.post('/login', authCtrl.loginUser);
authRouter.get('/profile', passportJwtGuard, authCtrl.profile);

export default authRouter;