import Story from '../models/Story.js';
import { scrapeHackerNews } from './hnScraper.js';


export const runScraper = async (limit = 10) => {
  const stats = { saved: 0, skipped: 0, errors: 0 };

  console.log(`[Scraper] Starting — target: top ${limit} stories from Hacker News`);

  let stories;
  try {
    stories = await scrapeHackerNews(limit);
    console.log(`[Scraper] Fetched ${stories.length} stories from HN`);
  } catch (err) {
    console.error(`[Scraper] Fetch failed: ${err.message}`);
    throw err;
  }

  for (const story of stories) {
    try {
      const filter = story.hackerNewsId
        ? { hackerNewsId: story.hackerNewsId }
        : { title: story.title };

      await Story.findOneAndUpdate(filter, story, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      stats.saved++;
    } catch (err) {
      if (err.code === 11000) {
        stats.skipped++;
      } else {
        console.warn(`[Scraper] Failed to upsert "${story.title}": ${err.message}`);
        stats.errors++;
      }
    }
  }

  console.log(
    `[Scraper] Done — saved: ${stats.saved}, skipped: ${stats.skipped}, errors: ${stats.errors}`
  );
  return stats;
};
