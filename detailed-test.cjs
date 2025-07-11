#!/usr/bin/env node

const BrowserAutomation = require('./tools/browser-automation.cjs');

async function detailedTest() {
  const browser = new BrowserAutomation();
  
  try {
    console.log('🎬 Detailed ScreenSips Website Test...\n');
    
    // Launch browser
    await browser.launch(false);
    
    // Test Local Development Server
    console.log('📋 Testing Local Development Server...');
    await browser.navigate('http://localhost:5173/');
    await browser.takeScreenshot('local-homepage.png');
    console.log('✅ Local development server loaded');
    
    // Test functionality on local server
    console.log('\n🔍 Testing Movie Search Functionality...');
    
    // Enter movie title
    await browser.typeText('input[type="text"]', 'The Matrix');
    await browser.page.waitForTimeout(1000);
    
    // Click generate button
    await browser.clickElement('button');
    console.log('✅ Clicked generate button');
    
    // Wait for potential response
    await browser.page.waitForTimeout(8000);
    await browser.takeScreenshot('after-search.png');
    
    // Check if results appeared
    const content = await browser.getPageContent();
    if (content.includes('Your') && content.includes('Game is Ready')) {
      console.log('✅ Game generation successful');
    } else if (content.includes('Failed to generate')) {
      console.log('⚠️ Game generation failed - likely API issue');
    } else {
      console.log('⚠️ Game generation status unclear');
    }
    
    // Test navigation
    console.log('\n🔍 Testing Navigation Links...');
    const links = ['/about', '/tip', '/terms', '/privacy'];
    
    for (const link of links) {
      try {
        await browser.navigate('http://localhost:5173' + link);
        await browser.page.waitForTimeout(2000);
        await browser.takeScreenshot(`navigation-${link.replace('/', '')}.png`);
        console.log(`✅ Navigation to ${link} successful`);
      } catch (error) {
        console.log(`❌ Navigation to ${link} failed:`, error.message);
      }
    }
    
    console.log('\n🔍 Testing Production Site Error...');
    await browser.navigate('https://screensipspro.vercel.app/');
    await browser.page.waitForTimeout(5000);
    await browser.takeScreenshot('production-error.png');
    
    await browser.close();
    
    console.log('\n📊 Test completed. Screenshots saved for analysis.');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    await browser.close();
  }
}

detailedTest().catch(console.error);