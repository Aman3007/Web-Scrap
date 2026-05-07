import axios from 'axios';
import * as cheerio from 'cheerio';

const HN_URL = 'https://news.ycombinator.com';


export const parseStoryRow = ($, titleRow, subRow) => {
  
  const titleAnchor = titleRow.find('.titleline > a').first();
  const title = titleAnchor.text().trim();
  let url = titleAnchor.attr('href') || '';
  if (url.startsWith('item?')) url = `${HN_URL}/${url}`;

  
  const hackerNewsId = titleRow.find('.athing').attr('id') || titleRow.attr('id') || null;

  
  const points = parseInt(subRow.find('.score').text()) || 0;
  const author = subRow.find('.hnuser').text().trim() || 'unknown';
  const postedAt = subRow.find('.age').attr('title') || subRow.find('.age a').text().trim() || '';
  const commentText = subRow.find('a').last().text().trim();
  const commentCount = parseInt(commentText) || 0;

  return { title, url, points, author, postedAt, hackerNewsId, commentCount };
};


export const scrapeHackerNews = async (limit = 10) => {
  const response = await axios.get(HN_URL, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; HN-Scraper/1.0)',
    },
  });

  const $ = cheerio.load(response.data);
  const stories = [];

  
  const atingRows = $('tr.athing');

  atingRows.each((i, el) => {
    if (stories.length >= limit) return false;
    try {
      const titleRow = $(el);
      const subRow = titleRow.next();
      const parsed = parseStoryRow($, titleRow, subRow);
      if (parsed.title) stories.push(parsed);
    } catch (err) {
      console.warn(`[Scraper] Skipping row ${i}: ${err.message}`);
    }
  });

  return stories;
};
