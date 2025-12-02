// Parallax Effect for Hero Section
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        parallaxSpeed: 0.5,
        maxTransform: 100,
        enableMobile: false // Disable on mobile for performance
    };

    // Check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Parallax scroll handler
    function createParallaxEffect(element, speed = CONFIG.parallaxSpeed) {
        if (!element) return;

        let ticking = false;
        let lastScrollY = window.pageYOffset;

        function updateParallax() {
            const scrollY = window.pageYOffset;
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + scrollY;
            const windowHeight = window.innerHeight;

            // Only apply parallax when element is in viewport
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementRect.height) {
                const relativeScroll = scrollY - elementTop;
                const parallaxValue = Math.min(relativeScroll * speed, CONFIG.maxTransform);
                
                element.style.transform = `translateY(${parallaxValue}px)`;
            }

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial call
        updateParallax();

        return () => {
            window.removeEventListener('scroll', requestTick);
        };
    }

    // Multi-layer parallax for depth effect
    function createLayeredParallax(container) {
        if (!container) return;

        const layers = container.querySelectorAll('[data-parallax-speed]');
        const cleanupFunctions = [];

        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.parallaxSpeed) || 0.5;
            const cleanup = createParallaxEffect(layer, speed);
            cleanupFunctions.push(cleanup);
        });

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup && cleanup());
        };
    }

    // Mouse parallax effect
    function createMouseParallax(element) {
        if (!element) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        function handleMouseMove(e) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            targetX = (e.clientX - centerX) / rect.width * 20;
            targetY = (e.clientY - centerY) / rect.height * 20;
        }

        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            element.style.transform = `translate(${currentX}px, ${currentY}px)`;
            requestAnimationFrame(animate);
        }

        element.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
        };
    }

    // Initialize parallax effects
    function init() {
        // Skip on mobile if disabled
        if (isMobile() && !CONFIG.enableMobile) {
            return;
        }

        // Hero section parallax
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            const heroBackground = heroSection.querySelector('.hero::before');
            
            if (heroContent) {
                createParallaxEffect(heroContent, 0.3);
            }
        }

        // Parallax layers
        const parallaxContainers = document.querySelectorAll('[data-parallax-container]');
        parallaxContainers.forEach(container => {
            createLayeredParallax(container);
        });

        // Mouse parallax for interactive elements
        const mouseParallaxElements = document.querySelectorAll('[data-mouse-parallax]');
        mouseParallaxElements.forEach(element => {
            if (!isMobile()) {
                createMouseParallax(element);
            }
        });

        // Add parallax to destination cards on hover
        const destinationCards = document.querySelectorAll('.destination-item');
        destinationCards.forEach(card => {
            if (isMobile()) return;

            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Reinitialize on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Remove old transforms
            document.querySelectorAll('[style*="transform"]').forEach(el => {
                if (el.style.transform.includes('translateY')) {
                    el.style.transform = '';
                }
            });
            
            // Reinitialize if not mobile or if mobile parallax is enabled
            if (!isMobile() || CONFIG.enableMobile) {
                init();
            }
        }, 250);
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose configuration
    window.ParallaxEffect = {
        init,
        config: CONFIG
    };
})();
