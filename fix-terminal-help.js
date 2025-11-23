// Fix for Portfolio Terminal Help Command
console.log("🔧 Applying help command fix...");

// Override or fix the existing terminal implementation
function fixTerminalHelp() {
    console.log("🎯 Fixing terminal commands...");
    
    // Check if terminal exists and override help command
    if (window.portfolioTerminal && window.portfolioTerminal.commands) {
        console.log("✅ Found portfolio terminal, fixing help command...");
        
        // Fix the help command implementation
        window.portfolioTerminal.commands.help = function() {
            return `
Available Commands:
══════════════════
help      - Show this help message
clear     - Clear terminal screen  
hcia      - Launch HCIA Quiz application
quiz      - Show quiz information
echo      - Echo text
date      - Show current date and time
version   - Show terminal version
exit      - Close terminal session

Portfolio Navigation:
════════════════════
home      - Go to Home section
about     - Go to About section
projects  - Go to Projects section
contact   - Go to Contact section

Type any command and press Enter to execute.
            `;
        };
        
        console.log("✅ Help command fixed");
        
    } else if (window.commands) {
        // Alternative fix for different terminal implementation
        console.log("✅ Found commands object, fixing help...");
        window.commands.help = function() {
            return `
Available Commands:
──────────────────
help     - Show this help
clear    - Clear terminal  
hcia     - Launch HCIA Quiz
quiz     - Quiz information
echo     - Echo text
date     - Current date
version  - Terminal version
exit     - Close terminal

Navigation:
home     - Go to Home
about    - Go to About
projects - Go to Projects
contact  - Go to Contact
            `;
        };
    } else {
        console.log("❌ No terminal found, creating new implementation...");
        createNewTerminal();
    }
}

function createNewTerminal() {
    // Create a fresh terminal implementation
    const terminalEmbed = document.getElementById('terminalEmbed');
    if (!terminalEmbed) return;
    
    terminalEmbed.innerHTML = `
        <div style="background: #1a1a1a; border-radius: 8px; overflow: hidden; font-family: 'Courier New', monospace;">
            <div style="background: #2d2d2d; padding: 10px 15px; color: #ccc; border-bottom: 1px solid #333;">
                Secure Terminal - Type "help" for commands
            </div>
            <div style="padding: 15px; background: #000; min-height: 300px;">
                <div id="fixedTerminalOutput" style="color: #00ff00; margin-bottom: 10px; height: 250px; overflow-y: auto;">
                    <div style="color: #00d4ff;">Terminal initialized. Type "help" for commands.</div>
                </div>
                <div style="display: flex; align-items: center; color: #00ff00;">
                    <span style="color: #00d4ff;">visitor@portfolio:~$</span>
                    <input type="text" id="fixedTerminalInput" 
                           style="background: transparent; border: none; color: #00ff00; margin-left: 8px; outline: none; flex: 1;"
                           autocomplete="off" spellcheck="false">
                </div>
            </div>
        </div>
    `;
    
    initializeFixedTerminal();
}

function initializeFixedTerminal() {
    const output = document.getElementById('fixedTerminalOutput');
    const input = document.getElementById('fixedTerminalInput');
    
    if (!output || !input) return;
    
    const commands = {
        help: () => `
Available Commands:
══════════════════
help      - Show this help message
clear     - Clear terminal screen
hcia      - Launch HCIA Quiz
quiz      - Quiz information
echo      - Echo text
date      - Current date/time
version   - Terminal version
exit      - Close terminal

Portfolio Navigation:
════════════════════
home      - Go to Home
about     - Go to About  
projects  - Go to Projects
contact   - Go to Contact
        `,
        
        clear: () => {
            output.innerHTML = '<div style="color: #00d4ff;">Terminal cleared. Type "help" for commands.</div>';
            return '';
        },
        
        hcia: () => {
            setTimeout(() => {
                window.open('hcia-quiz-app/index.html', '_blank');
            }, 500);
            return '🚀 Launching HCIA Quiz in new tab...';
        },
        
        quiz: () => `
📚 HCIA-Datacom Quiz
═══════════════════
• 22 Chapters, 138+ Questions
• Progress Tracking
• Exam Simulations
• Type "hcia" to launch
        `,
        
        echo: (args) => args.join(' '),
        date: () => new Date().toString(),
        version: () => 'Portfolio Terminal v2.0 (Fixed)',
        exit: () => 'Type "clear" to reset terminal.',
        home: () => { window.location.hash = 'home'; return 'Navigating to Home...'; },
        about: () => { window.location.hash = 'about'; return 'Navigating to About...'; },
        projects: () => { window.location.hash = 'projects'; return 'Navigating to Projects...'; },
        contact: () => { window.location.hash = 'contact'; return 'Navigating to Contact...'; }
    };
    
    function addOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.style.color = type === 'error' ? '#ff4444' : 
                         type === 'command' ? '#888' : 
                         type === 'system' ? '#00d4ff' : '#00ff00';
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
    
    function processCommand(cmd) {
        if (!cmd) return;
        
        addOutput(`visitor@portfolio:~$ ${cmd}`, 'command');
        
        const [command, ...args] = cmd.split(' ');
        const handler = commands[command];
        
        if (handler) {
            setTimeout(() => {
                try {
                    const result = handler(args);
                    if (result) addOutput(result);
                } catch (error) {
                    addOutput(`Error: ${error.message}`, 'error');
                }
            }, 50);
        } else {
            setTimeout(() => {
                addOutput(`Command not found: ${command}. Type "help" for commands.`, 'error');
            }, 50);
        }
    }
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                processCommand(command);
            }
            input.value = '';
        }
    });
    
    input.focus();
    console.log("✅ Fixed terminal initialized");
}

// Apply fixes when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixTerminalHelp);
} else {
    fixTerminalHelp();
}

// Also fix when hash changes to terminal
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#terminal') {
        setTimeout(fixTerminalHelp, 100);
    }
});

console.log("🔧 Help command fix applied");
