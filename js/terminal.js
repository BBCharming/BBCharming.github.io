// Terminal Command System
class Terminal {
    constructor() {
        this.container = document.getElementById('terminal');
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        
        // Specifically target the "Access Terminal" button in the hero
        this.triggerBtn = document.querySelector('.hero-actions .btn-primary');
        
        // Command Mapping
        this.commands = {
            'help': this.showHelp.bind(this),
            'clear': this.clearTerminal.bind(this),
            'about': this.showAbout.bind(this),
            'projects': this.showProjects.bind(this),
            'services': this.showServices.bind(this),
            'contact': this.showContact.bind(this),
            'status': this.showStatus.bind(this),
            'hcia': this.launchHCIACourse.bind(this),
            './hcia-datacom-quiz': this.launchHCIACourse.bind(this),
            'quiz': this.launchHCIACourse.bind(this),
            'date': this.showDate.bind(this),
            'whoami': this.showUser.bind(this)
        };
        
        this.init();
    }

    init() {
        // Handle Reveal Logic
        if (this.triggerBtn) {
            this.triggerBtn.addEventListener('click', (e) => {
                if (this.triggerBtn.getAttribute('href') === '#terminal') {
                    e.preventDefault();
                    this.revealTerminal();
                }
            });
        }

        // Handle Command Input
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.input.value.trim();
                this.processCommand(cmd);
                this.input.value = ''; // Clear input after enter
            }
        });
    }

    revealTerminal() {
        this.container.classList.add('revealed');
        this.container.scrollIntoView({ behavior: 'smooth' });
        
        // Initializing text
        if (this.output.innerHTML === '') {
            this.showWelcome();
        }
        
        setTimeout(() => this.input.focus(), 600);
    }

    processCommand(cmd) {
        if (!cmd) return;

        // Print the command entered
        this.addLine(`<span class="accent">$ ${cmd}</span>`);
        
        const args = cmd.toLowerCase().split(' ');
        const mainCommand = args[0];
        const handler = this.commands[mainCommand];
        
        if (handler) {
            handler(args.slice(1));
        } else {
            this.addLine(`Command not found: ${mainCommand}. Type 'help' for available commands.`);
        }
        
        this.scrollToBottom();
    }

    // --- Command Functions ---

    showWelcome() {
        this.addLine('Welcome to BB Charming\'s Cyber Domain');
        this.addLine('Type <span class="accent">help</span> for available commands');
    }

    showHelp() {
        this.addLine('<strong>Available Commands:</strong>');
        this.addLine('  <span class="accent">about</span>, <span class="accent">projects</span>, <span class="accent">services</span>, <span class="accent">status</span>, <span class="accent">hcia</span>, <span class="accent">contact</span>, <span class="accent">clear</span>, <span class="accent">date</span>');
    }

    showAbout() {
        this.addLine('<strong>BB Charming - The Charming Hacker</strong>');
        this.addLine('Cybersecurity Enthusiast • Developer • Tech Problem Solver');
    }

    showProjects() {
        this.addLine('<strong>Featured Projects:</strong>');
        this.addLine(' • HCIA-Datacom Quiz (Command: <span class="accent">hcia</span>)');
        this.addLine(' • Mwaba AI Assistant');
        this.addLine(' • Cyber Range Lab');
    }

    showServices() {
        this.addLine('<strong>Services:</strong>');
        this.addLine(' • Cybersecurity Assessments');
        this.addLine(' • Web Development');
        this.addLine(' • Hardware Solutions');
    }

    showStatus() {
        this.addLine('System Status: <span class="success">ONLINE</span>');
        this.addLine('Security Protocols: <span class="success">ACTIVE</span>');
    }

    launchHCIACourse() {
        this.addLine('🚀 Launching HCIA-Datacom Quiz System...');
        setTimeout(() => {
            window.open('hcia-quiz-app/index.html', '_blank');
        }, 500);
    }

    showContact() {
        this.addLine('Email: charming.hacker@domain.com');
        this.addLine('GitHub: github.com/bbcharming');
    }

    showDate() {
        this.addLine(new Date().toString());
    }

    showUser() {
        this.addLine('charming-hacker');
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    // --- Utilities ---

    addLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        this.output.appendChild(line);
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});