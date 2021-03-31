import { Router } from 'express';
import * as jobCtrl from '../controllers/job.controllers';

const jobRouter = Router();

jobRouter.get('/completed', jobCtrl.getCompletedJobs);
jobRouter.put('/complete/:id', jobCtrl.completeJob);
jobRouter.get('/', jobCtrl.getJobs);
jobRouter.get('/:id', jobCtrl.getJob);
jobRouter.post('/', jobCtrl.createJob);
jobRouter.put('/:id', jobCtrl.updateJob);
jobRouter.delete('/:id', jobCtrl.deleteJob);

export default jobRouter;