// Projects Page Logic
class ProjectsPage {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "HCIA-Datacom Quiz System",
                description: "A comprehensive certification preparation platform featuring 22 chapters of HCIA-Datacom content with interactive quizzes, progress tracking, and exam simulations.",
                status: "Active",
                features: [
                    "22 Chapter-based quizzes",
                    "Random question generator",
                    "Final exam simulation",
                    "Progress tracking with localStorage",
                    "Responsive design for all devices"
                ],
                technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage API"],
                link: "hcia-quiz-app/index.html",
                command: "./HCIA-Datacom-Quiz",
                github: "#",
                demo: "hcia-quiz-app/index.html"
            },
            {
                id: 2,
                title: "Mwaba AI Assistant",
                description: "An intelligent voice-controlled personal assistant with WhatsApp integration capabilities for automated responses and smart home control.",
                status: "In Development",
                features: [
                    "Voice command recognition",
                    "WhatsApp auto-reply system",
                    "Smart home integration",
                    "Natural language processing",
                    "Multi-platform support"
                ],
                technologies: ["Python", "OpenAI API", "Twilio", "WebRTC"],
                link: "#",
                command: "mwaba --start",
                github: "#",
                demo: "#"
            },
            {
                id: 3,
                title: "Cyber Range Lab",
                description: "A virtual penetration testing environment for cybersecurity training, featuring various vulnerable machines and network scenarios.",
                status: "Planning",
                features: [
                    "Multiple vulnerable machines",
                    "Network segmentation",
                    "Real-world attack scenarios",
                    "Progress tracking",
                    "Docker-based infrastructure"
                ],
                technologies: ["Docker", "Kali Linux", "Metasploit", "Python"],
                link: "#",
                command: "cyber-range --deploy",
                github: "#",
                demo: "#"
            },
            {
                id: 4,
                title: "Portfolio Website",
                description: "This very website - a modular, cyber-themed portfolio built with vanilla JavaScript and modern CSS, featuring interactive terminals and animations.",
                status: "Active",
                features: [
                    "Modular architecture",
                    "Interactive terminal",
                    "3D avatar animations",
                    "Responsive design",
                    "Cyber security theme"
                ],
                technologies: ["JavaScript", "CSS3", "HTML5", "Web Animations API"],
                link: "index.html",
                command: "npm start",
                github: "https://github.com/bbcharming/bbcharming.github.io",
                demo: "index.html"
            }
        ];
        
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupEventListeners();
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-status">${project.status}</span>
                </div>
                
                <div class="project-description">
                    <p>${project.description}</p>
                </div>
                
                <div class="project-features">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-tech">
                    <h4>Technologies</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-footer">
                    <code class="command">${project.command}</code>
                    <div class="project-actions">
                        ${project.demo !== '#' ? `<a href="${project.demo}" class="project-link" target="_blank">View Demo</a>` : ''}
                        ${project.github !== '#' ? `<a href="${project.github}" class="project-link secondary" target="_blank">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Add click effects to project cards
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                this.handleProjectClick(projectCard);
            }
        });
    }

    handleProjectClick(card) {
        // Add visual feedback when project card is clicked
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
}

// Initialize projects page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsPage();
});
