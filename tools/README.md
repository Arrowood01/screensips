# Claude Code Tools

This folder contains all the tools for Claude Code integration and browser automation.

## Files

### Core Tools
- **`launch-claude.sh`** - Main launcher for Claude Code with IDE integration
- **`browser-automation.js`** - Browser automation script with error capture
- **`browser-mcp-server.js`** - MCP server for browser automation (experimental)
- **`browser-mcp-config.json`** - MCP configuration file
- **`browser-mcp-package.json`** - Dependencies for MCP server
- **`Claude Code.desktop`** - Desktop shortcut

## Usage

### Launch Claude Code with IDE Integration
```bash
# From project root
./launch-claude.sh

# Or from tools folder
./tools/launch-claude.sh

# Or use desktop shortcut
# Double-click "Claude Code" on desktop
```

### Browser Automation
```bash
# Test browser automation
node tools/browser-automation.js

# The script will:
# - Launch Chrome browser
# - Navigate to example.com
# - Capture all console messages and errors
# - Take a screenshot
# - Close the browser
```

### Custom Browser Testing
```javascript
const BrowserAutomation = require('./tools/browser-automation.js');

const browser = new BrowserAutomation();

async function testMySite() {
  await browser.launch(false); // false = visible browser
  await browser.navigate('https://your-deployed-site.com');
  // All console errors will be printed automatically
  await browser.takeScreenshot('my-site-test.png');
  await browser.close();
}

testMySite();
```

## Features

### Error Capture
The browser automation script captures:
- Console messages (log, error, warning)
- Page errors (JavaScript exceptions)
- Failed network requests
- All output is printed to terminal for Claude to read

### IDE Integration
- Claude Code connects to Cursor IDE
- Can access your project files
- Can run browser automation
- Can help debug issues based on browser output

## Setup

1. **Claude Code**: Already installed globally
2. **Browser Automation**: Uses Puppeteer (installed locally)
3. **Desktop Shortcut**: Automatically created and updated

## Troubleshooting

If browser automation doesn't work:
```bash
# Reinstall dependencies
npm install puppeteer

# Test the script
node tools/browser-automation.js
```

If Claude Code doesn't launch:
```bash
# Check if Claude is installed
which claude

# Reinstall if needed
npm install -g @anthropic-ai/claude-code
``` 