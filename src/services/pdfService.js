const puppeteer = require('puppeteer');
const modernTemplate = require('../templates/modern');
const classicTemplate = require('../templates/classic');

exports.createPDF = async (data) => {
  let browser;
  try {
    const isRender = process.env.RENDER === 'true' || process.env.PUPPETEER_CACHE_DIR;
    
    console.log('[PDF SERVICE] Launching browser...', { isRender });
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      // Explicitly handle executable path for Render if needed
      executablePath: isRender ? undefined : undefined, // Standard puppeteer usually finds it if env vars are correct
    });

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
    if (error.message.includes('Could not find Chrome')) {
      console.error('[PDF SERVICE] HINT: Ensure PUPPETEER_CACHE_DIR is set and build script ran correctly.');
    }
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('[PDF SERVICE] Browser closed');
    }
  }
};
