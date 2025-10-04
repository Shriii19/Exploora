/**
 * Navbar Component Loader
 * Dynamically loads the navbar component across all pages
 */

// Load navbar component on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    initializeNavbar();
});

/**
 * Load navbar component from external file
 */
async function loadNavbar() {
    try {
        const response = await fetch('components/navbar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const navbarHTML = await response.text();
        
        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        
        // Set active navigation item based on current page
        setActiveNavItem();
        
    } catch (error) {
        console.error('Error loading navbar:', error);
        // Fallback: create a simple navbar
        createFallbackNavbar();
    }
}

/**
 * Initialize navbar functionality after loading
 */
function initializeNavbar() {
    // Initialize mobile menu toggle after a short delay to ensure DOM is ready
    setTimeout(() => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbarNav = document.querySelector('.navbar-nav');
        const mobileSearchItem = document.querySelector('.mobile-search-item');
        
        if (menuToggle && navbarNav) {
            // Remove inline onclick and use proper event listener
            menuToggle.onclick = null;
            
            menuToggle.addEventListener('click', function() {
                navbarNav.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Show/hide mobile search
                if (mobileSearchItem) {
                    if (navbarNav.classList.contains('active')) {
                        mobileSearchItem.style.display = 'block';
                    } else {
                        mobileSearchItem.style.display = 'none';
                    }
                }
            });
            
            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    if (mobileSearchItem) {
                        mobileSearchItem.style.display = 'none';
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navbarNav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnToggle && navbarNav.classList.contains('active')) {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    if (mobileSearchItem) {
                        mobileSearchItem.style.display = 'none';
                    }
                }
            });
            
            // Close mobile menu on escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && navbarNav.classList.contains('active')) {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    if (mobileSearchItem) {
                        mobileSearchItem.style.display = 'none';
                    }
                }
            });
        }
        
        // Initialize search functionality
        initializeNavbarSearch();
        
        // Add scroll effect to navbar
        initializeNavbarScrollEffect();
        
    }, 100);
}

/**
 * Initialize navbar search functionality
 */
function initializeNavbarSearch() {
    const navbarSearchInput = document.getElementById('navbar-search');
    const navbarSearchBtn = document.getElementById('navbar-search-btn');
    const mobileSearchInput = document.getElementById('mobile-navbar-search');
    
    // Desktop search functionality
    if (navbarSearchInput && navbarSearchBtn) {
        navbarSearchBtn.addEventListener('click', () => {
            handleNavbarSearch(navbarSearchInput.value.trim());
        });
        
        navbarSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleNavbarSearch(navbarSearchInput.value.trim());
            }
        });
    }
    
    // Mobile search functionality
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleNavbarSearch(mobileSearchInput.value.trim());
                // Close mobile menu after search
                const navbarNav = document.querySelector('.navbar-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                const mobileSearchItem = document.querySelector('.mobile-search-item');
                
                if (navbarNav && menuToggle && mobileSearchItem) {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    mobileSearchItem.style.display = 'none';
                }
            }
        });
    }
}

/**
 * Handle navbar search functionality
 */
function handleNavbarSearch(query) {
    if (!query) {
        return;
    }
    
    // If we're not on the homepage, redirect to homepage with search query
    const currentPage = getCurrentPageName();
    if (currentPage !== 'index' && currentPage !== '') {
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        return;
    }
    
    // If we're on homepage, trigger the existing search functionality
    const existingSearchInput = document.getElementById('searchInput') || document.getElementById('demo-search');
    if (existingSearchInput) {
        existingSearchInput.value = query;
        
        // Trigger search if handleSearch function exists
        if (typeof window.handleSearch === 'function') {
            window.handleSearch();
        } else if (typeof handleSearch === 'function') {
            handleSearch();
        }
        
        // Scroll to search results
        const searchSection = document.getElementById('search-demo') || document.getElementById('destinationSection');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Clear the navbar search inputs
    const navbarSearchInput = document.getElementById('navbar-search');
    const mobileSearchInput = document.getElementById('mobile-navbar-search');
    if (navbarSearchInput) navbarSearchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href) {
            const linkPage = href.replace('.html', '').replace('./', '').replace('#', '');
            
            // Handle different page matching scenarios
            if (
                (currentPage === 'index' && (linkPage === 'index' || href === 'index.html')) ||
                (currentPage === linkPage) ||
                (currentPage === '' && linkPage === 'index')
            ) {
                link.classList.add('active');
            }
        }
    });
}

/**
 * Get current page name from URL
 */
function getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    
    if (!fileName || fileName === '') {
        return 'index';
    }
    
    return fileName.replace('.html', '');
}

/**
 * Initialize navbar scroll effects
 */
function initializeNavbarScrollEffect() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Create fallback navbar if loading fails
 */
function createFallbackNavbar() {
    const fallbackNavHTML = `
        <nav class="navbar">
            <div class="navbar-container">
                <div class="navbar-brand">
                    <div class="logo">🌍 Exploora</div>
                </div>
                <div class="menu-toggle" onclick="document.querySelector('.navbar-nav').classList.toggle('active')">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="destinations.html" class="nav-link">Destinations</a></li>
                    <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
                    <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                    <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', fallbackNavHTML);
    setActiveNavItem();
}

// Export functions for use in other modules
window.loadNavbar = loadNavbar;
window.initializeNavbar = initializeNavbar;