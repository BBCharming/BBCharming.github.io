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
            navbarPlaceholder.innerHTML = `
                <header class="nav">
                    <div class="brand">
                        <div class="avatar-3d">
                            <svg class="avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                <defs>
                                    <linearGradient id="g" x1="0" x2="1">
                                        <stop offset="0" stop-color="#00d4ff"/>
                                        <stop offset="1" stop-color="#a96bff"/>
                                    </linearGradient>
                                    <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="6" result="blur"/>
                                        <feMerge>
                                            <feMergeNode in="blur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <rect width="100%" height="100%" rx="24" fill="#070710"/>
                                <g filter="url(#f)">
                                    <circle cx="100" cy="86" r="42" fill="url(#g)" opacity="0.10"/>
                                </g>
                                <circle cx="74" cy="80" r="8" fill="#00d4ff"/>
                                <circle cx="126" cy="80" r="8" fill="#a96bff"/>
                                <path d="M60 132c24 18 76 18 120 0" stroke="url(#g)" stroke-width="3" fill="none" opacity="0.7"/>
                            </svg>
                        </div>
                        <div class="brand-text">
                            <h1>BB Charming</h1>
                            <p class="muted">Cybersecurity · Software · Hardware</p>
                        </div>
                    </div>

                    <nav class="menu">
                        <a href="index.html" class="${window.location.pathname.includes('index.html') || window.location.pathname === '/' ? 'active' : ''}">Home</a>
                        <a href="projects.html" class="${window.location.pathname.includes('projects.html') ? 'active' : ''}">Projects</a>
                        <a href="services.html" class="${window.location.pathname.includes('services.html') ? 'active' : ''}">Services</a>
                        <a href="access.html" class="${window.location.pathname.includes('access.html') ? 'active' : ''}">Access Portal</a>
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

document.addEventListener('DOMContentLoaded', () => {
    new App();
});