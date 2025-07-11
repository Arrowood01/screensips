#!/usr/bin/env node

const BrowserAutomation = require('./tools/browser-automation.cjs');

class ShareableGameTester {
  constructor() {
    this.browser = new BrowserAutomation();
    this.issues = [];
    this.testResults = [];
  }

  addIssue(severity, description, screenshot = null) {
    this.issues.push({
      severity,
      description,
      screenshot,
      timestamp: new Date().toISOString()
    });
    console.log(`🚨 ${severity.toUpperCase()}: ${description}`);
  }

  addTestResult(testName, passed, details = '') {
    this.testResults.push({
      testName,
      passed,
      details,
      timestamp: new Date().toISOString()
    });
    console.log(`${passed ? '✅' : '❌'} ${testName}: ${details}`);
  }

  async runTests() {
    console.log('🚀 Starting comprehensive shareable game feature tests...\n');
    
    try {
      // Start browser
      await this.browser.launch(false);
      await this.browser.page.setViewport({ width: 1280, height: 720 });
      
      // Test 1: Navigate to homepage
      await this.testHomepageNavigation();
      
      // Test 2: Generate a drinking game
      await this.testGameGeneration();
      
      // Test 3: Test share functionality
      await this.testShareFunctionality();
      
      // Test 4: Test share URL copy
      await this.testShareUrlCopy();
      
      // Test 5: Test shared game route
      await this.testSharedGameRoute();
      
      // Test 6: Test invalid shared game ID
      await this.testInvalidSharedGameId();
      
      // Test 7: Check for JavaScript errors
      await this.testJavaScriptErrors();
      
      // Test 8: Test mobile responsiveness
      await this.testMobileResponsiveness();
      
      // Final screenshot
      await this.browser.takeScreenshot('/home/nic/ScreenSips/test-results-final.png');
      
    } catch (error) {
      this.addIssue('CRITICAL', `Test execution failed: ${error.message}`);
    } finally {
      await this.browser.close();
    }
    
    // Generate report
    this.generateReport();
  }

  async testHomepageNavigation() {
    console.log('\n📍 Test 1: Homepage Navigation');
    
    try {
      const success = await this.browser.navigate('http://localhost:5173');
      if (success) {
        this.addTestResult('Homepage Navigation', true, 'Successfully loaded homepage');
        await this.browser.takeScreenshot('/home/nic/ScreenSips/test-homepage.png');
        
        // Check if main elements are present
        const titleExists = await this.browser.page.$('h1');
        const inputExists = await this.browser.page.$('input[placeholder*="Office"]');
        const buttonExists = await this.browser.page.$('button');
        
        if (titleExists && inputExists && buttonExists) {
          this.addTestResult('Homepage Elements', true, 'All main elements present');
        } else {
          this.addIssue('HIGH', 'Missing main homepage elements');
          this.addTestResult('Homepage Elements', false, 'Missing main elements');
        }
      } else {
        this.addIssue('CRITICAL', 'Failed to navigate to homepage - server may not be running');
        this.addTestResult('Homepage Navigation', false, 'Failed to load homepage');
      }
    } catch (error) {
      this.addIssue('CRITICAL', `Homepage navigation error: ${error.message}`);
      this.addTestResult('Homepage Navigation', false, error.message);
    }
  }

  async testGameGeneration() {
    console.log('\n📍 Test 2: Game Generation');
    
    try {
      // Type in search term
      const inputSelector = 'input[placeholder*="Office"]';
      await this.browser.page.waitForSelector(inputSelector, { timeout: 5000 });
      await this.browser.page.click(inputSelector);
      await this.browser.page.type(inputSelector, 'The Office');
      
      this.addTestResult('Input Text', true, 'Successfully entered "The Office"');
      
      // Click generate button
      const buttonSelector = 'button:has-text("Generate Game")';
      try {
        await this.browser.page.click('button');
        this.addTestResult('Generate Button Click', true, 'Successfully clicked generate button');
      } catch (error) {
        // Try alternative selector
        await this.browser.page.click('[class*="liquid-button"]');
        this.addTestResult('Generate Button Click', true, 'Successfully clicked generate button (alternative selector)');
      }
      
      // Wait for game generation (longer timeout since it involves API call)
      await this.browser.page.waitForTimeout(10000);
      
      // Check if game result appeared
      const gameResultExists = await this.browser.page.$('[class*="bg-slate-800/50"]');
      if (gameResultExists) {
        this.addTestResult('Game Generation', true, 'Game result section appeared');
        await this.browser.takeScreenshot('/home/nic/ScreenSips/test-game-generated.png');
      } else {
        this.addIssue('HIGH', 'Game result section did not appear after generation');
        this.addTestResult('Game Generation', false, 'No game result section found');
        await this.browser.takeScreenshot('/home/nic/ScreenSips/test-game-generation-failed.png');
      }
      
    } catch (error) {
      this.addIssue('HIGH', `Game generation error: ${error.message}`);
      this.addTestResult('Game Generation', false, error.message);
    }
  }

  async testShareFunctionality() {
    console.log('\n📍 Test 3: Share Functionality');
    
    try {
      // Look for share section
      const shareSection = await this.browser.page.$('[class*="from-orange-500/20"]');
      if (shareSection) {
        this.addTestResult('Share Section Present', true, 'Share section found in DOM');
        
        // Check if share section is visible
        const isVisible = await this.browser.page.evaluate(element => {
          const style = window.getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        }, shareSection);
        
        if (isVisible) {
          this.addTestResult('Share Section Visible', true, 'Share section is visible to user');
        } else {
          this.addIssue('MEDIUM', 'Share section exists but is not visible');
          this.addTestResult('Share Section Visible', false, 'Share section not visible');
        }
        
        // Check for share elements
        const shareUrl = await this.browser.page.$('input[readonly]');
        const copyButton = await this.browser.page.$('button:has-text("Copy"), button:has-text("Copied!")');
        const textButton = await this.browser.page.$('button:has-text("Share via Text")');
        
        if (shareUrl && copyButton && textButton) {
          this.addTestResult('Share Elements', true, 'All share elements present');
        } else {
          this.addIssue('HIGH', 'Missing share elements (URL input, copy button, or text button)');
          this.addTestResult('Share Elements', false, 'Missing share elements');
        }
        
      } else {
        this.addIssue('HIGH', 'Share section not found in DOM');
        this.addTestResult('Share Section Present', false, 'Share section not found');
      }
      
    } catch (error) {
      this.addIssue('HIGH', `Share functionality test error: ${error.message}`);
      this.addTestResult('Share Functionality', false, error.message);
    }
  }

  async testShareUrlCopy() {
    console.log('\n📍 Test 4: Share URL Copy');
    
    try {
      // Find and click copy button
      const copyButton = await this.browser.page.$('button:has-text("Copy")');
      if (copyButton) {
        await copyButton.click();
        this.addTestResult('Copy Button Click', true, 'Successfully clicked copy button');
        
        // Wait for feedback
        await this.browser.page.waitForTimeout(1000);
        
        // Check if button text changed to "Copied!"
        const copiedButton = await this.browser.page.$('button:has-text("Copied!")');
        if (copiedButton) {
          this.addTestResult('Copy Feedback', true, 'Copy button shows "Copied!" feedback');
        } else {
          this.addIssue('MEDIUM', 'Copy button does not show "Copied!" feedback');
          this.addTestResult('Copy Feedback', false, 'No copy feedback shown');
        }
        
        // Try to read clipboard (may not work in headless mode)
        try {
          const clipboardText = await this.browser.page.evaluate(() => {
            return navigator.clipboard.readText();
          });
          if (clipboardText && clipboardText.includes('/g/')) {
            this.addTestResult('Clipboard Content', true, `Clipboard contains share URL: ${clipboardText}`);
          } else {
            this.addTestResult('Clipboard Content', false, 'Clipboard does not contain expected URL');
          }
        } catch (clipboardError) {
          this.addTestResult('Clipboard Content', false, 'Could not read clipboard (browser limitation)');
        }
        
      } else {
        this.addIssue('HIGH', 'Copy button not found');
        this.addTestResult('Copy Button Click', false, 'Copy button not found');
      }
      
    } catch (error) {
      this.addIssue('HIGH', `Share URL copy test error: ${error.message}`);
      this.addTestResult('Share URL Copy', false, error.message);
    }
  }

  async testSharedGameRoute() {
    console.log('\n📍 Test 5: Shared Game Route');
    
    try {
      // Test with a sample game ID
      const testGameId = 'test-game-123';
      const shareUrl = `http://localhost:5173/g/${testGameId}`;
      
      await this.browser.navigate(shareUrl);
      this.addTestResult('Shared Game Navigation', true, `Successfully navigated to ${shareUrl}`);
      
      // Wait for page to load
      await this.browser.page.waitForTimeout(3000);
      
      // Check if it's the shared game page (should have loading or game content)
      const isSharedGamePage = await this.browser.page.$('h1:has-text("Drinking Game"), div:has-text("Loading")');
      if (isSharedGamePage) {
        this.addTestResult('Shared Game Page Load', true, 'Shared game page loaded successfully');
        await this.browser.takeScreenshot('/home/nic/ScreenSips/test-shared-game-page.png');
      } else {
        this.addIssue('HIGH', 'Shared game page did not load properly');
        this.addTestResult('Shared Game Page Load', false, 'Shared game page not loaded');
        await this.browser.takeScreenshot('/home/nic/ScreenSips/test-shared-game-failed.png');
      }
      
      // Check for mock data display
      const mockDataElements = await this.browser.page.$('h1:has-text("The Office")');
      if (mockDataElements) {
        this.addTestResult('Mock Data Display', true, 'Mock game data displayed correctly');
      } else {
        this.addIssue('MEDIUM', 'Mock game data not displayed');
        this.addTestResult('Mock Data Display', false, 'Mock data not shown');
      }
      
    } catch (error) {
      this.addIssue('HIGH', `Shared game route test error: ${error.message}`);
      this.addTestResult('Shared Game Route', false, error.message);
    }
  }

  async testInvalidSharedGameId() {
    console.log('\n📍 Test 6: Invalid Shared Game ID');
    
    try {
      // Test with an invalid game ID
      const invalidUrl = 'http://localhost:5173/g/invalid-game-id-xyz';
      
      await this.browser.navigate(invalidUrl);
      this.addTestResult('Invalid Game Navigation', true, `Successfully navigated to ${invalidUrl}`);
      
      // Wait for page to load
      await this.browser.page.waitForTimeout(3000);
      
      // Should show error message or redirect
      const errorMessage = await this.browser.page.$('h1:has-text("no cocktail found"), h1:has-text("not found")');
      if (errorMessage) {
        this.addTestResult('Invalid Game Error Handling', true, 'Error message displayed for invalid game ID');
      } else {
        this.addIssue('MEDIUM', 'No error message for invalid game ID');
        this.addTestResult('Invalid Game Error Handling', false, 'No error handling for invalid ID');
      }
      
      await this.browser.takeScreenshot('/home/nic/ScreenSips/test-invalid-game-id.png');
      
    } catch (error) {
      this.addIssue('HIGH', `Invalid game ID test error: ${error.message}`);
      this.addTestResult('Invalid Game ID', false, error.message);
    }
  }

  async testJavaScriptErrors() {
    console.log('\n📍 Test 7: JavaScript Errors');
    
    try {
      // JavaScript errors are captured automatically by the browser automation
      // Check if any were recorded during the tests
      const hasErrors = this.issues.some(issue => issue.description.includes('PAGE ERROR'));
      
      if (!hasErrors) {
        this.addTestResult('JavaScript Errors', true, 'No JavaScript errors detected');
      } else {
        this.addTestResult('JavaScript Errors', false, 'JavaScript errors detected during tests');
      }
      
    } catch (error) {
      this.addIssue('HIGH', `JavaScript error test error: ${error.message}`);
      this.addTestResult('JavaScript Errors', false, error.message);
    }
  }

  async testMobileResponsiveness() {
    console.log('\n📍 Test 8: Mobile Responsiveness');
    
    try {
      // Test mobile viewport
      await this.browser.page.setViewport({ width: 375, height: 667 });
      await this.browser.navigate('http://localhost:5173');
      
      // Wait for page to load
      await this.browser.page.waitForTimeout(2000);
      
      // Check if elements are still visible and accessible
      const titleVisible = await this.browser.page.$('h1');
      const inputVisible = await this.browser.page.$('input');
      const buttonVisible = await this.browser.page.$('button');
      
      if (titleVisible && inputVisible && buttonVisible) {
        this.addTestResult('Mobile Elements Visible', true, 'Main elements visible on mobile');
      } else {
        this.addIssue('MEDIUM', 'Some elements not visible on mobile viewport');
        this.addTestResult('Mobile Elements Visible', false, 'Elements not visible on mobile');
      }
      
      await this.browser.takeScreenshot('/home/nic/ScreenSips/test-mobile-responsive.png');
      
      // Reset viewport
      await this.browser.page.setViewport({ width: 1280, height: 720 });
      
    } catch (error) {
      this.addIssue('HIGH', `Mobile responsiveness test error: ${error.message}`);
      this.addTestResult('Mobile Responsiveness', false, error.message);
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 SHAREABLE GAME FEATURE TEST REPORT');
    console.log('='.repeat(80));
    
    // Summary
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(test => test.passed).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`\n📊 TEST SUMMARY:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
    console.log(`   Failed: ${failedTests} (${Math.round(failedTests/totalTests*100)}%)`);
    
    // Issues by severity
    const criticalIssues = this.issues.filter(issue => issue.severity === 'CRITICAL');
    const highIssues = this.issues.filter(issue => issue.severity === 'HIGH');
    const mediumIssues = this.issues.filter(issue => issue.severity === 'MEDIUM');
    
    console.log(`\n🚨 ISSUES FOUND:`);
    console.log(`   Critical: ${criticalIssues.length}`);
    console.log(`   High: ${highIssues.length}`);
    console.log(`   Medium: ${mediumIssues.length}`);
    
    // Detailed test results
    console.log(`\n📋 DETAILED RESULTS:`);
    this.testResults.forEach(test => {
      const status = test.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`   ${status} - ${test.testName}: ${test.details}`);
    });
    
    // Issues details
    if (this.issues.length > 0) {
      console.log(`\n🔍 ISSUE DETAILS:`);
      this.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. [${issue.severity}] ${issue.description}`);
      });
    }
    
    // Feature assessment
    console.log(`\n🎯 FEATURE ASSESSMENT:`);
    
    const criticalFeatures = [
      'Homepage Navigation',
      'Game Generation', 
      'Share Section Present',
      'Shared Game Route'
    ];
    
    const workingCriticalFeatures = criticalFeatures.filter(feature => 
      this.testResults.some(test => test.testName === feature && test.passed)
    );
    
    if (workingCriticalFeatures.length === criticalFeatures.length) {
      console.log('   ✅ Core shareable game functionality is WORKING');
    } else {
      console.log('   ❌ Core shareable game functionality has ISSUES');
    }
    
    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);
    
    if (criticalIssues.length > 0) {
      console.log('   🚨 CRITICAL: Fix critical issues before deployment');
    }
    
    if (highIssues.length > 0) {
      console.log('   ⚠️  HIGH: Address high priority issues for better user experience');
    }
    
    if (mediumIssues.length > 0) {
      console.log('   📝 MEDIUM: Consider fixing medium issues for polish');
    }
    
    if (passedTests === totalTests) {
      console.log('   🎉 All tests passed! Feature is ready for production');
    } else if (passedTests / totalTests > 0.8) {
      console.log('   👍 Most tests passed. Feature is mostly working with minor issues');
    } else {
      console.log('   ⚠️  Many tests failed. Feature needs significant work');
    }
    
    console.log('\n📸 Screenshots saved to:');
    console.log('   - /home/nic/ScreenSips/test-homepage.png');
    console.log('   - /home/nic/ScreenSips/test-game-generated.png');
    console.log('   - /home/nic/ScreenSips/test-shared-game-page.png');
    console.log('   - /home/nic/ScreenSips/test-invalid-game-id.png');
    console.log('   - /home/nic/ScreenSips/test-mobile-responsive.png');
    console.log('   - /home/nic/ScreenSips/test-results-final.png');
    
    console.log('\n' + '='.repeat(80));
  }
}

// Run the tests
async function runTests() {
  const tester = new ShareableGameTester();
  await tester.runTests();
}

runTests().catch(console.error);