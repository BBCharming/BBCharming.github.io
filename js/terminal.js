// Terminal Command System
class Terminal {
    constructor() {
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
    }

    init() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            }
        });

        this.input.focus();
        this.showWelcome();
    }

    processCommand(cmd) {
        this.addLine(`$ ${cmd}`);
        
        const [command, ...args] = cmd.split(' ');
        const handler = this.commands[command];
        
        if (!handler && this.commands[command.toLowerCase()]) {
            // Try lowercase version
            handler = this.commands[command.toLowerCase()];
        }
        
        if (handler) {
            handler.call(this, args);
        } else if (cmd) {
            this.addLine(`Command not found: ${command}. Type 'help' for available commands.`);
        }
        
        this.scrollToBottom();
    }

    // HCIA Quiz Command - ACTUALLY LAUNCHES QUIZ
    launchHCIACourse(args) {
        this.addLine('🚀 Launching HCIA-Datacom Quiz System...');
        this.addLine('Initializing certification preparation module...');
        
        setTimeout(() => {
            this.addLine('<span class="success">✅ HCIA Quiz WebApp Ready!</span>');
            this.addLine('Opening quiz interface...');
            
            // ACTUALLY OPEN THE QUIZ IN NEW TAB/WINDOW
            const quizUrl = window.location.href.includes('github.io') 
                ? '/hcia-quiz-app/index.html'
                : 'hcia-quiz-app/index.html';
            
            window.open(quizUrl, '_blank');
            
            this.addLine('📚 <strong>HCIA Quiz launched in new tab!</strong>');
            this.addLine('💡 Type <span class="accent">help</span> for more commands');
        }, 1000);
    }

    showHelp() {
        this.addLine('<strong>Available Commands:</strong>');
        this.addLine('  <span class="accent">help</span>          - Show this help message');
        this.addLine('  <span class="accent">clear</span>         - Clear terminal screen');
        this.addLine('  <span class="accent">about</span>         - About BB Charming');
        this.addLine('  <span class="accent">projects</span>      - View featured projects');
        this.addLine('  <span class="accent">services</span>      - Available services');
        this.addLine('  <span class="accent">contact</span>       - Contact information');
        this.addLine('  <span class="accent">status</span>        - System status');
        this.addLine('  <span class="accent">./HCIA-Datacom-Quiz</span> - Launch HCIA certification quiz');
        this.addLine('  <span class="accent">hcia</span>          - Alias for HCIA quiz');
        this.addLine('  <span class="accent">quiz</span>          - Alias for HCIA quiz');
        this.addLine('  <span class="accent">echo [text]</span>   - Echo text back');
        this.addLine('  <span class="accent">date</span>          - Show current date');
        this.addLine('  <span class="accent">whoami</span>        - Show current user');
        this.addLine('  <span class="accent">banner</span>        - Show system banner');
    }

    // [Include all other existing functions...]
    showAbout() { /* existing code */ }
    showProjects() { /* existing code */ }
    showServices() { /* existing code */ }
    showContact() { /* existing code */ }
    showStatus() { /* existing code */ }
    echoText(args) { /* existing code */ }
    showDate() { /* existing code */ }
    showUser() { /* existing code */ }
    showBanner() { /* existing code */ }
    clearTerminal() { /* existing code */ }
    showWelcome() { /* existing code */ }
    addLine(text) { /* existing code */ }
    scrollToBottom() { /* existing code */ }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
