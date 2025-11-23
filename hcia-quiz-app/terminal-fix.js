// Terminal command fixes
function initializeTerminalCommands() {
    console.log("🔧 Initializing terminal commands...");
    
    // Override or enhance the help command
    const originalHelp = window.help || function() {};
    
    window.help = function() {
        console.log(`

🎯 HCIA Quiz Commands:
========================
help    - Show this help message
clear   - Clear terminal
hcia    - Launch HCIA Quiz
./HCIA-Datacom-Quiz - Alternative launch

📱 App Navigation:
==================
• Use mouse/touch to navigate menus
• Chapter Quiz - Practice by topic
• Random Quiz - Mixed questions  
• Final Exam - 3 sessions (50+50+38)

🎮 Quick Start:
===============
1. Type 'hcia' and press Enter
2. Click any quiz mode to start
3. Answer questions and track progress

💡 Tips:
========
• Progress saves automatically
• Review weak areas after quizzes
• Complete all 22 chapters for 100%

        `);
        return "HCIA Quiz Help displayed above ↑";
    };
    
    // Ensure clear command works
    window.clear = function() {
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            terminalOutput.innerHTML = '';
            addToTerminal('Terminal cleared. Type "help" for commands.', 'system');
        }
        return "Terminal cleared";
    };
    
    console.log("✅ Terminal commands fixed");
}

// Initialize when terminal is ready
if (document.getElementById('terminal-input')) {
    setTimeout(initializeTerminalCommands, 1000);
}

// Add launch animation function
function showLaunchAnimation() {
    console.log("🚀 Starting launch animation...");
    
    const launchHTML = `
        <div id="launchAnimation" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0f, #111122);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: white;
            font-family: 'Segoe UI', sans-serif;
        ">
            <div style="text-align: center;">
                <div style="font-size: 3em; margin-bottom: 20px; background: linear-gradient(135deg, #00d4ff, #a96bff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">HCIA-Datacom</div>
                <div style="font-size: 1.5em; margin-bottom: 30px; color: #00d4ff;">Quiz Application</div>
                <div style="font-size: 1em; color: #94a3b8;">Loading 138+ Questions...</div>
                <div style="width: 200px; height: 4px; background: #2c3e50; border-radius: 2px; margin: 20px auto; overflow: hidden;">
                    <div id="loadingBar" style="width: 0%; height: 100%; background: linear-gradient(135deg, #00d4ff, #a96bff); transition: width 2s ease;"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', launchHTML);
    
    // Animate loading bar
    setTimeout(() => {
        const loadingBar = document.getElementById('loadingBar');
        if (loadingBar) {
            loadingBar.style.width = '100%';
        }
    }, 100);
    
    // Remove animation after delay
    setTimeout(() => {
        const animation = document.getElementById('launchAnimation');
        if (animation) {
            animation.style.opacity = '0';
            animation.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                animation.remove();
                console.log("✅ Launch animation complete");
            }, 500);
        }
    }, 2500);
}

// Enhanced hcia command with animation
if (window.hcia) {
    const originalHcia = window.hcia;
    window.hcia = function() {
        showLaunchAnimation();
        setTimeout(originalHcia, 1000);
        return "🚀 Launching HCIA Quiz with animations...";
    };
}

console.log("✅ Terminal fixes applied");
