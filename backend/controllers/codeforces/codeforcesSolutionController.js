const { setupPuppeteer } = require('../../utils/puppeteerSetup');

exports.fetchCodeforcesSolution = async (req, res) => {
    try {
        const titlesAndLinks = await setupPuppeteer(async (page) => {
            await page.goto('https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB', { waitUntil: 'networkidle2', timeout: 60000 });
            return await page.evaluate(() => {
                const titleNodes = Array.from(document.querySelectorAll('#video-title'));
                return titleNodes.map(node => {
                    const fullTitle = node.innerText.trim();
                    const titlePart = fullTitle.split('|')[0].trim(); // Split the title and take the first part
                    const href = node.href; // Extract the href attribute
                    return {
                        title: titlePart, // Return the first part of the title
                        link: href  // Return the link associated with the title
                    };
                });
            });
        });
        res.status(200).json(titlesAndLinks);
    } catch (error) {
        console.error('Failed to fetch Codeforces video titles and links:', error);
        res.status(500).json({ message: 'Failed to fetch Codeforces video titles and links', error: error.toString() });
    }
};
