import Story from '../models/Story.js';
import User from '../models/User.js';
import { asyncHandler, successResponse } from '../utils/helpers.js';


export const getStories = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
  const search = req.query.search?.trim();

  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Story.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const stories = await Story.find(query)
    .sort({ points: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return successResponse(res, 'Stories fetched successfully.', stories, 200, {
    pagination: { total, page, limit, totalPages },
  });
});


export const getStoryById = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id).lean();
  if (!story) {
    return res.status(404).json({ success: false, message: 'Story not found.' });
  }
  return successResponse(res, 'Story fetched.', story);
});


export const toggleBookmark = asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const user = await User.findById(req.user._id);

  const story = await Story.findById(storyId);
  if (!story) {
    return res.status(404).json({ success: false, message: 'Story not found.' });
  }

  const isBookmarked = user.bookmarks.includes(storyId);
  if (isBookmarked) {
    user.bookmarks.pull(storyId);
  } else {
    user.bookmarks.addToSet(storyId);
  }
  await user.save();

  return successResponse(res, isBookmarked ? 'Bookmark removed.' : 'Story bookmarked.', {
    bookmarked: !isBookmarked,
    bookmarks: user.bookmarks,
  });
});


export const getBookmarks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('bookmarks').lean();
  return successResponse(res, 'Bookmarks fetched.', user.bookmarks);
});
