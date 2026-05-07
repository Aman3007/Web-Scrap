import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { asyncHandler, successResponse } from '../utils/helpers.js';

const cookieOptions = {
  httpOnly: true,
  secure: true, 
  sameSite: 'none', 
  maxAge: 7 * 24 * 60 * 60 * 1000, 
};


export const register = asyncHandler(async (req, res) => {
  console.log('[Auth] Register attempt:', req.body.email);
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('[Auth] Email already exists:', email);
    return res.status(409).json({ success: false, message: 'Email already registered.' });
  }

  console.log('[Auth] Creating user...');
  const user = await User.create({ name, email, password });
  console.log('[Auth] User created:', user._id);
  
  const token = generateToken(user._id);

  res.cookie('token', token, cookieOptions);

  return successResponse(res, 'Registration successful.', { user }, 201);
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = generateToken(user._id);
  const userData = user.toJSON();

  res.cookie('token', token, cookieOptions);

  return successResponse(res, 'Login successful.', { user: userData });
});


export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  return successResponse(res, 'Logged out successfully.');
});


export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('bookmarks');
  return successResponse(res, 'User fetched.', { user });
});
