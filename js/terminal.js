class Terminal {
    constructor() {
        this.container = document.getElementById('terminal');
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        
        // Target specifically the button in the hero section
        this.triggerBtn = document.querySelector('.hero-actions .btn-primary');
        
        this.commands = {
            'help': this.showHelp,
            'clear': this.clearTerminal,
            'about': this.showAbout,
            'projects': this.showProjects,
            'services': this.showServices,
            'contact': this.showContact,
            'status': this.showStatus,
            'hcia': this.launchHCIACourse,
            './HCIA-Datacom-Quiz': this.launchHCIACourse,
            'echo': this.echoText,
            'date': this.showDate,
            'whoami': this.showUser
        };
        
        this.init();
    }

    init() {
        // Only trigger reveal when the specific HERO button is clicked
        if (this.triggerBtn) {
            this.triggerBtn.addEventListener('click', (e) => {
                // If the link is #terminal, handle it via JS
                if (this.triggerBtn.getAttribute('href') === '#terminal') {
                    e.preventDefault();
                    this.revealTerminal();
                }
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
        // Add the revealed class we created in layout.css
        this.container.classList.add('revealed');
        
        // Smooth scroll
        this.container.scrollIntoView({ behavior: 'smooth' });
        
        // Focus cursor
        setTimeout(() => this.input.focus(), 600);
    }

    // ... Keep all your existing addLine, showHelp, and command functions below ...
}

document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});