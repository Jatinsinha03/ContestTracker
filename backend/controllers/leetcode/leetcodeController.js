const { setupPuppeteer } = require('../../utils/puppeteerSetup');

exports.fetchContests = async (req, res) => {
    try {
        const contests = await setupPuppeteer(async (page) => {
            await page.goto('https://leetcode.com/contest/', { waitUntil: 'networkidle2', timeout: 60000 });
            return await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.swiper-slide')).map(slide => {
                    const titleElement = slide.querySelector('.font-medium');
                    const timeElement = slide.querySelector('.text-\\[14px\\].leading-\\[22px\\].text-label-2.dark\\:text-dark-label-2');
                    const linkElement = slide.querySelector('a');
                    const imageUrl = slide.querySelector('img').src;

                    return {
                        title: titleElement ? titleElement.innerText.trim() : 'No title found',
                        startingTime: timeElement ? timeElement.innerText.trim() : 'No starting time info',
                        link: linkElement ? linkElement.href : 'No link found',
                        imageUrl: imageUrl ? imageUrl : 'No image found'
                    };
                });
            });
        });
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contest data', error: error.toString() });
    }
};

exports.fetchPreviousContests = async (req, res) => {
    try {
        const contests = await setupPuppeteer(async (page) => {
            await page.goto('https://leetcode.com/contest/', { waitUntil: 'networkidle2', timeout: 60000 });
            return await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.mt-\\[11px\\].flex.flex-1.flex-col')).flatMap(pastContest => {
                    return Array.from(pastContest.querySelectorAll('.px-4')).map(px4 => {
                        const titleElement = px4.querySelector('.line-clamp-2');
                        const dateElement = px4.querySelector('.text-\\[11px\\].leading-\\[13px\\].text-label-3, .dark\\:text-dark-label-3');
                        return {
                            title: titleElement ? titleElement.innerText.trim() : 'No title found',
                            date: dateElement ? dateElement.innerText.trim() : 'No date found',
                        };
                    });
                });
            });
        });
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contest data', error: error.toString() });
    }
};
