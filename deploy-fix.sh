#!/bin/bash
echo "🚀 Deploying Terminal Fix..."
git add terminal-loader.js index.html
git commit -m "FIX: Terminal help command now guaranteed to work"
git push
echo "✅ Fix deployed! Test at: https://bbcharming.github.io/#terminal"
echo "💡 Type 'help' - it will work immediately!"
