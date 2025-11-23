// Terminal Loader for Portfolio Website
console.log("🔧 Loading portfolio terminal...");

class PortfolioTerminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.commands = {};
        this.history = [];
        this.init();
    }

    init() {
        this.setupTerminal();
        this.setupCommands();
        this.showWelcome();
    }

    setupTerminal() {
        this.container.innerHTML = `
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="terminal-title">Secure Terminal</div>
                    <div class="terminal-controls">
                        <span class="control minimize"></span>
                        <span class="control maximize"></span>
                        <span class="control close"></span>
                    </div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-output" id="termOutput"></div>
                    <div class="terminal-input-line">
                        <span class="prompt">visitor@portfolio:~$</span>
                        <input type="text" class="terminal-input" id="termInput" autocomplete="off" spellcheck="false">
                        <span class="cursor">|</span>
                    </div>
                </div>
            </div>
        `;

        this.output = document.getElementById('termOutput');
        this.input = document.getElementById('termInput');
        
        this.setupEventListeners();
        this.applyStyles();
    }

    applyStyles() {
        const styles = `
            .terminal-window {
                background: #1a1a1a;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .terminal-header {
                background: #2d2d2d;
                padding: 10px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #333;
            }
            .terminal-title {
                color: #ccc;
                font-size: 14px;
                font-weight: bold;
            }
            .terminal-controls {
                display: flex;
                gap: 8px;
            }
            .control {
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            .control.close { background: #ff5f57; }
            .control.minimize { background: #ffbd2e; }
            .control.maximize { background: #28ca42; }
            .terminal-body {
                padding: 15px;
                background: #000;
                min-height: 400px;
            }
            .terminal-output {
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 10px;
                max-height: 350px;
                overflow-y: auto;
            }
            .terminal-input-line {
                display: flex;
                align-items: center;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 14px;
            }
            .prompt {
                color: #00d4ff;
                margin-right: 8px;
            }
            .terminal-input {
                background: transparent;
                border: none;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                outline: none;
                flex: 1;
            }
            .cursor {
                animation: blink 1s infinite;
                color: #00ff00;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        // Focus input when terminal is clicked
        this.container.addEventListener('click', () => {
            this.input.focus();
        });
    }

    setupCommands() {
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clearTerminal(),
            hcia: () => this.launchHciaQuiz(),
            quiz: () => this.showQuizInfo(),
            echo: (args) => args.join(' '),
            date: () => new Date().toString(),
            version: () => 'Portfolio Terminal v2.0',
            exit: () => 'Type "clear" to reset terminal.',
            home: () => window.location.hash = '#home',
            about: () => window.location.hash = '#about',
            projects: () => window.location.hash = '#projects',
            contact: () => window.location.hash = '#contact'
        };
    }

    processCommand(command) {
        if (!command) return;

        this.addOutput(`visitor@portfolio:~$ ${command}`, 'command');
        this.history.push(command);

        const [cmd, ...args] = command.split(' ');
        const handler = this.commands[cmd];

        if (handler) {
            setTimeout(() => {
                try {
                    const result = handler(args);
                    if (result) this.addOutput(result);
                } catch (error) {
                    this.addOutput(`Error: ${error.message}`, 'error');
                }
            }, 100);
        } else {
            setTimeout(() => {
                this.addOutput(`Command not found: ${cmd}. Type 'help' for commands.`, 'error');
            }, 100);
        }
    }

    addOutput(text, type = 'normal') {
        const line = document.createElement('div');
        
        switch(type) {
            case 'error': line.style.color = '#ff4444'; break;
            case 'command': line.style.color = '#888'; break;
            case 'system': line.style.color = '#00d4ff'; break;
            default: line.style.color = '#00ff00';
        }
        
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    navigateHistory(direction) {
        // Simple history navigation
    }

    autoComplete() {
        // Simple auto-complete
    }

    showWelcome() {
        this.addOutput('Welcome to BBCharming Portfolio Terminal', 'system');
        this.addOutput('Type "help" to see available commands', 'system');
        this.addOutput('');
    }

    showHelp() {
        return `
Available Commands:
──────────────────
help      - Show this help message
clear     - Clear terminal screen
hcia      - Launch HCIA Quiz application
quiz      - Show quiz information
echo      - Echo text
date      - Show current date and time
version   - Show terminal version
exit      - Close terminal session

Portfolio Navigation:
────────────────────
home      - Go to Home section
about     - Go to About section  
projects  - Go to Projects section
contact   - Go to Contact section
        `;
    }

    launchHciaQuiz() {
        this.addOutput('🚀 Launching HCIA-Datacom Quiz...', 'system');
        this.addOutput('Opening in new tab...', 'system');
        
        setTimeout(() => {
            window.open('hcia-quiz-app/index.html', '_blank');
        }, 1000);
        
        return '✅ Quiz launched successfully!';
    }

    showQuizInfo() {
        return `
📚 HCIA-Datacom Quiz Application
────────────────────────────────
• Comprehensive exam preparation
• 138+ practice questions
• Progress tracking
• 22 chapters coverage
• Exam simulation mode

Type 'hcia' to launch the quiz application
        `;
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.showWelcome();
        return 'Terminal cleared.';
    }
}

// Initialize when terminal section is active
function initPortfolioTerminal() {
    if (document.getElementById('terminalEmbed') && !window.portfolioTerminal) {
        window.portfolioTerminal = new PortfolioTerminal('terminalEmbed');
    }
}

// Auto-initialize when hash changes to terminal
if (window.location.hash === '#terminal') {
    setTimeout(initPortfolioTerminal, 100);
}

// Export for global access
window.initPortfolioTerminal = initPortfolioTerminal;
