#!/usr/bin/env node

const puppeteer = require('puppeteer');

class BrowserAutomation {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launch(headless = false) {
    try {
      this.browser = await puppeteer.launch({ 
        headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.page = await this.browser.newPage();

      // Capture console messages
      this.page.on('console', msg => {
        console.log(`[PAGE CONSOLE] ${msg.type()}: ${msg.text()}`);
      });
      // Capture page errors
      this.page.on('pageerror', error => {
        console.log(`[PAGE ERROR] ${error.message}`);
      });
      // Capture failed network requests
      this.page.on('requestfailed', request => {
        console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure().errorText}`);
      });

      console.log(`Browser launched successfully. Headless mode: ${headless}`);
      return true;
    } catch (error) {
      console.error(`Error launching browser: ${error.message}`);
      return false;
    }
  }

  async navigate(url) {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch() first.');
      }
      await this.page.goto(url, { waitUntil: 'networkidle2' });
      console.log(`Successfully navigated to ${url}`);
      return true;
    } catch (error) {
      console.error(`Error navigating: ${error.message}`);
      return false;
    }
  }

  async takeScreenshot(path = 'screenshot.png') {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch() first.');
      }
      await this.page.screenshot({ path, fullPage: true });
      console.log(`Screenshot saved to ${path}`);
      return true;
    } catch (error) {
      console.error(`Error taking screenshot: ${error.message}`);
      return false;
    }
  }

  async clickElement(selector) {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch() first.');
      }
      await this.page.click(selector);
      console.log(`Clicked element: ${selector}`);
      return true;
    } catch (error) {
      console.error(`Error clicking element: ${error.message}`);
      return false;
    }
  }

  async typeText(selector, text) {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch() first.');
      }
      await this.page.type(selector, text);
      console.log(`Typed text into ${selector}`);
      return true;
    } catch (error) {
      console.error(`Error typing text: ${error.message}`);
      return false;
    }
  }

  async getPageContent() {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch() first.');
      }
      const content = await this.page.content();
      console.log(`Page content retrieved. Length: ${content.length} characters`);
      return content;
    } catch (error) {
      console.error(`Error getting page content: ${error.message}`);
      return null;
    }
  }

  async close() {
    try {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
        console.log('Browser closed successfully');
      }
      return true;
    } catch (error) {
      console.error(`Error closing browser: ${error.message}`);
      return false;
    }
  }

  async testWebsite(url, tests = []) {
    try {
      console.log(`Testing website: ${url}`);
      
      if (!this.browser) {
        await this.launch(false);
      }
      
      await this.navigate(url);
      
      for (const test of tests) {
        try {
          switch (test.type) {
            case 'click':
              await this.clickElement(test.selector);
              console.log(`✅ Clicked: ${test.selector}`);
              break;
            case 'type':
              await this.typeText(test.selector, test.text);
              console.log(`✅ Typed: ${test.text} into ${test.selector}`);
              break;
            case 'screenshot':
              await this.takeScreenshot(test.path || 'test-screenshot.png');
              console.log(`✅ Screenshot saved`);
              break;
            case 'wait':
              await this.page.waitForTimeout(test.duration || 1000);
              console.log(`✅ Waited ${test.duration || 1000}ms`);
              break;
          }
        } catch (error) {
          console.log(`❌ Test failed: ${error.message}`);
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Error testing website: ${error.message}`);
      return false;
    }
  }
}

// Export for use in other scripts
module.exports = BrowserAutomation;

// If run directly, provide a simple CLI
if (require.main === module) {
  const browser = new BrowserAutomation();
  
  // Example usage
  async function example() {
    await browser.launch(false);
    await browser.navigate('https://example.com');
    await browser.takeScreenshot('example.png');
    await browser.close();
  }
  
  example().catch(console.error);
} 