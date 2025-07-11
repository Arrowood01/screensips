const puppeteer = require('puppeteer');

async function quickTest() {
  console.log('🧪 Quick Shareable Game Test');
  console.log('===========================');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // Test 1: Load homepage
    console.log('1. Loading homepage...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: 'homepage-loaded.png', fullPage: true });
    console.log('   ✅ Homepage loaded');
    
    // Test 2: Enter movie name and generate
    console.log('2. Testing game generation...');
    await page.waitForSelector('input[placeholder*="movie"], input[type="text"]', { timeout: 10000 });
    await page.type('input[placeholder*="movie"], input[type="text"]', 'The Office');
    
    await page.screenshot({ path: 'input-filled.png', fullPage: true });
    console.log('   ✅ Movie name entered');
    
    // Click generate button
    const generateButton = await page.$('button.liquid-button');
    if (generateButton) {
      await generateButton.click();
      console.log('   ✅ Generate button clicked');
      
      // Wait for completion (should take ~1.5 seconds)
      console.log('   - Waiting for generation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await page.screenshot({ path: 'after-generation.png', fullPage: true });
      
      // Check if share section appears
      const shareText = await page.evaluate(() => {
        const text = document.body.innerText;
        return text.includes('Share it with friends') || text.includes('Copy') || text.includes('Share');
      });
      
      if (shareText) {
        console.log('   ✅ Share functionality visible');
        
        // Test copy functionality by finding Copy button
        const copyButton = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          return buttons.find(button => button.textContent.includes('Copy'));
        });
        
        if (copyButton) {
          await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const copyBtn = buttons.find(button => button.textContent.includes('Copy'));
            if (copyBtn) copyBtn.click();
          });
          console.log('   ✅ Copy button clicked');
          
          // Wait for feedback
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const copiedText = await page.evaluate(() => {
            return document.body.innerText.includes('Copied!');
          });
          
          if (copiedText) {
            console.log('   ✅ Copy feedback working');
          } else {
            console.log('   ❌ Copy feedback not working');
          }
        } else {
          console.log('   ❌ Copy button not found');
        }
        
      } else {
        console.log('   ❌ Share functionality not visible');
      }
      
    } else {
      console.log('   ❌ Generate button not found');
    }
    
    // Test 3: Test share URL navigation
    console.log('3. Testing share URL navigation...');
    await page.goto('http://localhost:5174/g/test', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: 'share-page.png', fullPage: true });
    console.log('   ✅ Share page loaded');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'error-state.png', fullPage: true });
  } finally {
    console.log('\n📸 Screenshots taken: homepage-loaded.png, input-filled.png, after-generation.png, share-page.png');
    await browser.close();
  }
}

quickTest().catch(console.error);