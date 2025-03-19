const puppeteer = require('puppeteer');

exports.setupPuppeteer = async (action) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('request', request => {
        if (['image', 'font'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.setBypassCSP(true);    
    // await page.setJavaScriptEnabled(true); // Make sure JS is enabled
    try {
        return await action(page);  // Pass the page object to the specific logic function
    } catch (error) {
        console.error('Failed to execute Puppeteer task:', error);
        throw error;
    } finally {
        await browser.close();
    }
};
