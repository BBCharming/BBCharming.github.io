// GUARANTEED WORKING TERMINAL LOADER
console.log("🎯 TERMINAL: Starting initialization...");

function initPortfolioTerminal() {
    console.log("🔧 Initializing terminal...");
    
    const terminalEmbed = document.getElementById('terminalEmbed');
    if (!terminalEmbed) {
        console.log("❌ Terminal container not found");
        return;
    }
    
    console.log("✅ Terminal container found, setting up...");
    
    // Create the terminal UI
    terminalEmbed.innerHTML = `
        <div style="
            background: #1a1a1a; 
            border-radius: 8px; 
            overflow: hidden; 
            font-family: 'Courier New', monospace;
            border: 1px solid #333;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        ">
            <div style="
                background: #2d2d2d; 
                padding: 12px 15px; 
                color: #ccc; 
                border-bottom: 1px solid #333;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div style="font-weight: bold;">Secure Terminal v3.0</div>
                <div style="display: flex; gap: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f57;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #28ca42;"></div>
                </div>
            </div>
            <div style="padding: 15px; background: #000; min-height: 400px;">
                <div id="termOutput" style="
                    color: #00ff00; 
                    margin-bottom: 10px; 
                    height: 340px; 
                    overflow-y: auto; 
                    font-size: 14px; 
                    line-height: 1.4;
                ">
                    <div style="color: #00d4ff;">🎯 Terminal initialized successfully!</div>
                    <div style="color: #00d4ff;">💡 Type 'help' and press Enter to see available commands.</div>
                </div>
                <div style="display: flex; align-items: center; color: #00ff00; font-size: 14px;">
                    <span style="color: #00d4ff;">visitor@portfolio:~$</span>
                    <input type="text" id="termInput" 
                           style="
                                background: transparent; 
                                border: none; 
                                color: #00ff00; 
                                margin-left: 8px; 
                                outline: none; 
                                flex: 1; 
                                font-family: 'Courier New', monospace; 
                                font-size: 14px;
                           "
                           autocomplete="off" 
                           spellcheck="false" 
                           placeholder="Type 'help' for commands">
                </div>
            </div>
        </div>
    `;
    
    // Get references to the new elements
    const output = document.getElementById('termOutput');
    const input = document.getElementById('termInput');
    
    if (!output || !input) {
        console.log("❌ Failed to get terminal elements");
        return;
    }
    
    // Define commands - HELP COMMAND WILL WORK!
    const commands = {
        help: function() {
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

💡 Type any command and press Enter to execute.
            `;
        },
        
        clear: function() {
            output.innerHTML = '<div style="color: #00d4ff;">✅ Terminal cleared. Type "help" for commands.</div>';
            return '';
        },
        
        hcia: function() {
            setTimeout(() => {
                window.open('hcia-quiz-app/index.html', '_blank');
            }, 500);
            return '🚀 Launching HCIA Quiz in new tab...';
        },
        
        quiz: function() {
            return `
📚 HCIA-Datacom Quiz Application
═══════════════════════════════
• 22 Chapters covering all HCIA topics
• 138+ Practice questions with explanations
• Progress tracking and analytics
• Exam simulation mode
• Weak areas identification

🎯 Type 'hcia' to launch the quiz application
            `;
        },
        
        echo: function(args) {
            return args.join(' ');
        },
        
        date: function() {
            return new Date().toString();
        },
        
        version: function() {
            return 'Portfolio Terminal v3.0 - HELP COMMAND GUARANTEED TO WORK ✅';
        },
        
        exit: function() {
            return '💡 Type "clear" to reset the terminal.';
        },
        
        home: function() {
            window.location.hash = 'home';
            return '📍 Navigating to Home section...';
        },
        
        about: function() {
            window.location.hash = 'about';
            return '📍 Navigating to About section...';
        },
        
        projects: function() {
            window.location.hash = 'projects';
            return '📍 Navigating to Projects section...';
        },
        
        contact: function() {
            window.location.hash = 'contact';
            return '📍 Navigating to Contact section...';
        }
    };
    
    // Add output to terminal
    function addOutput(text, type = 'normal') {
        const line = document.createElement('div');
        
        // Color coding
        if (type === 'error') line.style.color = '#ff4444';
        else if (type === 'command') line.style.color = '#888';
        else if (type === 'system') line.style.color = '#00d4ff';
        else line.style.color = '#00ff00';
        
        line.textContent = text;
        output.appendChild(line);
        
        // Auto scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
    
    // Process commands
    function processCommand(fullCommand) {
        if (!fullCommand.trim()) return;
        
        // Show the command that was typed
        addOutput(`visitor@portfolio:~$ ${fullCommand}`, 'command');
        
        const [command, ...args] = fullCommand.split(' ');
        const commandHandler = commands[command];
        
        if (commandHandler) {
            // Simulate processing delay
            setTimeout(() => {
                try {
                    const result = commandHandler(args);
                    if (result) {
                        addOutput(result);
                    }
                } catch (error) {
                    addOutput(`❌ Error: ${error.message}`, 'error');
                }
            }, 50);
        } else {
            setTimeout(() => {
                addOutput(`❌ Command not found: "${command}". Type "help" for available commands.`, 'error');
            }, 50);
        }
    }
    
    // Handle input
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                processCommand(command);
            }
            input.value = ''; // Clear input
            input.focus(); // Keep focus
        }
    });
    
    // Auto-focus input
    input.focus();
    
    console.log("✅ Terminal initialized successfully - HELP COMMAND WILL WORK!");
}

// Auto-initialize when page loads and terminal section is active
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM loaded, checking terminal section...");
    if (window.location.hash === '#terminal') {
        setTimeout(initPortfolioTerminal, 100);
    }
});

// Also initialize when hash changes to terminal
window.addEventListener('hashchange', function() {
    console.log("🔗 Hash changed to:", window.location.hash);
    if (window.location.hash === '#terminal') {
        setTimeout(initPortfolioTerminal, 100);
    }
});

console.log("🔧 Terminal loader ready - HELP COMMAND GUARANTEED TO WORK! 🎯");
