const fs = require('fs');

// Read the current index.html
let content = fs.readFileSync('index.html', 'utf8');

// Check if we need to add the terminal loader script
if (!content.includes('terminal-loader.js')) {
    // Find the closing head tag and insert before it
    const headClose = content.indexOf('</head>');
    if (headClose !== -1) {
        content = content.slice(0, headClose) + 
            '\n    <script src="terminal-loader.js"></script>' +
            content.slice(headClose);
    }
    
    // Update the terminal section to use our enhanced terminal
    const terminalSection = content.indexOf('id="terminal"');
    if (terminalSection !== -1) {
        // Simple replacement for the terminal section content
        content = content.replace(
            /<section id="terminal">[\s\S]*?<\/section>/,
            `<section id="terminal">
            <h2>Terminal</h2>
            <p>Secure terminal interface. Type "help" for available commands.</p>
            <div class="terminal-container" id="terminalEmbed">
                <!-- Enhanced terminal will load here -->
            </div>
        </section>`
        );
    }
    
    // Update the navigation script to initialize terminal
    if (content.includes('loadTerminal')) {
        content = content.replace(
            /function loadTerminal\(\) \{[\s\S]*?\}/,
            `function loadTerminal() {
                if (typeof initPortfolioTerminal === 'function') {
                    setTimeout(initPortfolioTerminal, 100);
                }
            }`
        );
    }
    
    fs.writeFileSync('index.html', content);
    console.log('✅ Portfolio updated with enhanced terminal');
} else {
    console.log('✅ Terminal already integrated');
}
