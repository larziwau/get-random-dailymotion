import axios from 'axios';
import * as cheerio from 'cheerio';

const DAILYMOTION_TRENDING_URL = 'https://www.dailymotion.com/';

async function fetchRandomVideo() {
  try {
    const { data } = await axios.get(DAILYMOTION_TRENDING_URL);
    const $ = cheerio.load(data);
    
    const videoLinks = $('a')
      .map((_, element) => {
        const href = $(element).attr('href');
        return href && href.startsWith('/video/') ? `https://www.dailymotion.com${href}` : null;
      })
      .get()
      .filter(Boolean);

    if (videoLinks.length > 0) {
      const randomVideoUrl = videoLinks[Math.floor(Math.random() * videoLinks.length)];
      console.log(`Random Video URL: ${randomVideoUrl}`);
    } else {
      console.log('No video links found on the page.');
    }
  } catch (error) {
    console.error('Error fetching or scraping the Dailymotion page:', error.message);
  }
}

fetchRandomVideo();
