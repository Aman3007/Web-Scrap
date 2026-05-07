import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getBookmarks } from '../controllers/storyController.js';

const router = Router();

router.get('/', protect, getBookmarks);

export default router;
