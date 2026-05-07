import { Router } from 'express';
import {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
} from '../controllers/storyController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getStories);
router.get('/bookmarks', protect, getBookmarks);  
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;
