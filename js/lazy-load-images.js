// Enhanced Image Lazy Loading with Fade-in Animation
(function() {
    'use strict';

    // Add CSS for image loading animations
    const style = document.createElement('style');
    style.textContent = `
        img[data-src] {
            opacity: 0;
            transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
            transform: scale(0.95);
        }
        
        img.lazy-loaded {
            opacity: 1;
            transform: scale(1);
        }
        
        img.lazy-error {
            opacity: 0.5;
            filter: grayscale(1);
        }
        
        .image-placeholder {
            background: linear-gradient(
                135deg,
                var(--gray-200) 0%,
                var(--gray-300) 50%,
                var(--gray-200) 100%
            );
            background-size: 200% 200%;
            animation: placeholderShimmer 2s ease-in-out infinite;
        }
        
        @keyframes placeholderShimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    });

    // Load image function
    function loadImage(img) {
        const src = img.dataset.src || img.getAttribute('data-src');
        
        if (!src) return;

        // Add placeholder class
        img.classList.add('image-placeholder');

        const tempImg = new Image();
        
        tempImg.onload = () => {
            // Preload complete, now set the actual source
            img.src = src;
            img.classList.remove('image-placeholder');
            img.classList.add('lazy-loaded');
            
            // Remove data-src attribute
            img.removeAttribute('data-src');
            
            // Dispatch custom event
            img.dispatchEvent(new CustomEvent('imageLoaded', {
                detail: { src }
            }));
        };
        
        tempImg.onerror = () => {
            img.classList.remove('image-placeholder');
            img.classList.add('lazy-error');
            
            // Set fallback image
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EImage not available%3C/text%3E%3C/svg%3E';
            
            console.warn('Failed to load image:', src);
        };
        
        // Start loading
        tempImg.src = src;
    }

    // Initialize lazy loading
    function initLazyLoading() {
        // Find all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            // If browser supports native lazy loading and image has loading="lazy"
            if ('loading' in HTMLImageElement.prototype && img.loading === 'lazy') {
                // Still add our fade-in animation
                img.addEventListener('load', () => {
                    img.classList.add('lazy-loaded');
                });
                return;
            }
            
            // Otherwise use Intersection Observer
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }

    // Reinitialize when new content is added
    function observeNewImages() {
        const contentObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG' && node.hasAttribute('data-src')) {
                            imageObserver.observe(node);
                        } else if (node.querySelectorAll) {
                            const newImages = node.querySelectorAll('img[data-src]');
                            newImages.forEach(img => imageObserver.observe(img));
                        }
                    }
                });
            });
        });

        contentObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLazyLoading();
            observeNewImages();
        });
    } else {
        initLazyLoading();
        observeNewImages();
    }

    // Expose utility function globally
    window.LazyLoadImages = {
        init: initLazyLoading,
        loadImage: loadImage
    };
})();
