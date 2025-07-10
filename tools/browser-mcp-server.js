#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/dist/cjs/server/index');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/dist/cjs/server/stdio');
const puppeteer = require('puppeteer');

class BrowserMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'browser-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.browser = null;
    this.page = null;
    this.setupTools();
  }

  setupTools() {
    // Launch browser
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'launch_browser':
          return await this.launchBrowser(args);
        case 'navigate_to':
          return await this.navigateTo(args);
        case 'take_screenshot':
          return await this.takeScreenshot(args);
        case 'click_element':
          return await this.clickElement(args);
        case 'type_text':
          return await this.typeText(args);
        case 'get_page_content':
          return await this.getPageContent(args);
        case 'close_browser':
          return await this.closeBrowser(args);
        case 'test_website':
          return await this.testWebsite(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async launchBrowser(args) {
    try {
      const { headless = false } = args;
      this.browser = await puppeteer.launch({ 
        headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.page = await this.browser.newPage();
      return {
        content: [{ type: 'text', text: `Browser launched successfully. Headless mode: ${headless}` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error launching browser: ${error.message}` }]
      };
    }
  }

  async navigateTo(args) {
    try {
      const { url } = args;
      if (!this.page) {
        throw new Error('Browser not launched. Call launch_browser first.');
      }
      await this.page.goto(url, { waitUntil: 'networkidle2' });
      return {
        content: [{ type: 'text', text: `Successfully navigated to ${url}` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error navigating: ${error.message}` }]
      };
    }
  }

  async takeScreenshot(args) {
    try {
      const { path = 'screenshot.png' } = args;
      if (!this.page) {
        throw new Error('Browser not launched. Call launch_browser first.');
      }
      await this.page.screenshot({ path, fullPage: true });
      return {
        content: [{ type: 'text', text: `Screenshot saved to ${path}` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error taking screenshot: ${error.message}` }]
      };
    }
  }

  async clickElement(args) {
    try {
      const { selector } = args;
      if (!this.page) {
        throw new Error('Browser not launched. Call launch_browser first.');
      }
      await this.page.click(selector);
      return {
        content: [{ type: 'text', text: `Clicked element: ${selector}` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error clicking element: ${error.message}` }]
      };
    }
  }

  async typeText(args) {
    try {
      const { selector, text } = args;
      if (!this.page) {
        throw new Error('Browser not launched. Call launch_browser first.');
      }
      await this.page.type(selector, text);
      return {
        content: [{ type: 'text', text: `Typed text into ${selector}` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error typing text: ${error.message}` }]
      };
    }
  }

  async getPageContent(args) {
    try {
      if (!this.page) {
        throw new Error('Browser not launched. Call launch_browser first.');
      }
      const content = await this.page.content();
      return {
        content: [{ type: 'text', text: `Page content retrieved. Length: ${content.length} characters` }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error getting page content: ${error.message}` }]
      };
    }
  }

  async closeBrowser(args) {
    try {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
      }
      return {
        content: [{ type: 'text', text: 'Browser closed successfully' }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error closing browser: ${error.message}` }]
      };
    }
  }

  async testWebsite(args) {
    try {
      const { url, tests = [] } = args;
      
      if (!this.browser) {
        await this.launchBrowser({ headless: false });
      }
      
      await this.navigateTo({ url });
      
      let results = [`Testing website: ${url}`];
      
      for (const test of tests) {
        try {
          switch (test.type) {
            case 'click':
              await this.clickElement({ selector: test.selector });
              results.push(`✅ Clicked: ${test.selector}`);
              break;
            case 'type':
              await this.typeText({ selector: test.selector, text: test.text });
              results.push(`✅ Typed: ${test.text} into ${test.selector}`);
              break;
            case 'screenshot':
              await this.takeScreenshot({ path: test.path || 'test-screenshot.png' });
              results.push(`✅ Screenshot saved`);
              break;
            case 'wait':
              await this.page.waitForTimeout(test.duration || 1000);
              results.push(`✅ Waited ${test.duration || 1000}ms`);
              break;
          }
        } catch (error) {
          results.push(`❌ Test failed: ${error.message}`);
        }
      }
      
      return {
        content: [{ type: 'text', text: results.join('\n') }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error testing website: ${error.message}` }]
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new BrowserMCPServer();
server.run().catch(console.error); 