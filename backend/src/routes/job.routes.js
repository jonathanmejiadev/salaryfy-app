import { Router } from 'express';
import * as jobCtrl from '../controllers/job.controllers';

const router = Router();

router.get('/completed', jobCtrl.getCompletedJobs);
router.put('/complete/:id', jobCtrl.completeJob);
router.get('/', jobCtrl.getJobs);
router.get('/:id', jobCtrl.getJob);
router.post('/', jobCtrl.createJob);
router.put('/:id', jobCtrl.updateJob);
router.delete('/:id', jobCtrl.deleteJob);

export default router;