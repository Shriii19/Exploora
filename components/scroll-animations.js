// Scroll Animations and Effects
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.setupSmoothScroll();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '50px 0px 50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Unobserve after animating to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.feature-card, .destination-card, .section-content, .hero-content, .stats-item, .blog-card'
        );
        
        animateElements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
            
            // Fallback: Ensure all elements become visible after 3 seconds
            setTimeout(() => {
                if (!el.classList.contains('animate-in')) {
                    el.classList.add('animate-in');
                }
            }, 3000 + (index * 50));
        });
        
        // Immediately show elements that are already in viewport
        setTimeout(() => {
            animateElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('animate-in');
                }
            });
        }, 100);
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroHeight = hero.offsetHeight;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            }

            // Header background opacity
            const header = document.querySelector('.header');
            if (header) {
                const opacity = Math.min(scrollY / 100, 1);
                header.style.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.95})`;
                header.style.backdropFilter = scrollY > 50 ? 'blur(10px)' : 'none';
            }

            // Floating elements animation
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = Math.sin((scrollY + index * 100) * 0.01) * 10;
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Add CSS animations
const animationStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Ensure destination cards are always visible after load */
    .destination-card {
        min-height: 500px;
        background: white;
    }

    .floating-element {
        transition: transform 0.3s ease-out;
    }

    .header {
        transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
    }

    /* Stagger animation delays */
    .animate-on-scroll:nth-child(1) { transition-delay: 0ms; }
    .animate-on-scroll:nth-child(2) { transition-delay: 100ms; }
    .animate-on-scroll:nth-child(3) { transition-delay: 200ms; }
    .animate-on-scroll:nth-child(4) { transition-delay: 300ms; }
    .animate-on-scroll:nth-child(5) { transition-delay: 400ms; }
    .animate-on-scroll:nth-child(6) { transition-delay: 500ms; }
    .animate-on-scroll:nth-child(7) { transition-delay: 600ms; }
    .animate-on-scroll:nth-child(8) { transition-delay: 700ms; }
    .animate-on-scroll:nth-child(9) { transition-delay: 800ms; }
    .animate-on-scroll:nth-child(n+10) { transition-delay: 900ms; }
    
    /* Force visibility for destination cards after animation */
    .destinations-grid .destination-card {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    .destinations-grid .animate-on-scroll.animate-in {
        opacity: 1 !important;
        visibility: visible !important;
    }

    /* Pulse animation for loading states */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    /* Bounce animation for buttons */
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
        40%, 43% { transform: translate3d(0,-10px,0); }
        70% { transform: translate3d(0,-5px,0); }
        90% { transform: translate3d(0,-2px,0); }
    }

    .bounce {
        animation: bounce 1s ease-in-out;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});