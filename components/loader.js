// Component Loader - loads header and footer components
class ComponentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.setActiveNavigation();
        this.initializeSearch();
        this.initializeMobileMenu();
        this.initializeTrendingDropdown();
    }

    async loadComponents() {
        try {
            // Load header
            const headerResponse = await fetch('components/header.html');
            const headerHTML = await headerResponse.text();
            document.getElementById('header-placeholder').innerHTML = headerHTML;

            // Load footer
            const footerResponse = await fetch('components/footer.html');
            const footerHTML = await footerResponse.text();
            document.getElementById('footer-placeholder').innerHTML = footerHTML;
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    setActiveNavigation() {
        // Get current page name from URL
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const pageMap = {
            'index': 'home',
            'about': 'about',
            'destinations': 'destinations',
            'blog': 'blog',
            'contact': 'contact'
        };

        // Wait for DOM to be ready
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageMap[currentPage]) {
                    link.classList.add('active');
                }
            });
        }, 100);
    }

    initializeSearch() {
        setTimeout(() => {
            const searchBtn = document.getElementById('searchBtn');
            const searchInput = document.getElementById('searchInput');

            if (searchBtn && searchInput) {
                searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query) {
                        // Redirect to home page with search query
                        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
                    }
                });

                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        searchBtn.click();
                    }
                });
            }
        }, 100);
    }

    initializeMobileMenu() {
        setTimeout(() => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });

                // Close menu when clicking on a link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                });
            }
        }, 100);
    }

    initializeTrendingDropdown() {
        setTimeout(() => {
            const trendingItems = document.querySelectorAll('.trending-item');
            
            if (trendingItems.length > 0) {
                trendingItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        const destination = item.getAttribute('data-destination');
                        
                        if (destination) {
                            // Navigate to home page and trigger search
                            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                                // Already on home page, just search
                                const searchInput = document.getElementById('demo-search') || document.getElementById('searchInput');
                                if (searchInput && window.performSearch) {
                                    searchInput.value = destination;
                                    window.performSearch(destination);
                                    
                                    // Scroll to search demo section
                                    setTimeout(() => {
                                        const searchDemo = document.getElementById('search-demo');
                                        if (searchDemo) {
                                            searchDemo.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }, 100);
                                }
                            } else {
                                // Redirect to home page with search query
                                window.location.href = `index.html?search=${encodeURIComponent(destination)}`;
                            }
                        }
                    });
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    const trendingDropdown = document.querySelector('.trending-dropdown');
                    if (trendingDropdown && !trendingDropdown.contains(e.target)) {
                        // Force close dropdown by removing hover state temporarily
                        trendingDropdown.style.pointerEvents = 'none';
                        setTimeout(() => {
                            trendingDropdown.style.pointerEvents = '';
                        }, 100);
                    }
                });

                console.log('🔥 Trending destinations dropdown initialized');
            }
        }, 100);
    }
}

// Initialize component loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});

// Auto-execute search if URL has search parameter
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery && window.location.pathname.includes('index.html')) {
        // Wait for search input to be loaded
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && window.performSearch) {
                searchInput.value = searchQuery;
                window.performSearch(searchQuery);
            }
        }, 500);
    }
});
