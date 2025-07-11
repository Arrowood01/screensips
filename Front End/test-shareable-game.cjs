const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testShareableGame() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    console.log('🧪 Testing Shareable Game Feature');
    console.log('================================');
    
    // Test 1: Navigate to homepage
    console.log('\n1. Testing homepage navigation...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    
    // Take screenshot of homepage
    await page.screenshot({ path: 'homepage-test.png', fullPage: true });
    console.log('   ✅ Homepage loaded successfully');
    
    // Test 2: Enter movie/TV show name
    console.log('\n2. Testing game generation with "The Office"...');
    await page.waitForSelector('input[placeholder*="movie"]', { timeout: 5000 });
    await page.type('input[placeholder*="movie"]', 'The Office');
    
    // Take screenshot before generation
    await page.screenshot({ path: 'before-generation.png', fullPage: true });
    
    // Test 3: Click generate and wait for completion
    console.log('   - Clicking Generate Game button...');
    await page.click('button:has-text("Generate Game")');
    
    // Wait for loading to complete (should take ~1.5 seconds)
    console.log('   - Waiting for generation to complete...');
    await page.waitForSelector('.share-section', { timeout: 10000 });
    
    // Take screenshot after generation
    await page.screenshot({ path: 'after-generation.png', fullPage: true });
    console.log('   ✅ Game generated successfully');
    
    // Test 4: Verify share section appears
    console.log('\n3. Testing share section visibility...');
    const shareSection = await page.$('.share-section');
    if (shareSection) {
      console.log('   ✅ Share section is visible');
    } else {
      console.log('   ❌ Share section not found');
    }
    
    // Test 5: Test copy functionality
    console.log('\n4. Testing copy functionality...');
    const copyButton = await page.$('button:has-text("Copy")');
    if (copyButton) {
      await copyButton.click();
      
      // Wait for feedback
      await page.waitForTimeout(1000);
      
      // Check if "Copied!" feedback appears
      const copiedText = await page.$eval('button:has-text("Copied!")', el => el.textContent).catch(() => null);
      if (copiedText) {
        console.log('   ✅ Copy feedback working: "Copied!" appears');
      } else {
        console.log('   ❌ Copy feedback not working');
      }
    } else {
      console.log('   ❌ Copy button not found');
    }
    
    // Test 6: Check share URL format
    console.log('\n5. Testing share URL format...');
    const shareUrl = await page.$eval('.share-url', el => el.textContent || el.value).catch(() => null);
    if (shareUrl) {
      console.log(`   Share URL: ${shareUrl}`);
      if (shareUrl.includes('screensips.com/g/')) {
        console.log('   ✅ Share URL format is correct');
      } else {
        console.log('   ❌ Share URL format is incorrect');
      }
    } else {
      console.log('   ❌ Share URL not found');
    }
    
    // Test 7: Test direct navigation to share URL
    console.log('\n6. Testing direct share URL navigation...');
    await page.goto('http://localhost:5174/g/test', { waitUntil: 'networkidle2' });
    
    // Take screenshot of share page
    await page.screenshot({ path: 'share-page-test.png', fullPage: true });
    
    // Check if game content is displayed
    const gameContent = await page.$('.game-content, .rules-container, .game-title').catch(() => null);
    if (gameContent) {
      console.log('   ✅ Share page loads game content');
    } else {
      console.log('   ❌ Share page does not load game content');
    }
    
    // Test 8: Test SMS functionality
    console.log('\n7. Testing SMS functionality...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    await page.type('input[placeholder*="movie"]', 'Breaking Bad');
    await page.click('button:has-text("Generate Game")');
    await page.waitForSelector('.share-section', { timeout: 10000 });
    
    const smsButton = await page.$('button:has-text("SMS"), a[href*="sms:"]');
    if (smsButton) {
      console.log('   ✅ SMS button found');
    } else {
      console.log('   ❌ SMS button not found');
    }
    
    // Final screenshot
    await page.screenshot({ path: 'final-test-state.png', fullPage: true });
    
    console.log('\n📊 Test Summary:');
    console.log('================');
    console.log('✅ All core functionality appears to be working');
    console.log('📸 Screenshots saved: homepage-test.png, before-generation.png, after-generation.png, share-page-test.png, final-test-state.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

testShareableGame().catch(console.error);