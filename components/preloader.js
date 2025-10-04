// Travel Explorer Preloader JavaScript
(function() {
    'use strict';
    
    // Preloader configuration
    const PRELOADER_CONFIG = {
        minDisplayTime: 2000, // Minimum time to show preloader (2 seconds)
        fadeOutDuration: 800,  // Fade out animation duration
        autoHide: true,        // Auto-hide when page loads
        showProgress: true,    // Show progress animation
        progressMessages: [
            'Loading destinations...',
            'Preparing maps...',
            'Getting weather data...',
            'Fetching travel photos...',
            'Almost ready...',
            'Ready to explore!'
        ]
    };
    
    let preloaderStartTime = Date.now();
    let preloaderElement = null;
    let isPreloaderShown = false;
    let progressInterval = null;
    let currentProgress = 0;
    
    // Check if this is a fresh website visit
    function shouldShowPreloader() {
        // Always show on first visit in session
        if (!sessionStorage.getItem('exploora_visited')) {
            sessionStorage.setItem('exploora_visited', 'true');
            return true;
        }
        
        // Show on page refresh
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry && navEntry.type === 'reload') {
            return true;
        }
        
        return false;
    }
    
    // Create and inject preloader
    function createPreloader() {
        if (preloaderElement || document.getElementById('preloader')) return;
        
        // Prevent body scroll during loading
        document.body.style.overflow = 'hidden';
        
        // Load preloader HTML
        fetch('components/preloader.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('afterbegin', html);
                preloaderElement = document.getElementById('preloader');
                isPreloaderShown = true;
                
                // Start progress animation
                if (PRELOADER_CONFIG.showProgress) {
                    startProgressAnimation();
                }
                
                console.log('🌍 Travel preloader created and displayed');
            })
            .catch(error => {
                console.error('Error loading preloader:', error);
                // Fallback: create simple preloader
                createFallbackPreloader();
            });
    }
    
    // Fallback preloader if HTML loading fails
    function createFallbackPreloader() {
        const fallbackHTML = `
            <div id="preloader" class="preloader">
                <div class="preloader-content">
                    <div style="font-size: 48px; margin-bottom: 20px;">🌍</div>
                    <div style="font-size: 24px; color: white; font-weight: 600;">Exploora</div>
                    <div style="font-size: 16px; color: rgba(255,255,255,0.8); margin-top: 10px;">Loading your travel experience...</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackHTML);
        preloaderElement = document.getElementById('preloader');
        isPreloaderShown = true;
    }
    
    // Progress animation
    function startProgressAnimation() {
        const progressFill = document.querySelector('.progress-fill');
        const progressPlane = document.querySelector('.progress-plane');
        const progressPercentage = document.getElementById('progress-percentage');
        const progressLabel = document.querySelector('.progress-label');
        
        if (!progressFill || !progressPercentage) return;
        
        let progress = 0;
        let messageIndex = 0;
        
        progressInterval = setInterval(() => {
            // Simulate realistic loading progress
            const increment = Math.random() * 15 + 5;
            progress = Math.min(100, progress + increment);
            
            // Update visual elements
            progressFill.style.width = progress + '%';
            if (progressPlane) {
                progressPlane.style.left = progress + '%';
            }
            progressPercentage.textContent = Math.round(progress) + '%';
            
            // Update loading message
            if (progressLabel && messageIndex < PRELOADER_CONFIG.progressMessages.length) {
                if (progress > (messageIndex + 1) * 16.67) { // Change message every ~17%
                    messageIndex++;
                    if (messageIndex < PRELOADER_CONFIG.progressMessages.length) {
                        progressLabel.textContent = PRELOADER_CONFIG.progressMessages[messageIndex];
                    }
                }
            }
            
            // Complete animation
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Show completion message
                setTimeout(() => {
                    const loadingMessage = document.querySelector('.loading-message');
                    if (loadingMessage) {
                        loadingMessage.innerHTML = `
                            <span style="color: #4ECDC4; font-weight: 600;">
                                ✈️ Ready for Adventure!
                            </span>
                        `;
                    }
                }, 300);
            }
        }, 150);
    }
    
    // Hide preloader with animation
    function hidePreloader() {
        if (!isPreloaderShown || !preloaderElement) return;
        
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        // Clear progress interval
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
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
                
                console.log('🎯 Travel preloader hidden');
            }, PRELOADER_CONFIG.fadeOutDuration);
        }, remainingTime);
    }
    
    // Initialize preloader
    function initPreloader() {
        // Check if preloader should be shown
        if (!shouldShowPreloader()) {
            console.log('🚫 Skipping preloader - subsequent navigation detected');
            return;
        }
        
        console.log('🚀 Initializing travel preloader...');
        
        // Create preloader immediately
        createPreloader();
        
        // Auto-hide when page is fully loaded
        if (PRELOADER_CONFIG.autoHide) {
            if (document.readyState === 'complete') {
                setTimeout(hidePreloader, 1000);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(hidePreloader, 1000);
                });
            }
        }
    }
    
    // Public API
    window.TravelPreloader = {
        show: createPreloader,
        hide: hidePreloader,
        isShown: () => isPreloaderShown,
        forceShow: () => {
            sessionStorage.removeItem('exploora_visited');
            initPreloader();
        },
        reset: () => {
            sessionStorage.removeItem('exploora_visited');
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
})();