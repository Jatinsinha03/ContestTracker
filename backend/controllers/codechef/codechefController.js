const { setupPuppeteer } = require('../../utils/puppeteerSetup');

exports.fetchCurrentContests = async (req, res) => {
    try {
        const contests = await setupPuppeteer(async (page) => {
            await page.goto('https://www.codechef.com/contests', { waitUntil: 'networkidle0', timeout: 0 });
            await page.waitForSelector('._flex__container_7s2sw_528', { timeout: 0 }); // Ensure the main container is loaded

            return await page.evaluate(() => {
                const results = [];
                // Select all container nodes for contests
                const contestNodes = document.querySelectorAll('._flex__container_7s2sw_528');

                contestNodes.forEach(node => {
                    // Ensure each element exists before attempting to access child properties
                    const dataContainer = node.querySelector('._data__container_7s2sw_533');
                    if (!dataContainer) return; // Skip if data container is not found

                    const linkElement = dataContainer.querySelector('div a'); // Adjusted to the likely correct nesting based on description
                    if (!linkElement) return; // Skip if no link element is found

                    const title = linkElement.textContent.trim();
                    const link = linkElement.href;

                    // Get start time from the specified timer container
                    const timerContainer = dataContainer.querySelector('._timer__container_7s2sw_590');
                    if (!timerContainer) return; // Skip if no timer container is found

                    const startTimeElements = timerContainer.querySelectorAll('p');
                    const startTime = Array.from(startTimeElements).map(p => p.textContent.trim()).join(' ');

                    results.push({
                        title: title,
                        link: link,
                        startTime: startTime || 'No start time info'
                    });
                });
                return results;
            });
        });
        res.status(200).json(contests);
    } catch (error) {
        console.error('Failed to fetch CodeChef contest data:', error);
        res.status(500).json({ message: 'Failed to fetch contest data', error: error.toString() });
    }
};

exports.fetchPastContests = async (req, res) => {
    try {
        const contests = await setupPuppeteer(async (page) => {
            await page.goto('https://www.codechef.com/contests', { waitUntil: 'networkidle0' });
            await page.waitForSelector('._flex__container_7s2sw_528', { timeout: 30000 }); // Wait for the contest data container

            return await page.evaluate(() => {
                const results = [];
                const contestNodes = document.querySelectorAll('._flex__container_7s2sw_528'); // Selector for contest nodes
                contestNodes.forEach(node => {
                    const dataContainer = node.querySelector('._data__container_7s2sw_533');
                    if (dataContainer) {
                        const titleElement = dataContainer.querySelector('a span'); // Adjusting selector to target title within a span inside an anchor tag
                        const subtitleElement = node.querySelector('._subtitle_7s2sw_544'); // Check for specific class in no class div
                        // Check if title starts with "Starters" and subtitleElement exists and starts with 'Participants'
                        if (titleElement && titleElement.textContent.trim().startsWith("Starters") &&
                            subtitleElement && subtitleElement.textContent.trim().startsWith("Participants")) {
                            results.push({
                                title: titleElement.textContent.trim(), // Extract text content and trim whitespace
                            });
                        }
                    }
                });
                return results;
            });
        });
        res.status(200).json(contests);
    } catch (error) {
        console.error('Failed to fetch past CodeChef contest data:', error);
        res.status(500).json({ message: 'Failed to fetch past contest data', error: error.toString() });
    }
};


