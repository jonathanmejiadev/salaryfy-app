import { Router } from 'express';
import { passportJwtGuard } from '../middlewares/authGuard';
import authRoutes from './auth.routes';
import jobRoutes from './job.routes';

const indexRouter = Router();

indexRouter.use('/jobs', passportJwtGuard, jobRoutes);
indexRouter.use('/', authRoutes);

export default indexRouter;