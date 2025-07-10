#!/bin/bash

# Launch Claude Code with IDE integration and browser automation
echo "Launching Claude Code with IDE integration and browser automation..."
echo "Project directory: /home/nic/ScreenSips"
echo "Browser MCP server: Enabled"
echo ""

# Launch Claude Code with IDE integration and browser MCP
claude --ide --add-dir /home/nic/ScreenSips --allowedTools "Bash(git:*) Edit" --mcp-config /home/nic/ScreenSips/tools/browser-mcp-config.json

echo ""
echo "Claude Code session ended." 