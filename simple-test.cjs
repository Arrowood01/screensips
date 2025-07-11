#!/usr/bin/env node

const BrowserAutomation = require('./tools/browser-automation.cjs');

async function testScreenSips() {
  const browser = new BrowserAutomation();
  
  try {
    console.log('🎬 Testing ScreenSips Website...\n');
    
    // Launch browser
    await browser.launch(false);
    
    // Test 1: Production site
    console.log('📋 Testing Production Site (Vercel)...');
    try {
      await browser.navigate('https://screensipspro.vercel.app/');
      await browser.takeScreenshot('production-homepage.png');
      console.log('✅ Production site loaded');
    } catch (error) {
      console.log('❌ Production site failed:', error.message);
      
      // Test 2: Local development server
      console.log('\n📋 Testing Local Development Server...');
      try {
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
        await browser.page.waitForTimeout(5000);
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
            console.log(`✅ Navigation to ${link} successful`);
          } catch (error) {
            console.log(`❌ Navigation to ${link} failed:`, error.message);
          }
        }
        
      } catch (localError) {
        console.log('❌ Local development server failed:', localError.message);
      }
    }
    
    await browser.close();
    
    console.log('\n📊 Test completed. Check the screenshots for visual verification.');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    await browser.close();
  }
}

testScreenSips().catch(console.error);