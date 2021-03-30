import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controllers';
import { checkUserEmailExists } from '../middlewares/auth';
import { passportJwtGuard } from '../middlewares/auth-guard';


const router = Router();

router.post('/register', checkUserEmailExists, authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/profile', passportJwtGuard, authCtrl.profile);

export default router;