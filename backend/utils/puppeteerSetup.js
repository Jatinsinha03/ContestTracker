const puppeteer = require('puppeteer');

exports.setupPuppeteer = async (action) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });

    try {
        return await action(page);  // Pass the page object to the specific logic function
    } catch (error) {
        console.error('Failed to execute Puppeteer task:', error);
        throw error;
    } finally {
        await browser.close();
    }
};
