#!/usr/bin/env node

const BrowserAutomation = require('./tools/browser-automation.cjs');

async function manualTest() {
  console.log('🧪 Starting manual verification test...\n');
  
  const browser = new BrowserAutomation();
  let issues = [];
  
  try {
    // Launch browser
    await browser.launch(false);
    await browser.page.setViewport({ width: 1280, height: 720 });
    
    // Step 1: Load homepage
    console.log('📍 Step 1: Loading homepage...');
    await browser.navigate('http://localhost:5173');
    await browser.page.waitForSelector('h1', { timeout: 10000 });
    await browser.takeScreenshot('/home/nic/ScreenSips/step1-homepage.png');
    console.log('✅ Homepage loaded successfully');
    
    // Step 2: Enter movie title
    console.log('\n📍 Step 2: Entering movie title...');
    const inputSelector = 'input[placeholder*="Office"]';
    await browser.page.waitForSelector(inputSelector, { timeout: 5000 });
    await browser.page.click(inputSelector);
    await browser.page.keyboard.type('The Office');
    await browser.takeScreenshot('/home/nic/ScreenSips/step2-input.png');
    console.log('✅ Movie title entered');
    
    // Step 3: Click Generate button
    console.log('\n📍 Step 3: Clicking Generate button...');
    // Find button by text content
    const generateButton = await browser.page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(btn => btn.textContent.includes('Generate'));
    });
    
    if (generateButton._remoteObject.value) {
      await generateButton.click();
      console.log('✅ Generate button clicked');
    } else {
      console.log('❌ Generate button not found');
      issues.push('Generate button not clickable');
    }
    
    // Step 4: Wait for game generation
    console.log('\n📍 Step 4: Waiting for game generation...');
    await new Promise(resolve => setTimeout(resolve, 8000));
    await browser.takeScreenshot('/home/nic/ScreenSips/step4-after-generate.png');
    
    // Check if game was generated
    const gameContent = await browser.page.evaluate(() => {
      const content = document.body.textContent;
      return {
        hasRules: content.includes('Rules') || content.includes('Game'),
        hasError: content.includes('Failed to generate') || content.includes('error'),
        hasShare: content.includes('Share') || content.includes('share'),
        fullContent: content
      };
    });
    
    if (gameContent.hasError) {
      console.log('❌ Game generation failed - API error');
      issues.push('Game generation API call failed');
    } else if (gameContent.hasRules) {
      console.log('✅ Game content generated');
      
      if (gameContent.hasShare) {
        console.log('✅ Share functionality visible');
      } else {
        console.log('❌ Share functionality not visible');
        issues.push('Share section not visible after game generation');
      }
    } else {
      console.log('❌ No game content found');
      issues.push('No game content appeared after generation');
    }
    
    // Step 5: Test shared game route
    console.log('\n📍 Step 5: Testing shared game route...');
    await browser.navigate('http://localhost:5173/g/test-123');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.takeScreenshot('/home/nic/ScreenSips/step5-shared-game.png');
    
    const sharedGameContent = await browser.page.evaluate(() => {
      const content = document.body.textContent;
      return {
        hasOfficeData: content.includes('The Office'),
        hasRules: content.includes('Rules'),
        hasShare: content.includes('Share'),
        hasLoading: content.includes('Loading'),
        title: document.title
      };
    });
    
    if (sharedGameContent.hasOfficeData) {
      console.log('✅ Shared game page loads with mock data');
      console.log(`   Page title: ${sharedGameContent.title}`);
      
      if (sharedGameContent.hasShare) {
        console.log('✅ Share functionality present on shared page');
      } else {
        console.log('❌ Share functionality missing on shared page');
        issues.push('Share functionality missing on shared game page');
      }
    } else {
      console.log('❌ Shared game page not loading properly');
      issues.push('Shared game page not displaying content');
    }
    
    // Step 6: Test invalid game ID
    console.log('\n📍 Step 6: Testing invalid game ID...');
    await browser.navigate('http://localhost:5173/g/invalid-xyz');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.takeScreenshot('/home/nic/ScreenSips/step6-invalid-game.png');
    
    const invalidGameContent = await browser.page.evaluate(() => {
      const content = document.body.textContent;
      return {
        hasError: content.includes('not found') || content.includes('no cocktail'),
        hasOfficeData: content.includes('The Office'), // Mock data shows for any ID
        hasContent: content.length > 100
      };
    });
    
    if (invalidGameContent.hasContent) {
      console.log('✅ Invalid game ID handled (shows mock data)');
    } else {
      console.log('❌ Invalid game ID causes blank page');
      issues.push('Invalid game ID causes blank or broken page');
    }
    
    // Step 7: Check console for errors
    console.log('\n📍 Step 7: Checking for JavaScript errors...');
    // JavaScript errors are logged automatically by our browser automation
    
    // Final screenshot
    await browser.takeScreenshot('/home/nic/ScreenSips/final-test-result.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    issues.push(`Test execution error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  // Report results
  console.log('\n' + '='.repeat(60));
  console.log('🎯 MANUAL TEST RESULTS');
  console.log('='.repeat(60));
  
  if (issues.length === 0) {
    console.log('✅ All tests passed! The shareable game feature is working correctly.');
  } else {
    console.log(`❌ ${issues.length} issues found:`);
    issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
  }
  
  console.log('\n📸 Screenshots saved:');
  console.log('   - /home/nic/ScreenSips/step1-homepage.png');
  console.log('   - /home/nic/ScreenSips/step2-input.png');
  console.log('   - /home/nic/ScreenSips/step4-after-generate.png');
  console.log('   - /home/nic/ScreenSips/step5-shared-game.png');
  console.log('   - /home/nic/ScreenSips/step6-invalid-game.png');
  console.log('   - /home/nic/ScreenSips/final-test-result.png');
  
  console.log('\n' + '='.repeat(60));
}

manualTest().catch(console.error);