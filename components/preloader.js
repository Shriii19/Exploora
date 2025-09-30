// Modern Modal Preloader JavaScript
(function() {
    'use strict';
    
    // Preloader configuration
    const PRELOADER_CONFIG = {
        minDisplayTime: 2000, // Minimum time to show preloader (2 seconds)
        fadeOutDuration: 800,  // Fade out animation duration
        autoHide: true,        // Auto-hide when page loads
        showOnRefresh: true    // Show preloader on page refresh
    };
    
    let preloaderStartTime = Date.now();
    let preloaderElement = null;
    let isPreloaderShown = false;
    let progressInterval = null;
    
    // Check if this is a fresh website visit (not navigation)
    function isFreshWebsiteVisit() {
        // Check if it's a direct visit, refresh, or new tab
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
            // Show on reload, navigate (direct URL), or when coming from external site
            return navEntry.type === 'reload' || navEntry.type === 'navigate';
        }
        
        // Fallback for older browsers - show preloader by default
        return true;
    }
    
    // Create and inject preloader
    function createPreloader() {
        if (preloaderElement) return;
        
        // Create preloader HTML directly
        const preloaderHTML = `
            <div id="preloader" class="preloader">
                <div class="preloader-content">
                    <!-- Modern Logo -->
                    <div class="preloader-logo">🌍</div>
                    
                    <!-- Loading Spinner -->
                    <div class="loading-spinner"></div>
                    
                    <!-- Loading Text -->
                    <div class="loading-text">
                        <span class="loading-word">Exploring</span>
                        <span class="loading-word">Destinations</span>
                        <span class="loading-dots">
                            <span class="dot">.</span>
                            <span class="dot">.</span>
                            <span class="dot">.</span>
                        </span>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="progress-container">
                        <div class="progress-bar" id="preloader-progress"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
        preloaderElement = document.getElementById('preloader');
        isPreloaderShown = true;
        
        // Start progress animation
        startProgressAnimation();
        
        console.log('🌍 Modern preloader created and displayed');
    }
    
    // Progress animation for loading bar
    function startProgressAnimation() {
        const progressBar = document.getElementById('preloader-progress');
        if (!progressBar) return;
        
        // Simulate loading progress
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress increment
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Add completion effect
                setTimeout(() => {
                    const loadingText = document.querySelector('.loading-text');
                    if (loadingText) {
                        loadingText.innerHTML = '<span style="color: #90EE90;">Ready to Explore!</span>';
                    }
                }, 200);
            }
            
            // Update progress bar
            progressBar.style.width = `${progress}%`;
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
            
            // Clear progress interval
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            
            // Remove element after animation
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
                isPreloaderShown = false;
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                console.log('🌍 Modern preloader hidden');
            }, PRELOADER_CONFIG.fadeOutDuration);
        }, remainingTime);
    }
    
    // Initialize preloader immediately
    function initPreloader() {
        // Check if preloader should be shown
        const isFreshVisit = isFreshWebsiteVisit();
        const isFirstLoad = !sessionStorage.getItem('exploora_page_loaded');
        
        // Show preloader on:
        // 1. First visit to any page in session
        // 2. Page refresh (F5, Ctrl+R)
        // 3. Direct navigation to page (typing URL, bookmark, etc.)
        const shouldShowPreloader = isFirstLoad || isFreshVisit;
        
        if (!shouldShowPreloader) {
            console.log('🌍 Subsequent navigation detected, skipping preloader...');
            return;
        }
        
        // Mark page as loaded in this session
        sessionStorage.setItem('exploora_page_loaded', 'true');
        
        // Prevent body scroll during loading
        document.body.style.overflow = 'hidden';
        
        // Create preloader
        createPreloader();
        
        console.log('🌍 Modern preloader initialized');
        
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
        isShown: () => isPreloaderShown,
        forceShow: () => {
            sessionStorage.removeItem('exploora_visited');
            initPreloader();
        },
        reset: () => {
            sessionStorage.removeItem('exploora_visited');
        }
    };
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
})();