import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import storyRoutes from './src/routes/storyRoutes.js';
import scraperRoutes from './src/routes/scraperRoutes.js';
import bookmarkRoutes from './src/routes/bookmarkRoutes.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';
import { runScraper } from './src/scraper/scraperService.js';

const app = express();


app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api', limiter);


app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}


app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running.', timestamp: new Date().toISOString() });
});


app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scraperRoutes);
app.use('/api/bookmarks', bookmarkRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
  });

  
  runScraper(10).catch((err) =>
    console.error('[Startup Scraper] Failed:', err.message)
  );

  
  cron.schedule('*/30 * * * *', async () => {
    console.log('[Cron] Running scheduled scrape...');
    runScraper(10).catch((err) =>
      console.error('[Cron Scraper] Failed:', err.message)
    );
  });
};

start();

export default app;
