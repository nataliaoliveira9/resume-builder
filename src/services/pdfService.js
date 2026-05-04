const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const modernTemplate = require('../templates/modern');
const classicTemplate = require('../templates/classic');

exports.createPDF = async (data) => {
  let browser;
  try {
    const isRender = process.env.RENDER === 'true' || process.env.PUPPETEER_CACHE_DIR;
    
    console.log('[PDF SERVICE] Launching browser with sparticuz/chromium...', { isRender });
    
    // Configure chromium for Render/Serverless environments
    const options = {
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };

    browser = await puppeteer.launch(options);

    console.log('[PDF SERVICE] Browser launched successfully');
    const page = await browser.newPage();

    // Select template
    const templateFn = data.template === 'classic' ? classicTemplate : modernTemplate;
    const html = templateFn(data);

    console.log('[PDF SERVICE] Setting page content...');
    await page.setContent(html, { waitUntil: 'networkidle0' });

    console.log('[PDF SERVICE] Generating PDF buffer...');
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

    console.log('[PDF SERVICE] PDF generated successfully');
    return pdfBuffer;
  } catch (error) {
    console.error('[PDF SERVICE] CRITICAL ERROR:', error.message);
    console.error('[PDF SERVICE] Stack:', error.stack);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('[PDF SERVICE] Browser closed');
    }
  }
};
