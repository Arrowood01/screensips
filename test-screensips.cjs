#!/usr/bin/env node

const BrowserAutomation = require('./tools/browser-automation');
const fs = require('fs');
const path = require('path');

class ScreenSipsTest {
  constructor() {
    this.browser = new BrowserAutomation();
    this.testResults = [];
    this.screenshotCounter = 1;
  }

  async runComprehensiveTest() {
    console.log('🎬 Starting comprehensive ScreenSips website test...\n');
    
    try {
      // Test both the deployed site and local development
      const testUrls = [
        'https://screensipspro.vercel.app/',
        'http://localhost:5173/'
      ];

      for (const url of testUrls) {
        console.log(`\n🔍 Testing: ${url}`);
        await this.testWebsite(url);
      }

      await this.browser.close();
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      await this.browser.close();
    }
  }

  async testWebsite(url) {
    const testName = url.includes('localhost') ? 'Local Development' : 'Production (Vercel)';
    
    try {
      console.log(`\n📋 Testing ${testName} Site...`);
      
      await this.browser.launch(false); // Run in visible mode
      
      // Test 1: Navigation and homepage load
      console.log('✅ Test 1: Homepage Navigation');
      const navigated = await this.browser.navigate(url);
      if (!navigated) {
        this.testResults.push({
          test: `${testName} - Homepage Load`,
          status: 'FAILED',
          error: 'Failed to navigate to homepage'
        });
        return;
      }
      
      await this.browser.takeScreenshot(`screenshot-${this.screenshotCounter++}-${testName.toLowerCase().replace(/\s/g, '-')}-homepage.png`);
      this.testResults.push({
        test: `${testName} - Homepage Load`,
        status: 'PASSED',
        details: 'Homepage loaded successfully'
      });

      // Test 2: Check page content
      console.log('✅ Test 2: Page Content Check');
      const content = await this.browser.getPageContent();
      if (content && content.includes('Screen Sips') && content.includes('Movie & TV')) {
        this.testResults.push({
          test: `${testName} - Page Content`,
          status: 'PASSED',
          details: 'Page contains expected content'
        });
      } else {
        this.testResults.push({
          test: `${testName} - Page Content`,
          status: 'FAILED',
          error: 'Page missing expected content'
        });
      }

      // Test 3: Movie search functionality
      console.log('✅ Test 3: Movie Search Input');
      const movieTitle = 'The Matrix';
      
      try {
        await this.browser.typeText('input[type="text"]', movieTitle);
        await this.browser.page.waitForTimeout(1000);
        
        console.log('✅ Test 4: Generate Button Click');
        await this.browser.clickElement('button');
        
        // Wait for potential API response
        await this.browser.page.waitForTimeout(5000);
        
        await this.browser.takeScreenshot(`screenshot-${this.screenshotCounter++}-${testName.toLowerCase().replace(/\s/g, '-')}-after-search.png`);
        
        this.testResults.push({
          test: `${testName} - Movie Search`,
          status: 'PASSED',
          details: `Successfully entered "${movieTitle}" and clicked generate`
        });
        
      } catch (error) {
        this.testResults.push({
          test: `${testName} - Movie Search`,
          status: 'FAILED',
          error: error.message
        });
      }

      // Test 5: Navigation links
      console.log('✅ Test 5: Navigation Links');
      const navLinks = ['/about', '/tip', '/terms', '/privacy', '/drink-responsibly'];
      
      for (const link of navLinks) {
        try {
          await this.browser.navigate(url + link.substring(1));
          await this.browser.page.waitForTimeout(2000);
          
          const linkContent = await this.browser.getPageContent();
          if (linkContent && linkContent.length > 1000) {
            this.testResults.push({
              test: `${testName} - Navigation: ${link}`,
              status: 'PASSED',
              details: 'Page loaded with content'
            });
          } else {
            this.testResults.push({
              test: `${testName} - Navigation: ${link}`,
              status: 'FAILED',
              error: 'Page loaded but with minimal content'
            });
          }
          
        } catch (error) {
          this.testResults.push({
            test: `${testName} - Navigation: ${link}`,
            status: 'FAILED',
            error: error.message
          });
        }
      }

      await this.browser.close();
      
    } catch (error) {
      console.error(`❌ Error testing ${testName}:`, error.message);
      this.testResults.push({
        test: `${testName} - Overall`,
        status: 'FAILED',
        error: error.message
      });
    }
  }

  generateReport() {
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('=' * 50);
    
    const passed = this.testResults.filter(r => r.status === 'PASSED').length;
    const failed = this.testResults.filter(r => r.status === 'FAILED').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${this.testResults.length}`);
    
    console.log('\n📋 DETAILED RESULTS:');
    this.testResults.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.status}`);
      if (result.details) console.log(`   📝 ${result.details}`);
      if (result.error) console.log(`   ❌ ${result.error}`);
    });

    // Save report to file
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: { passed, failed, total: this.testResults.length },
      results: this.testResults
    };
    
    fs.writeFileSync('test-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Full report saved to test-report.json');
  }
}

// Run the test
const tester = new ScreenSipsTest();
tester.runComprehensiveTest().catch(console.error);