// Advanced Scroll Animation Controller
class ScrollAnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.scrollProgress = 0;
        this.init();
    }
    
    init() {
        this.createScrollProgressIndicator();
        this.setupIntersectionObservers();
        this.initializeScrollAnimations();
        this.bindScrollEvents();
    }
    
    createScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #4ECDC4, #FF6B6B);
            z-index: 9999;
            transition: width 0.1s ease;
            border-radius: 0 3px 3px 0;
        `;
        document.body.appendChild(progressBar);
    }
    
    updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset;
        this.scrollProgress = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, this.scrollProgress))}%`;
        }
    }
    
    setupIntersectionObservers() {
        // Fade in animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Slide up animations
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                    slideObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });
        
        // Stagger animations
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStaggered(entry.target);
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });
        
        // Scale animations
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-in');
                    scaleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        this.observers.set('fade', fadeObserver);
        this.observers.set('slide', slideObserver);
        this.observers.set('stagger', staggerObserver);
        this.observers.set('scale', scaleObserver);
    }
    
    initializeScrollAnimations() {
        // Observe elements with animation attributes
        document.querySelectorAll('[data-reveal]').forEach(element => {
            const animationType = element.getAttribute('data-reveal');
            const observer = this.observers.get(animationType) || this.observers.get('fade');
            if (observer) {
                observer.observe(element);
            }
        });
        
        // Observe elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(element => {
            const animationType = element.getAttribute('data-animate');
            if (animationType === 'stagger') {
                this.observers.get('stagger').observe(element);
            }
        });
        
        // Auto-detect animation elements
        const autoElements = document.querySelectorAll(`
            .feature-card, .destination-card, .stat-item, .benefit-item,
            .contact-method, .solution-item, .mission-content,
            .section-header-premium, .premium-form, .contact-info
        `);
        
        autoElements.forEach((element, index) => {
            element.setAttribute('data-delay', index * 100);
            this.observers.get('fade').observe(element);
        });
    }
    
    animateStaggered(container) {
        const children = container.querySelectorAll(`
            .feature-card, .destination-card, .stat-item, .benefit-item,
            .contact-method, .hero-feature, .form-group, .mission-stats .stat
        `);
        
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in');
            }, index * 100);
        });
    }
    
    bindScrollEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    this.handleParallaxElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    handleParallaxElements() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        // Background elements
        const bgElements = document.querySelectorAll('.background-mesh');
        bgElements.forEach(element => {
            const parallax = scrolled * 0.1;
            element.style.transform = `translateY(${parallax}px) rotate(${parallax * 0.1}deg)`;
        });
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.float-animation');
        floatingElements.forEach((element, index) => {
            const offset = Math.sin(Date.now() * 0.001 + index) * 5;
            element.style.transform = `translateY(${offset}px)`;
        });
    }
    
    // Public methods for manual control
    animateElement(element, animation = 'fade') {
        element.classList.add(`animate-${animation}`);
    }
    
    resetElement(element) {
        element.classList.remove('animate-in', 'slide-up', 'scale-in');
    }
    
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.remove();
        }
    }
}

// Enhanced CSS animations (injected dynamically)
const animationStyles = `
    /* Reveal Animations */
    [data-reveal] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    [data-reveal].animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-reveal="scale"] {
        opacity: 0;
        transform: scale(0.8);
    }
    
    [data-reveal="scale"].animate-in {
        opacity: 1;
        transform: scale(1);
    }
    
    [data-reveal="slide"] {
        opacity: 0;
        transform: translateX(-50px);
    }
    
    [data-reveal="slide"].animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Staggered animations */
    [data-animate="stagger"] > * {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    [data-animate="stagger"] > *.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Auto-detected elements */
    .feature-card,
    .destination-card,
    .stat-item,
    .benefit-item,
    .contact-method,
    .solution-item,
    .mission-content,
    .section-header-premium,
    .premium-form,
    .contact-info {
        opacity: 0;
        transform: translateY(25px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .feature-card.animate-in,
    .destination-card.animate-in,
    .stat-item.animate-in,
    .benefit-item.animate-in,
    .contact-method.animate-in,
    .solution-item.animate-in,
    .mission-content.animate-in,
    .section-header-premium.animate-in,
    .premium-form.animate-in,
    .contact-info.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Hero feature animations */
    .hero-feature {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-feature.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    /* Slide up animation */
    .slide-up {
        animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Scale in animation */
    .scale-in {
        animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Floating animation for background elements */
    .float-animation {
        animation: floating 6s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        [data-reveal],
        [data-animate] > *,
        .feature-card,
        .destination-card,
        .stat-item,
        .benefit-item,
        .contact-method,
        .solution-item,
        .mission-content,
        .section-header-premium,
        .premium-form,
        .contact-info,
        .hero-feature {
            transition: none;
            animation: none;
        }
        
        .float-animation {
            animation: none;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimationController = new ScrollAnimationController();
    console.log('🎬 Scroll animations initialized');
});

// Export for external use
window.ScrollAnimationController = ScrollAnimationController;