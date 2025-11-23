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
        const handler = this.commands[command.toLowerCase()];
        
        if (handler) {
            handler.call(this, args);
        } else if (cmd) {
            this.addLine(`Command not found: ${command}. Type 'help' for available commands.`);
        }
        
        this.scrollToBottom();
    }

    // HCIA Quiz Command - ACTUAL LAUNCH
    launchHCIACourse(args) {
        this.addLine('🚀 Launching HCIA-Datacom Quiz System...');
        this.addLine('Initializing certification preparation module...');
        
        setTimeout(() => {
            this.addLine('<span class="success">✅ HCIA Quiz WebApp Ready!</span>');
            this.addLine('Opening quiz interface...');
            
            // ACTUALLY REDIRECT TO QUIZ
            window.open('hcia-quiz-app/index.html', '_blank');
            this.addLine('📚 <strong>HCIA Quiz launched in new tab!</strong>');
            this.addLine('💡 <strong>Features available:</strong>');
            this.addLine('   • Chapter-by-chapter quizzes (22 chapters)');
            this.addLine('   • Random question tests');
            this.addLine('   • Final exam simulation');
            this.addLine('   • Progress tracking with localStorage');
            this.addLine('');
            this.addLine('🎯 <strong>Access directly at:</strong> <span class="accent">/hcia-quiz-app/index.html</span>');
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
        this.addLine('  <span class="accent">echo [text]</span>   - Echo text back');
        this.addLine('  <span class="accent">date</span>          - Show current date');
        this.addLine('  <span class="accent">whoami</span>        - Show current user');
        this.addLine('  <span class="accent">banner</span>        - Show system banner');
    }

    showAbout() {
        this.addLine('<strong>BB Charming - The Charming Hacker</strong>');
        this.addLine('Cybersecurity Enthusiast • Developer • Tech Problem Solver');
        this.addLine('');
        this.addLine('🔐 <strong>Specialties:</strong>');
        this.addLine('   - Network Security & Penetration Testing');
        this.addLine('   - Web Application Development');
        this.addLine('   - Hardware Troubleshooting & Repair');
        this.addLine('   - Certification Preparation (HCIA, Security+)');
        this.addLine('');
        this.addLine('🎯 <strong>Currently pursuing:</strong> Bachelor of Arts in Computer Science');
        this.addLine('🏠 <strong>Base of Operations:</strong> Digital Realm (Zambian National)');
    }

    showProjects() {
        this.addLine('<strong>Featured Projects:</strong>');
        this.addLine('  <span class="accent">• HCIA-Datacom Quiz System</span>');
        this.addLine('    - Interactive certification preparation platform');
        this.addLine('    - 22 chapters, progress tracking, exam simulation');
        this.addLine('    - <span class="accent">Command: ./HCIA-Datacom-Quiz</span>');
        this.addLine('');
        this.addLine('  <span class="accent">• Mwaba AI Assistant</span>');
        this.addLine('    - Voice-controlled personal assistant');
        this.addLine('    - WhatsApp auto-reply system');
        this.addLine('');
        this.addLine('  <span class="accent">• Cyber Range Lab</span>');
        this.addLine('    - Virtual penetration testing environment');
        this.addLine('    - Network security simulations');
        this.addLine('');
        this.addLine('💡 Type <span class="accent">./HCIA-Datacom-Quiz</span> to explore the quiz project!');
    }

    showServices() {
        this.addLine('<strong>Services Offered:</strong>');
        this.addLine('  <span class="accent">• Cybersecurity Assessments</span>');
        this.addLine('    - Vulnerability scanning & penetration testing');
        this.addLine('    - Network security audits');
        this.addLine('');
        this.addLine('  <span class="accent">• Web Development</span>');
        this.addLine('    - Responsive website design');
        this.addLine('    - Interactive web applications');
        this.addLine('');
        this.addLine('  <span class="accent">• Hardware Solutions</span>');
        this.addLine('    - PC repair & troubleshooting');
        this.addLine('    - System optimization');
        this.addLine('');
        this.addLine('  <span class="accent">• Training & Tutoring</span>');
        this.addLine('    - HCIA-Datacom certification prep');
        this.addLine('    - Cybersecurity fundamentals');
    }

    showContact() {
        this.addLine('<strong>Contact Information:</strong>');
        this.addLine('  <span class="accent">• Email:</span> charming.hacker@domain.com');
        this.addLine('  <span class="accent">• GitHub:</span> github.com/bbcharming');
        this.addLine('  <span class="accent">• LinkedIn:</span> linkedin.com/in/bbcharming');
        this.addLine('  <span class="accent">• Portfolio:</span> bbcharming.github.io');
        this.addLine('');
        this.addLine('💼 <strong>Available for:</strong> Freelance projects, collaborations, tech discussions');
    }

    showStatus() {
        this.addLine('<strong>System Status:</strong>');
        this.addLine('  <span class="success">●</span> Core Systems: ONLINE');
        this.addLine('  <span class="success">●</span> Security Protocols: ACTIVE');
        this.addLine('  <span class="success">●</span> HCIA Quiz Module: READY');
        this.addLine('  <span class="success">●</span> Project Portfolio: LOADED');
        this.addLine('  <span class="success">●</span> Contact Systems: OPERATIONAL');
        this.addLine('');
        this.addLine('🎯 <strong>Current Focus:</strong> HCIA-Datacom Certification Preparation');
        this.addLine('🚀 <strong>Next Project:</strong> Advanced Network Security Lab');
    }

    // Utility commands
    echoText(args) {
        this.addLine(args.join(' '));
    }

    showDate() {
        this.addLine(new Date().toString());
    }

    showUser() {
        this.addLine('charming-hacker');
    }

    showBanner() {
        this.addLine('╔══════════════════════════════════════════════════════════════╗');
        this.addLine('║                   BB CHARMING - CYBER DOMAIN                ║');
        this.addLine('║                 "The Charming Hacker"                       ║');
        this.addLine('║                                                              ║');
        this.addLine('║  🔐 Cybersecurity | 💻 Development | 🛠️ Hardware           ║');
        this.addLine('║  🎯 HCIA-Datacom | 🤖 AI Systems | 🌐 Web Solutions         ║');
        this.addLine('║                                                              ║');
        this.addLine('║  Type <span class="accent">help</span> for available commands                    ║');
        this.addLine('║  Try <span class="accent">./HCIA-Datacom-Quiz</span> for certification prep     ║');
        this.addLine('╚══════════════════════════════════════════════════════════════╝');
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    showWelcome() {
        this.addLine('Welcome to BB Charming\'s Cyber Domain');
        this.addLine('Type <span class="accent">help</span> for available commands');
        this.addLine('Try <span class="accent">./HCIA-Datacom-Quiz</span> to launch certification preparation');
    }

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

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
