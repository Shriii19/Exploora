// Dark Mode Toggle Feature
(function() {
    'use strict';

    // Dark mode color variables
    const darkModeStyles = `
        :root.dark-mode {
            /* Dark theme colors */
            --primary-color: #60a5fa;
            --primary-dark: #3b82f6;
            --primary-light: #93c5fd;
            --secondary-color: #22d3ee;
            --accent-color: #fbbf24;
            
            /* Dark neutrals */
            --white: #111827;
            --gray-50: #1f2937;
            --gray-100: #374151;
            --gray-200: #4b5563;
            --gray-300: #6b7280;
            --gray-400: #9ca3af;
            --gray-500: #d1d5db;
            --gray-600: #e5e7eb;
            --gray-700: #f3f4f6;
            --gray-800: #f9fafb;
            --gray-900: #ffffff;
            
            /* Background */
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --bg-tertiary: #334155;
        }
        
        :root.dark-mode body {
            background: 
                radial-gradient(circle at 20% 50%, rgba(96, 165, 250, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),
                linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: var(--gray-700);
        }
        
        :root.dark-mode .navbar {
            background: rgba(15, 23, 42, 0.95);
            border-bottom: 1px solid rgba(96, 165, 250, 0.1);
        }
        
        :root.dark-mode .destination-item,
        :root.dark-mode .card,
        :root.dark-mode .feature-card {
            background: var(--bg-secondary);
            border: 1px solid rgba(96, 165, 250, 0.1);
        }
        
        :root.dark-mode .hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        :root.dark-mode .travel-tips-banner {
            background: linear-gradient(135deg, #422006, #78350f);
            border-color: rgba(251, 191, 36, 0.3);
        }
        
        :root.dark-mode input,
        :root.dark-mode textarea,
        :root.dark-mode select {
            background: var(--bg-secondary);
            color: var(--gray-700);
            border-color: var(--gray-200);
        }
        
        :root.dark-mode .toast {
            background: var(--bg-secondary);
            border: 1px solid var(--gray-200);
        }
        
        .dark-mode-toggle {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .dark-mode-toggle:hover {
            transform: scale(1.1) rotate(15deg);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .dark-mode-toggle i {
            transition: transform 0.3s ease;
        }
        
        .dark-mode-toggle:active i {
            transform: scale(0.9);
        }
        
        @media (max-width: 768px) {
            .dark-mode-toggle {
                bottom: 70px;
                right: 16px;
                width: 44px;
                height: 44px;
                font-size: 1.1rem;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = darkModeStyles;
    document.head.appendChild(styleSheet);

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    // Create toggle button
    function createToggleButton() {
        const button = document.createElement('button');
        button.className = 'dark-mode-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = document.documentElement.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        document.body.appendChild(button);
        
        return button;
    }

    // Toggle dark mode
    function toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        const button = document.querySelector('.dark-mode-toggle');
        
        // Update button icon
        if (button) {
            button.innerHTML = isDark 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Show toast notification
        if (window.Toast) {
            window.Toast.success(
                isDark ? 'Dark mode activated' : 'Light mode activated',
                'Theme Changed'
            );
        }
        
        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: isDark ? 'dark' : 'light' }
        }));
    }

    // Initialize
    function init() {
        const button = createToggleButton();
        button.addEventListener('click', toggleDarkMode);
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    const shouldBeDark = e.matches;
                    document.documentElement.classList.toggle('dark-mode', shouldBeDark);
                    
                    if (button) {
                        button.innerHTML = shouldBeDark 
                            ? '<i class="fas fa-sun"></i>' 
                            : '<i class="fas fa-moon"></i>';
                    }
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose toggle function globally
    window.toggleDarkMode = toggleDarkMode;
})();
