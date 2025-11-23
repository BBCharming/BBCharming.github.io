#!/bin/bash

echo "🔍 Verifying Terminal Setup..."
echo "=============================="

cd ~/BBCharming.github.io

echo "📁 Files check:"
[ -f "terminal-loader.js" ] && echo "✅ terminal-loader.js" || echo "❌ terminal-loader.js"
[ -f "debug-terminal.js" ] && echo "✅ debug-terminal.js" || echo "❌ debug-terminal.js"

echo ""
echo "📄 HTML check:"
if grep -q "terminal-loader.js" index.html; then
    echo "✅ terminal-loader.js in index.html"
else
    echo "❌ terminal-loader.js NOT in index.html"
fi

if grep -q "debug-terminal.js" index.html; then
    echo "✅ debug-terminal.js in index.html"
else
    echo "❌ debug-terminal.js NOT in index.html"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Open: https://bbcharming.github.io/#terminal"
echo "2. Check browser console for debug messages"
echo "3. Type 'help' - it should work now"
echo "4. If not, the debug terminal will load"

echo ""
echo "💡 Deploy commands:"
echo "git add ."
echo "git commit -m 'Fix terminal loading'"
echo "git push"
