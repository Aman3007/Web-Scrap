import { runScraper } from '../scraper/scraperService.js';
import { asyncHandler, successResponse } from '../utils/helpers.js';


export const triggerScrape = asyncHandler(async (req, res) => {
  const stats = await runScraper(10);
  return successResponse(res, 'Scrape completed successfully.', stats, 200);
});
