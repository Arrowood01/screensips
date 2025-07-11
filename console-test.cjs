#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function checkConsole() {
  console.log('🔍 Checking JavaScript console for errors...\n');
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  const consoleMessages = [];
  const errors = [];
  
  // Capture console messages
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  try {
    // Test homepage
    console.log('📍 Testing homepage console...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    // Test shared game page
    console.log('📍 Testing shared game page console...');
    await page.goto('http://localhost:5173/g/test-123', { waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    // Test invalid game page
    console.log('📍 Testing invalid game page console...');
    await page.goto('http://localhost:5173/g/invalid-xyz', { waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    // Filter out non-error messages
    const errorMessages = consoleMessages.filter(msg => 
      msg.type === 'error' && 
      !msg.text.includes('_vercel') && 
      !msg.text.includes('DevTools') &&
      !msg.text.includes('Web Analytics')
    );
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 CONSOLE ERROR ANALYSIS');
    console.log('='.repeat(50));
    
    console.log(`\n📊 Summary:`);
    console.log(`   Console messages: ${consoleMessages.length}`);
    console.log(`   JavaScript errors: ${errors.length}`);
    console.log(`   Console errors: ${errorMessages.length}`);
    
    if (errors.length > 0) {
      console.log('\n❌ JavaScript Runtime Errors:');
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    if (errorMessages.length > 0) {
      console.log('\n❌ Console Errors:');
      errorMessages.forEach((msg, index) => {
        console.log(`   ${index + 1}. [${msg.type}] ${msg.text}`);
      });
    }
    
    if (errors.length === 0 && errorMessages.length === 0) {
      console.log('\n✅ No JavaScript errors found!');
      console.log('   The shareable game feature is working without console errors.');
    }
    
    // Show some sample console messages for context
    const infoMessages = consoleMessages.filter(msg => msg.type === 'log').slice(0, 5);
    if (infoMessages.length > 0) {
      console.log('\n📝 Sample Console Logs:');
      infoMessages.forEach(msg => {
        console.log(`   ${msg.text}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

checkConsole().catch(console.error);