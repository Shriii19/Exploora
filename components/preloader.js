// Mast Preloader JavaScript
(function() {
    'use strict';
    
    // Preloader configuration
    const PRELOADER_CONFIG = {
        minDisplayTime: 2000, // Minimum time to show preloader (2 seconds)
        fadeOutDuration: 800,  // Fade out animation duration
        autoHide: true         // Auto-hide when page loads
    };
    
    let preloaderStartTime = Date.now();
    let preloaderElement = null;
    let isPreloaderShown = false;
    
    // Create and inject preloader
    function createPreloader() {
        if (preloaderElement) return;
        
        // Fetch preloader HTML
        fetch('./components/preloader.html')
            .then(response => response.text())
            .then(html => {
                // Create preloader container
                preloaderElement = document.createElement('div');
                preloaderElement.innerHTML = html;
                
                // Inject CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = './components/preloader.css';
                document.head.appendChild(link);
                
                // Add to body
                document.body.appendChild(preloaderElement.firstElementChild);
                isPreloaderShown = true;
                
                // Start progress animation
                startProgressAnimation();
                
                console.log('🚢 Mast preloader initialized');
            })
            .catch(error => {
                console.warn('Could not load preloader:', error);
                // Fallback: create simple preloader
                createFallbackPreloader();
            });
    }
    
    // Fallback preloader if files can't be loaded
    function createFallbackPreloader() {
        const fallbackHTML = `
            <div id="preloader" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1e3a8a 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
                color: white;
                font-size: 24px;
                font-weight: 600;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⛵</div>
                    <div>Setting Sail...</div>
                    <div style="margin-top: 15px; font-size: 18px; opacity: 0.8;">
                        Preparing your journey
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackHTML);
        preloaderElement = document.getElementById('preloader');
        isPreloaderShown = true;
    }
    
    // Progress animation for sailing ship
    function startProgressAnimation() {
        const progressShip = document.querySelector('.progress-ship');
        if (!progressShip) return;
        
        // Simulate loading progress with ship movement
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress increment
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Add completion effect
                setTimeout(() => {
                    const loadingText = document.querySelector('.loading-text');
                    if (loadingText) {
                        loadingText.innerHTML = '<span style="color: #90EE90;">⚓ Ready to Explore!</span>';
                    }
                }, 200);
            }
            
            // Update ship position
            progressShip.style.left = `${progress}%`;
        }, 200);
    }
    
    // Hide preloader with animation
    function hidePreloader() {
        if (!isPreloaderShown || !preloaderElement) return;
        
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        const elapsedTime = Date.now() - preloaderStartTime;
        const remainingTime = Math.max(0, PRELOADER_CONFIG.minDisplayTime - elapsedTime);
        
        setTimeout(() => {
            // Add fade-out class
            preloader.classList.add('fade-out');
            
            // Remove element after animation
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
                isPreloaderShown = false;
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                console.log('⚓ Mast preloader hidden');
            }, PRELOADER_CONFIG.fadeOutDuration);
        }, remainingTime);
    }
    
    // Initialize preloader immediately
    function initPreloader() {
        // Prevent body scroll during loading
        document.body.style.overflow = 'hidden';
        
        // Create preloader
        createPreloader();
        
        // Auto-hide when page is fully loaded
        if (PRELOADER_CONFIG.autoHide) {
            if (document.readyState === 'complete') {
                setTimeout(hidePreloader, 500);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(hidePreloader, 500);
                });
            }
        }
    }
    
    // Public API
    window.MastPreloader = {
        show: createPreloader,
        hide: hidePreloader,
        isShown: () => isPreloaderShown
    };
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
})();