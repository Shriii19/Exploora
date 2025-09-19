/**
 * Advanced Particle Animation System
 * Creates beautiful floating particles with various effects
 */

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isActive = true;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.container.appendChild(this.canvas);
        this.updateCanvasSize();
    }
    
    updateCanvasSize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    createParticles() {
        const particleCount = Math.min(80, Math.floor(this.width * this.height / 15000));
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 100,
                maxLife: 200
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(78, 205, 196, ',
            'rgba(255, 107, 107, ',
            'rgba(255, 206, 84, ',
            'rgba(163, 190, 140, ',
            'rgba(255, 255, 255, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.updateCanvasSize();
            this.createParticles();
        });
        
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Pause on scroll for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.isActive = false;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.isActive = true;
            }, 100);
        });
    }
    
    updateParticle(particle) {
        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary collision
        if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;
        
        // Keep in bounds
        particle.x = Math.max(0, Math.min(this.width, particle.x));
        particle.y = Math.max(0, Math.min(this.height, particle.y));
        
        // Life cycle
        particle.life++;
        if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = Math.random() * this.width;
            particle.y = Math.random() * this.height;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
        }
        
        // Fade effect
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = 0.7 * (1 - lifeRatio * lifeRatio);
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color + particle.opacity + ')';
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        if (this.isActive) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Update and draw particles
            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });
            
            // Draw connections
            this.drawConnections();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        this.isActive = false;
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize particle systems
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles for hero sections
    const heroParticleContainers = document.querySelectorAll('.hero-particles');
    heroParticleContainers.forEach(container => {
        if (container) {
            new ParticleSystem(container);
        }
    });
    
    console.log('🎨 Particle systems initialized');
});

// Floating Orbs Effect
class FloatingOrbs {
    constructor(container, count = 5) {
        this.container = container;
        this.orbs = [];
        this.count = count;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.count; i++) {
            this.createOrb();
        }
    }
    
    createOrb() {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        
        const size = Math.random() * 200 + 100;
        const hue = Math.random() * 360;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                hsla(${hue}, 70%, 60%, 0.1) 0%, 
                hsla(${hue}, 70%, 60%, 0.05) 50%, 
                transparent 100%);
            border-radius: 50%;
            top: ${y}%;
            left: ${x}%;
            animation: floatingOrb ${duration}s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        `;
        
        this.container.appendChild(orb);
        this.orbs.push(orb);
    }
    
    destroy() {
        this.orbs.forEach(orb => {
            if (orb.parentNode) {
                orb.parentNode.removeChild(orb);
            }
        });
        this.orbs = [];
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero particles
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroParticlesContainer = heroSection.querySelector('.hero-particles');
        if (heroParticlesContainer) {
            // Create particle system
            const particles = new ParticleSystem(heroParticlesContainer, {
                particleCount: 60,
                particleSize: { min: 1, max: 4 },
                speed: { min: 0.3, max: 1.5 },
                colors: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.6)',
                    'rgba(6, 182, 212, 0.7)',
                    'rgba(245, 158, 11, 0.5)',
                    'rgba(255, 255, 255, 0.4)'
                ],
                connections: true,
                connectionDistance: 120,
                mouse: {
                    enabled: true,
                    radius: 150,
                    repel: false
                }
            });
            
            // Create floating orbs
            const orbs = new FloatingOrbs(heroParticlesContainer, 6);
            
            // Store references for cleanup
            heroSection.particleSystem = particles;
            heroSection.floatingOrbs = orbs;
        }
    }
    
    // Initialize particles for other sections
    const searchDemoSection = document.querySelector('.search-demo-section');
    if (searchDemoSection) {
        const particles = new ParticleSystem(searchDemoSection, {
            particleCount: 30,
            particleSize: { min: 1, max: 2 },
            speed: { min: 0.2, max: 0.8 },
            colors: [
                'rgba(59, 130, 246, 0.3)',
                'rgba(16, 185, 129, 0.3)',
                'rgba(245, 158, 11, 0.2)'
            ],
            connections: false,
            mouse: {
                enabled: true,
                radius: 100,
                repel: true
            }
        });
        
        searchDemoSection.particleSystem = particles;
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem, FloatingOrbs };
}