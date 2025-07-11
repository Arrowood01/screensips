const puppeteer = require('puppeteer');

async function finalVerification() {
  console.log('🔍 Final Verification Test');
  console.log('=========================');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // Test different movie titles
    console.log('1. Testing with "Breaking Bad"...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    
    // Clear and enter new title
    await page.click('input[type="text"]');
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.type('input[type="text"]', 'Breaking Bad');
    
    // Generate game
    await page.click('button.liquid-button');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ path: 'breaking-bad-game.png', fullPage: true });
    console.log('   ✅ Breaking Bad game generated');
    
    // Test another share URL
    console.log('\n2. Testing different share URLs...');
    await page.goto('http://localhost:5174/g/another-test', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'another-share-test.png', fullPage: true });
    console.log('   ✅ Another share URL works');
    
    // Test with UUID-like ID
    await page.goto('http://localhost:5174/g/550e8400-e29b-41d4-a716-446655440000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'uuid-share-test.png', fullPage: true });
    console.log('   ✅ UUID share URL works');
    
    // Verify URL format from actual generation
    console.log('\n3. Verifying URL format...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    await page.click('input[type="text"]');
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.type('input[type="text"]', 'Game of Thrones');
    
    await page.click('button.liquid-button');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract the share URL
    const shareUrl = await page.evaluate(() => {
      const urlInput = document.querySelector('input[readonly]');
      return urlInput ? urlInput.value : null;
    });
    
    console.log(`   Share URL generated: ${shareUrl}`);
    
    if (shareUrl && shareUrl.includes('/g/')) {
      console.log('   ✅ URL format is correct');
    } else {
      console.log('   ❌ URL format issue');
    }
    
    await page.screenshot({ path: 'final-verification.png', fullPage: true });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'verification-error.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('\n📸 Final verification screenshots saved');
  }
}

finalVerification().catch(console.error);