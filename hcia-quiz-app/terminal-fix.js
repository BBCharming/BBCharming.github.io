// Terminal Logic and Animation Fixes
console.log("🔧 Applying terminal logic fixes...");

// Enhanced command processing with better animations
function enhanceTerminalLogic() {
    console.log("🎯 Enhancing terminal commands and animations...");
    
    // Store original commands if they exist
    const originalCommands = window.commands || {};
    
    // Enhanced command definitions with better animations
    window.commands = {
        help: function() {
            typeWriterOutput(`
Available Commands:
==================
help     - Show this help message
clear    - Clear terminal screen
hcia     - Launch HCIA Quiz application
quiz     - Show quiz information
echo     - Echo text
date     - Show current date and time
version  - Show terminal version
exit     - Exit terminal

Navigation:
↑/↓      - Command history
Tab      - Auto-complete
Enter    - Execute command
            `, 10);
        },
        
        clear: function() {
            const output = document.getElementById('terminal-output');
            if (output) {
                output.innerHTML = '';
                addToTerminal('Terminal cleared.', 'system');
            }
        },
        
        hcia: function() {
            showEnhancedLaunchAnimation();
        },
        
        quiz: function() {
            typeWriterOutput(`
HCIA-Datacom Quiz Information
=============================
• 22 Chapters covering all HCIA topics
• 138+ Practice questions
• Progress tracking
• Exam simulation
• Weak areas analysis

Type 'hcia' to launch the quiz application
            `, 15);
        },
        
        echo: function(args) {
            if (args.length > 0) {
                addToTerminal(args.join(' '));
            }
        },
        
        date: function() {
            const now = new Date();
            addToTerminal(now.toString(), 'info');
        },
        
        version: function() {
            addToTerminal('Secure Terminal v2.1.0', 'info');
            addToTerminal('Enhanced with smooth animations', 'system');
        },
        
        exit: function() {
            typeWriterOutput('Closing terminal session...', 20, function() {
                addToTerminal('Session ended. Refresh page to restart.', 'system');
            });
        }
    };
    
    // Enhanced launch animation
    function showEnhancedLaunchAnimation() {
        console.log("🚀 Starting enhanced launch animation...");
        
        // Create overlay for animation
        const overlay = document.createElement('div');
        overlay.style.cssText = `
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
            font-family: 'Courier New', monospace;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2.5em; margin-bottom: 20px; background: linear-gradient(135deg, #00d4ff, #a96bff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: pulse 2s infinite;">
                    HCIA-Datacom
                </div>
                <div style="font-size: 1.2em; margin-bottom: 30px; color: #00d4ff;">Quiz Application</div>
                <div style="font-size: 0.9em; color: #94a3b8; margin-bottom: 20px;" id="status-message">Initializing quiz engine...</div>
                <div style="width: 300px; height: 6px; background: #2c3e50; border-radius: 3px; margin: 0 auto; overflow: hidden;">
                    <div id="loading-bar" style="width: 0%; height: 100%; background: linear-gradient(135deg, #00d4ff, #a96bff); transition: width 0.3s ease;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Enhanced loading sequence
        const statusMessages = [
            "Loading question database...",
            "Initializing progress tracker...",
            "Setting up exam sessions...",
            "Preparing user interface...",
            "Almost ready..."
        ];
        
        let currentStep = 0;
        const loadingBar = document.getElementById('loading-bar');
        const statusElement = document.getElementById('status-message');
        
        const loadingInterval = setInterval(() => {
            if (currentStep < statusMessages.length) {
                // Update status message with typewriter effect
                typeWriterElement(statusElement, statusMessages[currentStep], 30);
                
                // Update progress bar
                const progress = ((currentStep + 1) / statusMessages.length) * 100;
                loadingBar.style.width = `${progress}%`;
                
                currentStep++;
            } else {
                clearInterval(loadingInterval);
                
                // Final completion
                loadingBar.style.width = '100%';
                typeWriterElement(statusElement, "✅ Ready! Redirecting...", 20, function() {
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        overlay.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            overlay.remove();
                            // Redirect to actual quiz
                            window.location.href = 'index.html';
                        }, 500);
                    }, 1000);
                });
            }
        }, 800);
    }
    
    // Enhanced typewriter effect for output
    function typeWriterOutput(text, speed = 20, callback = null) {
        const output = document.getElementById('terminal-output');
        if (!output) return;
        
        const line = document.createElement('div');
        line.className = 'output-line';
        output.appendChild(line);
        
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
                
                // Scroll to bottom
                output.scrollTop = output.scrollTop + 100;
            } else if (callback) {
                callback();
            }
        }
        typeChar();
    }
    
    // Typewriter effect for specific element
    function typeWriterElement(element, text, speed = 20, callback = null) {
        element.textContent = '';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else if (callback) {
                callback();
            }
        }
        typeChar();
    }
    
    // Enhanced input handling
    function enhanceInputHandling() {
        const input = document.getElementById('command-input');
        if (!input) return;
        
        // Remove existing event listeners by cloning
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        let commandHistory = [];
        let historyIndex = -1;
        let currentInput = '';
        
        newInput.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    processEnhancedCommand(newInput.value.trim());
                    newInput.value = '';
                    currentInput = '';
                    historyIndex = commandHistory.length;
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (commandHistory.length > 0) {
                        historyIndex = Math.max(historyIndex - 1, 0);
                        newInput.value = commandHistory[historyIndex] || '';
                        currentInput = newInput.value;
                    }
                    break;
                    
                case 'ArrowDown':
                    e.preventDefault();
                    if (commandHistory.length > 0) {
                        historyIndex = Math.min(historyIndex + 1, commandHistory.length);
                        newInput.value = commandHistory[historyIndex] || '';
                        currentInput = newInput.value;
                        if (historyIndex === commandHistory.length) {
                            newInput.value = '';
                            currentInput = '';
                        }
                    }
                    break;
                    
                case 'Tab':
                    e.preventDefault();
                    autoCompleteCommand(newInput);
                    break;
            }
        });
        
        newInput.addEventListener('input', function(e) {
            currentInput = e.target.value;
        });
    }
    
    function processEnhancedCommand(command) {
        if (!command) return;
        
        // Add to output
        addToTerminal(`user@terminal:~$ ${command}`, 'command');
        
        // Add to history
        if (window.commandHistory) {
            window.commandHistory.push(command);
        }
        
        // Process command
        const [cmd, ...args] = command.split(' ');
        const commandHandler = window.commands[cmd];
        
        if (commandHandler) {
            // Simulate processing delay for realism
            setTimeout(() => {
                commandHandler(args);
            }, 100);
        } else {
            setTimeout(() => {
                addToTerminal(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
            }, 100);
        }
    }
    
    function autoCompleteCommand(input) {
        const current = input.value.toLowerCase();
        const matches = Object.keys(window.commands).filter(cmd => 
            cmd.startsWith(current)
        );
        
        if (matches.length === 1) {
            input.value = matches[0];
            input.setSelectionRange(matches[0].length, matches[0].length);
        } else if (matches.length > 1) {
            addToTerminal(matches.join('  '), 'system');
        }
    }
    
    // Enhanced addToTerminal with smooth scrolling
    function addToTerminal(text, type = 'normal') {
        const output = document.getElementById('terminal-output');
        if (!output) return;
        
        const line = document.createElement('div');
        line.className = `output-line ${type}-message`;
        line.textContent = text;
        output.appendChild(line);
        
        // Smooth scroll to bottom
        output.scrollTo({
            top: output.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // Apply enhancements
    enhanceInputHandling();
    
    console.log("✅ Terminal logic and animations enhanced");
}

// Wait for terminal to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceTerminalLogic);
} else {
    enhanceTerminalLogic();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px #00d4ff; }
        50% { text-shadow: 0 0 20px #00d4ff, 0 0 30px #00d4ff; }
    }
    
    .output-line {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .command-line {
        animation: glow 2s infinite;
    }
`;
document.head.appendChild(style);

console.log("🎨 CSS animations added");
