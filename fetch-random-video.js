const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function getRandomDailymotionVideo() {
    const response = await fetch('https://www.dailymotion.com');
    const body = await response.text();

    const $ = cheerio.load(body);

    const videoUrls = [];
    $('a[href^="/video/"]').each((i, element) => {
        const url = 'https://www.dailymotion.com' + $(element).attr('href');
        videoUrls.push(url);
    });

    const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    return randomVideoUrl;
}

getRandomDailymotionVideo()
    .then((videoUrl) => {
        console.log('Random Dailymotion Video URL:', videoUrl);
    })
    .catch((error) => {
        console.error('Error fetching random video:', error);
    });
