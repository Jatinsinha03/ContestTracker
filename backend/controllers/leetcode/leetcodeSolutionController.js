const { setupPuppeteer } = require('../../utils/puppeteerSetup');

exports.fetchLeetcodeSolution = async (req, res) => {
    try {
        const titlesAndLinks = await setupPuppeteer(async (page) => {
            await page.goto('https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr', { waitUntil: 'networkidle2', timeout: 60000 });
            return await page.evaluate(() => {
                // Using Array.from to convert NodeList to Array for mapping
                const titleNodes = Array.from(document.querySelectorAll('#video-title'));
                return titleNodes.map(node => {
                    const fullTitle = node.innerText.trim();
                    const match = fullTitle.match(/(Weekly|Biweekly) Contest \d+/); // Regex to find 'Weekly Contest' or 'Biweekly Contest' followed by numbers
                    const href = node.href; // Extract the href attribute
                    return {
                        title: match ? match[0] : 'No contest title found', // Return the matched part or a placeholder
                        link: href  // Return the link associated with the title
                    };
                });
            });
        });
        res.status(200).json(titlesAndLinks);
    } catch (error) {
        console.error('Failed to fetch video titles and links:', error);
        res.status(500).json({ message: 'Failed to fetch video titles and links', error: error.toString() });
    }
};
