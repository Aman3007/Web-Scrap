import { Router } from 'express';
import { triggerScrape } from '../controllers/scraperController.js';

const router = Router();

router.post('/', triggerScrape);

export default router;
