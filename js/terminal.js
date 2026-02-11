class Terminal {
    constructor() {
        this.container = document.getElementById('terminal');
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.triggerBtn = document.querySelector('a[href="#terminal"]');
        
        this.commands = {
            'help': this.showHelp,
            'clear': this.clearTerminal,
            'about': this.showAbout,
            'projects': this.showProjects,
            'status': this.showStatus,
            'hcia': this.launchHCIACourse,
            // ... add your other commands here
        };
        
        this.init();
    }

    init() {
        // Handle the "Access Terminal" button click
        if (this.triggerBtn) {
            this.triggerBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the page from jumping instantly
                this.revealTerminal();
            });
        }

        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            }
        });
    }

    revealTerminal() {
        // 1. Show the hidden section
        this.container.classList.add('revealed');
        
        // 2. Clear previous output and show welcome message once
        this.output.innerHTML = '';
        this.showWelcome();
        
        // 3. Smoothly scroll to the terminal
        this.container.scrollIntoView({ behavior: 'smooth' });
        
        // 4. Focus the input so the user can type immediately
        setTimeout(() => this.input.focus(), 600);
    }

    showWelcome() {
        this.addLine('<span class="success">$ BB Charming OS initialized...</span>');
        this.addLine('$ Type "help" for a list of commands.');
    }

    addLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    processCommand(cmd) {
        if (!cmd) return;
        this.addLine(`<span class="accent">$ ${cmd}</span>`);
        const handler = this.commands[cmd.toLowerCase()];
        if (handler) {
            handler.call(this);
        } else {
            this.addLine(`Command not found: ${cmd}`);
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    showHelp() {
        this.addLine('Available: help, about, projects, status, hcia, clear');
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    // ... (Keep your other existing command functions like showAbout, showStatus, etc.)
}

document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});