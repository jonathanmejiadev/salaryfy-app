import { Router } from 'express';
import { passportJwtGuard } from '../middlewares/auth-guard';
import authRoutes from './auth.routes';
import jobRoutes from './job.routes';

const router = Router();

//router.get('/', (req, res) => res.status(200).send('Salaryfy API'));
router.use('/', authRoutes);
router.use('/jobs', passportJwtGuard, jobRoutes);

export default router;