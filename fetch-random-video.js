import axios from 'axios';
import * as cheerio from 'cheerio';

const DAILYMOTION_TRENDING_URL = 'https://www.dailymotion.com/';

async function fetchRandomVideo() {
  try {
    const response = await axios.get(DAILYMOTION_TRENDING_URL);
    const $ = cheerio.load(response.data);
    const videoLinks = [];
    
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('/video/')) {
        videoLinks.push('https://www.dailymotion.com' + href);
      }
    });

    if (videoLinks.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoLinks.length);
      const randomVideoUrl = videoLinks[randomIndex];
      console.log(`Random Video URL: ${randomVideoUrl}`);
    } else {
      console.log('No video links found.');
    }
  } catch (error) {
    console.error('Error fetching or scraping the Dailymotion page:', error);
  }
}

fetchRandomVideo();
