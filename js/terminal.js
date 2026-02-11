// Terminal Command System
class Terminal {
    constructor() {
        this.container = document.getElementById('terminal'); // The section wrapper
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.commands = {
            'help': this.showHelp,
            'clear': this.clearTerminal,
            'about': this.showAbout,
            'projects': this.showProjects,
            'services': this.showServices,
            'contact': this.showContact,
            'status': this.showStatus,
            './HCIA-Datacom-Quiz': this.launchHCIACourse,
            'hcia': this.launchHCIACourse,
            'quiz': this.launchHCIACourse,
            'echo': this.echoText,
            'date': this.showDate,
            'whoami': this.showUser,
            'banner': this.showBanner
        };
        
        this.init();
        this.setupRevealListener();
    }

    init() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            }
        });

        this.showWelcome();
    }

    setupRevealListener() {
        // Find the "Access Terminal" button in the hero
        const accessBtn = document.querySelector('a[href="#terminal"]');
        if (accessBtn) {
            accessBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.revealTerminal();
            });
        }

        // Listen for a custom event from the Navbar
        document.addEventListener('reveal-terminal', () => this.revealTerminal());

        // Show automatically if URL ends in #terminal
        if (window.location.hash === '#terminal') {
            setTimeout(() => this.revealTerminal(), 500);
        }
    }

    revealTerminal() {
        if (this.container) {
            this.container.classList.add('is-visible');
            this.container.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.input.focus(), 600);
        }
    }

    processCommand(cmd) {
        this.addLine(`$ ${cmd}`);
        const [command, ...args] = cmd.split(' ');
        const handler = this.commands[command.toLowerCase()];
        if (handler) {
            handler.call(this, args);
        } else if (cmd) {
            this.addLine(`Command not found: ${command}. Type 'help' for available commands.`);
        }
        this.scrollToBottom();
    }

    launchHCIACourse(args) {
        this.addLine('🚀 Launching HCIA-Datacom Quiz System...');
        setTimeout(() => {
            window.open('hcia-quiz-app/index.html', '_blank');
            this.addLine('<span class="success">✅ HCIA Quiz launched in new tab!</span>');
        }, 1000);
    }

    showHelp() {
        this.addLine('<strong>Available Commands:</strong>');
        this.addLine('  <span class="accent">help, clear, about, projects, services, contact, status, hcia, date, whoami</span>');
    }

    showAbout() {
        this.addLine('<strong>BB Charming - The Charming Hacker</strong>');
        this.addLine('Cybersecurity Enthusiast • Developer • Tech Problem Solver');
    }

    showProjects() {
        this.addLine('<strong>Featured Projects:</strong>');
        this.addLine('  • HCIA-Datacom Quiz System (Command: <span class="accent">hcia</span>)');
        this.addLine('  • Mwaba AI Assistant');
    }

    showServices() {
        this.addLine('<strong>Services Offered:</strong>');
        this.addLine('  • Cybersecurity Assessments, Web Dev, Hardware Solutions');
    }

    showContact() {
        this.addLine('<strong>Contact:</strong> charming.hacker@domain.com');
    }

    showStatus() {
        this.addLine('<strong>System Status:</strong> <span class="success">ONLINE</span>');
    }

    echoText(args) { this.addLine(args.join(' ')); }
    showDate() { this.addLine(new Date().toString()); }
    showUser() { this.addLine('charming-hacker'); }
    showBanner() { this.addLine('BB CHARMING - CYBER DOMAIN'); }
    clearTerminal() { this.output.innerHTML = ''; }

    showWelcome() {
        this.addLine('Welcome to BB Charming\'s Cyber Domain');
        this.addLine('Type <span class="accent">help</span> for available commands');
    }

    addLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        this.output.appendChild(line);
    }

    scrollToBottom() { this.output.scrollTop = this.output.scrollHeight; }
}

document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});