// Enhanced Smooth Scroll with Easing
(function() {
    'use strict';

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || !href) return;
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            history.pushState(null, null, href);
            
            // Add focus for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
        });
    });

    // Back to top functionality with smooth animation
    const createBackToTop = () => {
        const button = document.createElement('button');
        button.className = 'back-to-top-enhanced';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.setAttribute('aria-label', 'Back to top');
        button.style.display = 'none';
        
        document.body.appendChild(button);
        
        let lastScroll = 0;
        const toggleButton = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 500) {
                button.style.display = 'flex';
                button.style.opacity = '1';
            } else {
                button.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 500) {
                        button.style.display = 'none';
                    }
                }, 300);
            }
            
            lastScroll = currentScroll;
        };
        
        window.addEventListener('scroll', toggleButton, { passive: true });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBackToTop);
    } else {
        createBackToTop();
    }
})();
