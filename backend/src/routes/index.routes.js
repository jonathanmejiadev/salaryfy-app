import { Router } from 'express';
import { passportJwtGuard } from '../middlewares/auth-guard';
import authRoutes from './auth.routes';
import jobRoutes from './job.routes';

const indexRouter = Router();

indexRouter.use('/', authRoutes);
indexRouter.use('/jobs', passportJwtGuard, jobRoutes);

export default indexRouter;