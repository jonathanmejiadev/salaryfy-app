import { Router } from 'express';
import * as jobCtrl from '../controllers/job.controllers';

const jobRouter = Router();

jobRouter.get('/completed', jobCtrl.getCompletedJobs);
jobRouter.put('/complete/:id', jobCtrl.completeJob);
jobRouter.get('/:id', jobCtrl.getJob);
jobRouter.get('/', jobCtrl.getJobs);
jobRouter.put('/:id', jobCtrl.updateJob);
jobRouter.post('/', jobCtrl.createJob);
jobRouter.delete('/:id', jobCtrl.deleteJob);

export default jobRouter;