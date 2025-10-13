// Destination Cards Visibility Fix
// This script ensures all destination cards are visible immediately on page load

(function() {
    'use strict';
    
    // Force visibility of all destination cards immediately
    function ensureDestinationCardsVisible() {
        const destinationCards = document.querySelectorAll('.destination-card');
        
        destinationCards.forEach((card, index) => {
            // Force visibility
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.display = 'flex';
            card.style.transform = 'translateY(0)';
            
            // Ensure background is white
            if (!card.style.background) {
                card.style.background = 'white';
            }
            
            // Ensure image has background
            const image = card.querySelector('.destination-image');
            if (image && !image.style.backgroundColor) {
                image.style.backgroundColor = '#f3f4f6';
            }
            
            // Add a data attribute to mark as processed
            card.setAttribute('data-visibility-fixed', 'true');
        });
        
        // Ensure grid is visible
        const grid = document.querySelector('.destinations-grid');
        if (grid) {
            grid.style.display = 'grid';
            grid.style.opacity = '1';
            grid.style.visibility = 'visible';
        }
        
        console.log(`✓ Fixed visibility for ${destinationCards.length} destination cards`);
    }
    
    // Run immediately
    ensureDestinationCardsVisible();
    
    // Run after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureDestinationCardsVisible);
    }
    
    // Run after a short delay as fallback
    setTimeout(ensureDestinationCardsVisible, 100);
    
    // Run after window is fully loaded (including images)
    window.addEventListener('load', ensureDestinationCardsVisible);
    
    // Additional safeguard: Run every 500ms for first 3 seconds
    let checkCount = 0;
    const visibilityCheck = setInterval(() => {
        ensureDestinationCardsVisible();
        checkCount++;
        
        if (checkCount >= 6) {
            clearInterval(visibilityCheck);
        }
    }, 500);
    
    // Override any animation that might hide cards
    const style = document.createElement('style');
    style.textContent = `
        /* Force destination cards to be visible */
        .destinations-grid .destination-card {
            opacity: 1 !important;
            visibility: visible !important;
            display: flex !important;
            background: white !important;
        }
        
        /* Ensure smooth appearance without hiding */
        .destination-card:not([data-visibility-fixed]) {
            animation: quickFadeIn 0.3s ease-out forwards !important;
        }
        
        @keyframes quickFadeIn {
            from {
                opacity: 0.5;
                transform: translateY(5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Ensure grid displays properly */
        .destinations-grid {
            display: grid !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Ensure images have backgrounds */
        .destination-image {
            background-color: #f3f4f6 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Monitor for dynamically added cards
    if ('MutationObserver' in window) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains('destination-card')) {
                                setTimeout(() => ensureDestinationCardsVisible(), 50);
                            } else if (node.querySelectorAll) {
                                const cards = node.querySelectorAll('.destination-card');
                                if (cards.length > 0) {
                                    setTimeout(() => ensureDestinationCardsVisible(), 50);
                                }
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    console.log('✓ Destination cards visibility fix loaded');
})();
