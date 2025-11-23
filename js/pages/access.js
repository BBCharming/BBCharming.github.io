// Access Portal Logic
class AccessPortal {
    constructor() {
        this.input = document.getElementById('portalInput');
        this.output = document.getElementById('portalOutput');
        this.attempts = 0;
        this.maxAttempts = 3;
        this.correctPassphrase = "charming";
        this.alternatePassphrase = "hacker";
        
        this.init();
    }

    init() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processInput(this.input.value.trim());
                this.input.value = '';
            }
        });

        this.input.focus();
        this.showWelcome();
    }

    showWelcome() {
        this.addOutput('$ Initializing secure connection...');
        this.addOutput('$ BB Charming Access Portal v1.0');
        this.addOutput('$ Enter passphrase to continue');
    }

    processInput(input) {
        this.addOutput(`> ${'*'.repeat(input.length)}`);
        
        if (input.toLowerCase() === this.correctPassphrase || input.toLowerCase() === this.alternatePassphrase) {
            this.grantAccess();
        } else {
            this.attempts++;
            this.handleFailedAttempt();
        }
    }

    grantAccess() {
        this.addOutput('<span class="success">$ Access granted! Welcome, authorized user.</span>');
        this.addOutput('$ Loading secure dashboard...');
        
        setTimeout(() => {
            document.body.classList.add('portal-success');
            this.addOutput('<span class="success">$ Secure connection established</span>');
            this.addOutput('$ Available commands:');
            this.addOutput('  - connect mainframe');
            this.addOutput('  - view projects');
            this.addOutput('  - access terminal');
            this.addOutput('  - system status');
            this.addOutput('');
            this.addOutput('💡 Type any command or visit the main site for full access');
            
            // Enable command mode
            this.input.placeholder = "Enter command...";
            this.input.type = "text";
            this.setupCommandMode();
        }, 1000);
    }

    handleFailedAttempt() {
        const remainingAttempts = this.maxAttempts - this.attempts;
        
        if (remainingAttempts > 0) {
            this.addOutput(`<span class="error">$ Access denied. ${remainingAttempts} attempt(s) remaining.</span>`);
            this.addOutput('$ Hint: Think about what makes this hacker "charming"');
        } else {
            this.addOutput('<span class="error">$ Maximum attempts exceeded. System locked.</span>');
            this.addOutput('$ Please contact administrator for access reset');
            this.input.disabled = true;
            
            setTimeout(() => {
                this.addOutput('$ System will reset in 10 seconds...');
                setTimeout(() => {
                    window.location.reload();
                }, 10000);
            }, 2000);
        }
    }

    setupCommandMode() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim().toLowerCase();
                this.processCommand(command);
                this.input.value = '';
            }
        });
    }

    processCommand(command) {
        this.addOutput(`$ ${command}`);
        
        switch(command) {
            case 'connect mainframe':
                this.addOutput('$ Connecting to mainframe...');
                setTimeout(() => {
                    this.addOutput('<span class="success">$ Mainframe connection established</span>');
                }, 1000);
                break;
                
            case 'view projects':
                this.addOutput('$ Redirecting to projects...');
                setTimeout(() => {
                    window.open('projects.html', '_blank');
                }, 500);
                break;
                
            case 'access terminal':
                this.addOutput('$ Opening main terminal...');
                setTimeout(() => {
                    window.open('index.html#terminal', '_blank');
                }, 500);
                break;
                
            case 'system status':
                this.addOutput('$ System Status:');
                this.addOutput('  - Core: <span class="success">ONLINE</span>');
                this.addOutput('  - Security: <span class="success">ACTIVE</span>');
                this.addOutput('  - Database: <span class="success">SECURE</span>');
                this.addOutput('  - Network: <span class="success">STABLE</span>');
                break;
                
            case 'help':
                this.addOutput('$ Available commands:');
                this.addOutput('  - connect mainframe');
                this.addOutput('  - view projects');
                this.addOutput('  - access terminal');
                this.addOutput('  - system status');
                this.addOutput('  - help');
                break;
                
            default:
                if (command) {
                    this.addOutput(`$ Unknown command: ${command}. Type 'help' for available commands.`);
                }
        }
    }

    addOutput(text) {
        const line = document.createElement('div');
        line.className = 'portal-line';
        line.innerHTML = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Initialize access portal
document.addEventListener('DOMContentLoaded', () => {
    new AccessPortal();
});
