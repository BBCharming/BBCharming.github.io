// DEBUG: Terminal Loader
console.log("🔧 DEBUG: Terminal Loader Starting...");

// Override or fix any existing terminal
function debugTerminal() {
    console.log("🎯 DEBUG: Checking terminal state...");
    
    const terminalEmbed = document.getElementById('terminalEmbed');
    console.log("Terminal embed found:", !!terminalEmbed);
    
    if (terminalEmbed) {
        console.log("Terminal embed content:", terminalEmbed.innerHTML);
        
        // Force create a working terminal
        terminalEmbed.innerHTML = `
            <div style="background: #000; color: #0f0; padding: 20px; font-family: monospace;">
                <div>🔧 DEBUG TERMINAL - HELP COMMAND WILL WORK</div>
                <div id="debugOutput" style="height: 200px; overflow-y: auto; border: 1px solid #333; padding: 10px; margin: 10px 0;"></div>
                <div>
                    <span style="color: #0ff;">debug@portfolio:~$</span>
                    <input type="text" id="debugInput" style="background: transparent; border: none; color: #0f0; margin-left: 10px; width: 70%; outline: none;">
                </div>
            </div>
        `;
        
        const output = document.getElementById('debugOutput');
        const input = document.getElementById('debugInput');
        
        const commands = {
            help: () => `DEBUG HELP: Commands are working!`,
            test: () => `✅ Terminal is working!`
        };
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                output.innerHTML += `<div>debug@portfolio:~$ ${cmd}</div>`;
                if (commands[cmd]) {
                    output.innerHTML += `<div>${commands[cmd]()}</div>`;
                }
                input.value = '';
                output.scrollTop = output.scrollHeight;
            }
        });
        
        input.focus();
        console.log("✅ DEBUG: Terminal created successfully");
    }
}

// Auto-run when terminal section is active
if (window.location.hash === '#terminal') {
    setTimeout(debugTerminal, 500);
}

// Also run when hash changes
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#terminal') {
        setTimeout(debugTerminal, 500);
    }
});

console.log("🔧 DEBUG: Terminal debug script loaded");
