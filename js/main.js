// Main Application Initialization
class App {
    constructor() {
        this.init();
    }

    init() {
        this.injectNavbar();
        this.injectFooter();
        this.initializeModules();
        this.updateCopyrightYear();
    }

    injectNavbar() {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
            
            navbarPlaceholder.innerHTML = `
                <header class="nav">
                    <div class="brand">
                        <div class="avatar-3d">
                            <!-- SVG kept here -->
                            <svg class="avatar" ...> ... </svg> 
                        </div>
                        <div class="brand-text">
                            <h1>BB Charming</h1>
                        </div>
                    </div>

                    <nav class="menu">
                        <a href="index.html" class="${isHomePage ? 'active' : ''}">Home</a>
                        <a href="projects.html">Projects</a>
                        <a href="services.html">Services</a>
                        <!-- If on homepage, trigger reveal event; otherwise go to access.html -->
                        <a href="${isHomePage ? '#terminal' : 'access.html'}" 
                           onclick="${isHomePage ? 'document.dispatchEvent(new CustomEvent(\'reveal-terminal\'))' : ''}">
                           Access Portal
                        </a>
                    </nav>
                </header>
            `;
        }
    }

    injectFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
                <footer class="footer">
                    <div class="container">
                        <div class="footer-content">
                            <div class="footer-brand">
                                <h3>BB Charming</h3>
                                <p>The Charming Hacker</p>
                            </div>
                            <div class="footer-links">
                                <a href="index.html">Home</a>
                                <a href="projects.html">Projects</a>
                                <a href="services.html">Services</a>
                                <a href="access.html">Access Portal</a>
                            </div>
                            <div class="footer-social">
                                <p>&copy; 2024 BB Charming. All systems operational.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            `;
        }
    }

    initializeModules() {
        // Initialize featured projects on homepage
        if (document.getElementById('featured-projects')) {
            this.initializeFeaturedProjects();
        }
    }

    initializeFeaturedProjects() {
        const projectsGrid = document.getElementById('featured-projects');
        const featuredProjects = [
            {
                title: "HCIA-Datacom Quiz System",
                description: "Interactive certification preparation platform with 22 chapters and progress tracking",
                tech: ["JavaScript", "LocalStorage", "CSS3", "HTML5"],
                link: "hcia-quiz-app/index.html",
                command: "./HCIA-Datacom-Quiz"
            },
            {
                title: "Mwaba AI Assistant",
                description: "Voice-controlled personal assistant with WhatsApp integration",
                tech: ["Python", "AI", "APIs", "Automation"],
                link: "#",
                command: "mwaba --start"
            },
            {
                title: "Cyber Range Lab",
                description: "Virtual penetration testing environment for security training",
                tech: ["Kali Linux", "Docker", "Networking", "Security"],
                link: "#",
                command: "cyber-range --deploy"
            }
        ];

        projectsGrid.innerHTML = featuredProjects.map(project => `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${project.title}</h3>
                    <div class="card-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="card-body">
                    <p>${project.description}</p>
                </div>
                <div class="card-footer">
                    ${project.command ? `<code class="command">${project.command}</code>` : ''}
                    ${project.link && project.link !== '#' ? `<a href="${project.link}" class="card-link">Explore →</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    updateCopyrightYear() {
        const yearElement = document.querySelector('.footer-social p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = `&copy; ${currentYear} BB Charming. All systems operational.`;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
