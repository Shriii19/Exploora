// Loading Skeleton Animation for Destination Cards
(function() {
    'use strict';

    // Create skeleton loader HTML
    function createSkeletonCard() {
        const skeleton = document.createElement('div');
        skeleton.className = 'destination-item skeleton-loader';
        skeleton.innerHTML = `
            <div class="dest-item-image skeleton-shimmer">
                <div class="skeleton-box" style="width: 100%; height: 100%;"></div>
            </div>
            <div class="dest-item-content">
                <div class="skeleton-box" style="width: 60%; height: 24px; margin-bottom: 8px;"></div>
                <div class="skeleton-box" style="width: 40%; height: 16px; margin-bottom: 12px;"></div>
                <div class="dest-meta">
                    <div class="skeleton-box" style="width: 60px; height: 20px;"></div>
                    <div class="skeleton-box" style="width: 50px; height: 20px;"></div>
                </div>
                <div class="dest-tags">
                    <div class="skeleton-box" style="width: 70px; height: 28px;"></div>
                    <div class="skeleton-box" style="width: 60px; height: 28px;"></div>
                </div>
            </div>
        `;
        return skeleton;
    }

    // Show skeleton loaders
    function showSkeletons(container, count = 6) {
        if (!container) return;
        
        // Save existing content
        const existingContent = Array.from(container.children);
        container.innerHTML = '';
        
        // Add skeleton cards
        for (let i = 0; i < count; i++) {
            container.appendChild(createSkeletonCard());
        }
        
        return existingContent;
    }

    // Hide skeletons and restore content
    function hideSkeletons(container, content, delay = 800) {
        setTimeout(() => {
            container.innerHTML = '';
            content.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    container.appendChild(element);
                    
                    // Trigger fade in animation
                    requestAnimationFrame(() => {
                        element.style.transition = 'all 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
        }, delay);
    }

    // Initialize skeleton loaders for destination grids
    function initializeSkeletonLoaders() {
        const destinationGrids = document.querySelectorAll('.destinations-grid');
        
        destinationGrids.forEach(grid => {
            // Only apply if grid has data-skeleton attribute or is initially empty
            if (grid.hasAttribute('data-skeleton') || grid.children.length === 0) {
                const savedContent = showSkeletons(grid, 6);
                
                // Simulate loading and restore content
                if (savedContent && savedContent.length > 0) {
                    hideSkeletons(grid, savedContent);
                }
            }
        });
    }

    // Expose globally for use in other scripts
    window.SkeletonLoader = {
        show: showSkeletons,
        hide: hideSkeletons,
        create: createSkeletonCard
    };

    // Auto-initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSkeletonLoaders);
    } else {
        initializeSkeletonLoaders();
    }
})();
