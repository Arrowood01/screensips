#!/usr/bin/env node

const BrowserAutomation = require('./browser-automation.cjs');
const fs = require('fs');
const path = require('path');

async function takeLogoScreenshot() {
  const browser = new BrowserAutomation();
  
  try {
    console.log('Starting browser automation for logo screenshot...');
    
    // Launch browser in non-headless mode for debugging
    await browser.launch(true);
    
    // Set viewport to desktop size
    await browser.page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to local development server
    console.log('Navigating to localhost:5173...');
    await browser.navigate('http://localhost:5173');
    
    // Wait for page to fully load
    await browser.page.waitForSelector('img[alt="ScreenSips Logo"]', { timeout: 10000 });
    
    // Take full page screenshot
    const screenshotPath = path.join(__dirname, '../local-homepage.png');
    await browser.takeScreenshot(screenshotPath);
    
    // Get logo dimensions and position
    const logoInfo = await browser.page.evaluate(() => {
      const logo = document.querySelector('img[alt="ScreenSips Logo"]');
      if (!logo) return null;
      
      const rect = logo.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(logo);
      
      return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        naturalWidth: logo.naturalWidth,
        naturalHeight: logo.naturalHeight,
        className: logo.className,
        styles: {
          width: computedStyle.width,
          height: computedStyle.height,
          maxWidth: computedStyle.maxWidth,
          maxHeight: computedStyle.maxHeight,
          objectFit: computedStyle.objectFit,
          margin: computedStyle.margin,
          padding: computedStyle.padding
        }
      };
    });
    
    console.log('\n=== LOGO ANALYSIS ===');
    console.log('Logo found:', logoInfo !== null);
    if (logoInfo) {
      console.log('Rendered dimensions:', `${logoInfo.width}px x ${logoInfo.height}px`);
      console.log('Natural dimensions:', `${logoInfo.naturalWidth}px x ${logoInfo.naturalHeight}px`);
      console.log('Position:', `top: ${logoInfo.top}px, left: ${logoInfo.left}px`);
      console.log('CSS class:', logoInfo.className);
      console.log('Computed styles:', JSON.stringify(logoInfo.styles, null, 2));
    }
    
    // Get navigation bar info
    const navInfo = await browser.page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return null;
      
      const rect = nav.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        className: nav.className
      };
    });
    
    console.log('\n=== NAVIGATION BAR ANALYSIS ===');
    if (navInfo) {
      console.log('Navigation dimensions:', `${navInfo.width}px x ${navInfo.height}px`);
      console.log('Navigation classes:', navInfo.className);
    }
    
    console.log(`\n=== SCREENSHOT SAVED ===`);
    console.log(`Screenshot saved to: ${screenshotPath}`);
    
    return true;
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return false;
  } finally {
    await browser.close();
  }
}

// Run the function
takeLogoScreenshot().catch(console.error);