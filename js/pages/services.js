// Services Page Logic
class ServicesPage {
    constructor() {
        this.services = [
            {
                id: 1,
                icon: "🔐",
                title: "Cybersecurity Assessment",
                description: "Comprehensive security evaluation including vulnerability scanning, penetration testing, and security audits to protect your digital assets.",
                features: [
                    "Vulnerability assessment",
                    "Penetration testing",
                    "Security audit reports",
                    "Remediation guidance",
                    "Continuous monitoring"
                ],
                price: "Starting at $500",
                action: "Get Security Audit"
            },
            {
                id: 2,
                icon: "💻",
                title: "Web Development",
                description: "Custom web applications and websites built with modern technologies, responsive design, and optimal performance.",
                features: [
                    "Responsive design",
                    "Modern frameworks",
                    "Performance optimization",
                    "SEO friendly",
                    "Maintenance support"
                ],
                price: "Starting at $300",
                action: "Start Project"
            },
            {
                id: 3,
                icon: "🛠️",
                title: "Hardware Solutions",
                description: "PC repair, troubleshooting, and system optimization services to keep your hardware running smoothly.",
                features: [
                    "Hardware diagnostics",
                    "System repairs",
                    "Performance optimization",
                    "Component upgrades",
                    "Preventive maintenance"
                ],
                price: "Starting at $50",
                action: "Schedule Repair"
            },
            {
                id: 4,
                icon: "🎓",
                title: "Training & Tutoring",
                description: "Personalized training sessions for HCIA-Datacom certification and cybersecurity fundamentals.",
                features: [
                    "HCIA-Datacom preparation",
                    "Cybersecurity basics",
                    "Hands-on labs",
                    "Progress tracking",
                    "Exam simulation"
                ],
                price: "$30/hour",
                action: "Book Session"
            }
        ];
        
        this.init();
    }

    init() {
        this.renderServices();
        this.setupEventListeners();
    }

    renderServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;

        servicesGrid.innerHTML = this.services.map(service => `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-icon">${service.icon}</div>
                <h3 class="service-title">${service.title}</h3>
                <div class="service-description">
                    <p>${service.description}</p>
                </div>
                
                <div class="service-features">
                    <h4>What's Included</h4>
                    <ul>
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-price">${service.price}</div>
                
                <div class="service-actions">
                    <button class="service-btn primary" onclick="ServicesPage.contactAboutService('${service.title}')">
                        ${service.action}
                    </button>
                    <button class="service-btn secondary" onclick="ServicesPage.learnMore('${service.id}')">
                        Learn More
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Add hover effects
        document.addEventListener('mouseover', (e) => {
            const serviceCard = e.target.closest('.service-card');
            if (serviceCard) {
                serviceCard.style.zIndex = '10';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const serviceCard = e.target.closest('.service-card');
            if (serviceCard) {
                serviceCard.style.zIndex = '';
            }
        });
    }

    static contactAboutService(serviceName) {
        alert(`Thank you for your interest in ${serviceName}! Please contact me at charming.hacker@domain.com to discuss your project.`);
    }

    static learnMore(serviceId) {
        const serviceDetails = {
            1: "Cybersecurity assessments include comprehensive testing of your network, applications, and infrastructure to identify vulnerabilities and provide actionable recommendations.",
            2: "Web development services cover everything from simple websites to complex web applications using modern technologies and best practices.",
            3: "Hardware services include diagnostics, repairs, upgrades, and maintenance for computers and related equipment.",
            4: "Training sessions are customized to your learning goals and include hands-on exercises, real-world scenarios, and progress tracking."
        };
        
        alert(serviceDetails[serviceId] || "More information about this service is coming soon!");
    }
}

// Initialize services page
document.addEventListener('DOMContentLoaded', () => {
    new ServicesPage();
});
