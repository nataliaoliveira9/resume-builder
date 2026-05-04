const puppeteer = require('puppeteer');
const modernTemplate = require('../templates/modern');
const classicTemplate = require('../templates/classic');

exports.createPDF = async (data) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    const page = await browser.newPage();

    // Select template
    const templateFn = data.template === 'classic' ? classicTemplate : modernTemplate;
    const html = templateFn(data);

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    return pdfBuffer;
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
