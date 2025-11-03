// Global variables
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Note: API keys are now managed by the API configuration system in js/api-config.js

// DOM elements - with safe querySelector
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const demoSearchInput = document.getElementById('demo-search');
const demoSearchBtn = document.getElementById('demo-search-btn');
const welcomeSection = document.getElementById('welcomeSection');
const destinationSection = document.getElementById('destinationSection');
const weatherSection = document.getElementById('weatherSection');
const cityNameElement = document.getElementById('cityName');
const photoGallery = document.getElementById('photoGallery');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weatherCondition');
const weatherLocation = document.getElementById('weatherLocation');
const recentSearchesContainer = document.getElementById('recentSearches');

// Navigation elements - with null checks
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Error handling utility function
function safeElementOperation(element, operation, fallback = null) {
    try {
        if (element && typeof operation === 'function') {
            return operation(element);
        }
        return fallback;
    } catch (error) {
        console.warn('Element operation failed:', error);
        return fallback;
    }
}

// Animation and scroll handling
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupScrollEffects();
    setupIntersectionObserver();
    initializeCoolAnimations();
});

// ============================================================================
// COOL ANIMATIONS FOR ALL PAGES
// ============================================================================

function initializeCoolAnimations() {
    // Add animations based on page context
    addHeroAnimations();
    addCardHoverEffects();
    addButtonRippleEffects();
    addParallaxEffects();
    addMouseMagnetEffect();
    addTextRevealAnimation();
    addImageLoadAnimation();
    addScrollProgressBar();
    addFloatingElements();
    addCursorFollower();
}

// Hero section animations
function addHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title, h1');
    const heroDescription = document.querySelector('.hero-description, .hero p');
    const heroButtons = document.querySelectorAll('.btn-hero, .hero-actions .btn');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroDescription.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 400);
    }
    
    heroButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0) rotate(-180deg)';
        setTimeout(() => {
            btn.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1) rotate(0deg)';
        }, 600 + (index * 150));
    });
}

// Enhanced card hover effects
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .destination-card, .photo-card, .blog-card, .tip-card');
    
    cards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateZ(1deg)';
            this.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.3)';
            
            // Add glow effect
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
                border-radius: inherit;
                filter: blur(20px);
                opacity: 0.6;
                z-index: -1;
                animation: glowPulse 2s ease-in-out infinite;
            `;
            this.style.position = 'relative';
            this.appendChild(glow);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
            this.style.boxShadow = '';
            const glow = this.querySelector('.card-glow');
            if (glow) glow.remove();
        });
        
        // Tilt effect based on mouse position
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) scale(1.03) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Button ripple effects
function addButtonRippleEffects() {
    const buttons = document.querySelectorAll('button, .btn, a.btn-primary, a.btn-hero');
    
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Enhanced parallax effects
function addParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .page-hero, [data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic effect for buttons
function addMouseMagnetEffect() {
    const magneticElements = document.querySelectorAll('.btn-hero, .btn-primary');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Text reveal animation
function addTextRevealAnimation() {
    const textElements = document.querySelectorAll('h1, h2, h3, .section-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `textReveal 0.05s ease forwards ${index * 0.02}s`;
            element.appendChild(span);
        });
    });
}

// Image load animation
function addImageLoadAnimation() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        
        img.addEventListener('load', function() {
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Trigger if already loaded
        if (img.complete) {
            img.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
}

// Scroll progress bar
function addScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Floating elements animation
function addFloatingElements() {
    const floatingElements = document.querySelectorAll('.hero-feature, .stat-item, .benefit-item');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `floatAnimation ${3 + (index % 3)}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Custom cursor follower
function addCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.05s ease;
    `;
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = (e.clientX - 4) + 'px';
        cursorDot.style.top = (e.clientY - 4) + 'px';
    });
    
    // Expand on clickable elements
    const clickables = document.querySelectorAll('a, button, .btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = '#ec4899';
            cursorDot.style.background = '#ec4899';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#3b82f6';
            cursorDot.style.background = '#3b82f6';
        });
    });
}

// ============================================================================

// Initialize page animations
function initializeAnimations() {
    // Add animation classes to elements that should animate on load
    const animatedElements = document.querySelectorAll('.feature-card, .photo-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${0.1 * index}s`;
    });
}

// Setup scroll effects for header and other elements
function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header scroll effect
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        lastScrollY = currentScrollY;
    });
}

// Setup intersection observer for scroll-triggered animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.feature-card, .photo-card, .tip-card, .benefit-item, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fade-in-up');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when scrolled into view
    const elementsToObserve = document.querySelectorAll(
        '.welcome-section, .destination-section, .weather-section, .popular-destinations-section, ' +
        '.why-choose-section, .travel-tips-section, .stats-section, .cta-section, ' +
        '.benefits-grid, .tips-container, .stats-container'
    );
    elementsToObserve.forEach(el => observer.observe(el));
}

// Sample data for demonstration
const sampleDestinations = {
    'paris': {
        name: 'Paris, France',
        photos: [
            { title: 'Eiffel Tower', description: 'Iconic iron tower and symbol of Paris' },
            { title: 'Louvre Museum', description: 'World famous art museum' },
            { title: 'Notre-Dame Cathedral', description: 'Historic Gothic cathedral' },
            { title: 'Arc de Triomphe', description: 'Triumphal arch at Champs-Élysées' },
            { title: 'Seine River', description: 'Beautiful river cruise views' }
        ],
        weather: {
            temperature: '18°C',
            condition: 'Partly Cloudy',
            icon: 'fas fa-cloud-sun'
        }
    },
    'tokyo': {
        name: 'Tokyo, Japan',
        photos: [
            { title: 'Tokyo Tower', description: 'Communications tower and city landmark' },
            { title: 'Senso-ji Temple', description: 'Ancient Buddhist temple in Asakusa' },
            { title: 'Shibuya Crossing', description: 'World famous pedestrian crossing' },
            { title: 'Mount Fuji View', description: 'Scenic view of Japan\'s sacred mountain' },
            { title: 'Imperial Palace', description: 'Primary residence of the Emperor of Japan' }
        ],
        weather: {
            temperature: '24°C',
            condition: 'Sunny',
            icon: 'fas fa-sun'
        }
    },
    'london': {
        name: 'London, United Kingdom',
        photos: [
            { title: 'Big Ben', description: 'Famous clock tower at Westminster' },
            { title: 'Tower Bridge', description: 'Iconic Victorian suspension bridge' },
            { title: 'Buckingham Palace', description: 'Royal residence and administrative headquarters' },
            { title: 'London Eye', description: 'Giant observation wheel on South Bank' },
            { title: 'Westminster Abbey', description: 'Historic Gothic abbey church' }
        ],
        weather: {
            temperature: '15°C',
            condition: 'Rainy',
            icon: 'fas fa-cloud-rain'
        }
    },
    'new york': {
        name: 'New York, USA',
        photos: [
            { title: 'Statue of Liberty', description: 'Symbol of freedom and democracy' },
            { title: 'Times Square', description: 'Bright lights and Broadway theaters' },
            { title: 'Central Park', description: 'Urban park in Manhattan' },
            { title: 'Brooklyn Bridge', description: 'Historic suspension bridge' },
            { title: 'Empire State Building', description: 'Art Deco skyscraper in Midtown' }
        ],
        weather: {
            temperature: '22°C',
            condition: 'Clear',
            icon: 'fas fa-sun'
        }
    },
    'sydney': {
        name: 'Sydney, Australia',
        photos: [
            { title: 'Sydney Opera House', description: 'Iconic performing arts center' },
            { title: 'Harbour Bridge', description: 'Steel through arch bridge' },
            { title: 'Bondi Beach', description: 'Famous beach and surfing spot' },
            { title: 'Royal Botanic Gardens', description: 'Historic botanical gardens' },
            { title: 'Darling Harbour', description: 'Vibrant waterfront precinct' }
        ],
        weather: {
            temperature: '26°C',
            condition: 'Partly Cloudy',
            icon: 'fas fa-cloud-sun'
        }
    },
    'dubai': {
        name: 'Dubai, UAE',
        photos: [
            { title: 'Burj Khalifa', description: 'World\'s tallest building' },
            { title: 'Palm Jumeirah', description: 'Artificial palm-shaped island' },
            { title: 'Burj Al Arab', description: 'Luxury sail-shaped hotel' },
            { title: 'Dubai Mall', description: 'One of the world\'s largest shopping malls' },
            { title: 'Dubai Fountain', description: 'Choreographed fountain system' }
        ],
        weather: {
            temperature: '32°C',
            condition: 'Sunny',
            icon: 'fas fa-sun'
        }
    },
    'rome': {
        name: 'Rome, Italy',
        photos: [
            { title: 'Colosseum', description: 'Ancient Roman amphitheater' },
            { title: 'Vatican City', description: 'Papal enclave with St. Peter\'s Basilica' },
            { title: 'Trevi Fountain', description: 'Famous Baroque fountain' },
            { title: 'Roman Forum', description: 'Ancient Roman civic center' },
            { title: 'Pantheon', description: 'Well-preserved Roman temple' }
        ],
        weather: {
            temperature: '28°C',
            condition: 'Sunny',
            icon: 'fas fa-sun'
        }
    }
};

// Color palette for photo cards
const cardColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializeDestinationHighlights();
    initializeTrendingDropdown(); // Add this for the trending dropdown
    displayRecentSearches();
    
    // Add some sample searches if none exist
    if (recentSearches.length === 0) {
        recentSearches = ['Paris', 'Tokyo', 'London'];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        displayRecentSearches();
    }
});

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Initialize header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

// Initialize navigation
function initializeNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Initialize mobile search form
    const mobileSearchForm = document.getElementById('mobileSearchForm');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    if (mobileSearchForm && mobileSearchInput) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            
            if (query) {
                // Close mobile menu
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Set the main search input value
                if (searchInput) {
                    searchInput.value = query;
                }
                
                // Trigger the main search
                handleSearch();
                
                // Clear mobile search input
                mobileSearchInput.value = '';
            }
        });
    }

    // Initialize expandable search icon
    initializeExpandableSearch();
}

// Initialize expandable search icon
function initializeExpandableSearch() {
    const searchIcon = document.getElementById('navbarSearchIcon');
    const searchIconBtn = document.getElementById('searchIconBtn');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const navbarSearchBtn = document.getElementById('navbarSearchBtn');

    if (!searchIcon || !searchIconBtn || !searchInputContainer || !navbarSearchInput || !navbarSearchBtn) {
        return;
    }

    let isExpanded = false;
    let isHovering = false;

    // Function to expand search
    function expandSearch() {
        if (!isExpanded) {
            isExpanded = true;
            searchIcon.classList.add('expanded');
            setTimeout(() => {
                navbarSearchInput.focus();
            }, 300);
        }
    }

    // Function to collapse search
    function collapseSearch() {
        if (isExpanded && !isHovering) {
            isExpanded = false;
            searchIcon.classList.remove('expanded');
            navbarSearchInput.value = '';
        }
    }

    // Click the search icon to toggle
    searchIconBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (isExpanded) {
            collapseSearch();
        } else {
            expandSearch();
        }
    });

    // Handle search submission
    navbarSearchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleNavbarSearch();
    });

    // Handle enter key in search input
    navbarSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleNavbarSearch();
        }
    });

    // Desktop hover expansion (optional)
    if (window.innerWidth > 768) {
        searchIcon.addEventListener('mouseenter', function() {
            isHovering = true;
            expandSearch();
        });

        searchIcon.addEventListener('mouseleave', function() {
            isHovering = false;
            // Delay collapse to allow moving to input
            setTimeout(() => {
                if (!isHovering && !document.activeElement.closest('.navbar-search-icon')) {
                    collapseSearch();
                }
            }, 100);
        });
    }

    // Click outside to close
    document.addEventListener('click', function(e) {
        if (!searchIcon.contains(e.target) && isExpanded) {
            collapseSearch();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isExpanded) {
            collapseSearch();
        }
    });

    // Keep expanded when input is focused
    navbarSearchInput.addEventListener('focus', function() {
        isHovering = true;
    });

    navbarSearchInput.addEventListener('blur', function() {
        isHovering = false;
        setTimeout(() => {
            if (!document.activeElement.closest('.navbar-search-icon')) {
                collapseSearch();
            }
        }, 100);
    });
}

// Handle navbar search functionality
function handleNavbarSearch() {
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const searchIcon = document.getElementById('navbarSearchIcon');
    
    if (!navbarSearchInput) return;
    
    const query = navbarSearchInput.value.trim();
    
    if (query) {
        // Set the main search input value
        if (searchInput) {
            searchInput.value = query;
        }
        
        // Collapse the search icon
        if (searchIcon) {
            searchIcon.classList.remove('expanded');
        }
        
        // Clear navbar search input
        navbarSearchInput.value = '';
        
        // Trigger the main search
        handleSearch();
    }
}

// Initialize search functionality
function initializeSearch() {
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Initialize demo search
    if (demoSearchBtn && demoSearchInput) {
        demoSearchBtn.addEventListener('click', handleDemoSearch);
        demoSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleDemoSearch();
            }
        });
    }
}

// Handle demo search functionality
function handleDemoSearch() {
    const query = demoSearchInput?.value.trim();
    if (query) {
        // Copy the search to the main search input if it exists
        if (searchInput) {
            searchInput.value = query;
        }
        
        // Add visual feedback
        if (demoSearchBtn) {
            demoSearchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            demoSearchBtn.disabled = true;
        }
        
        // Trigger the main search after a brief delay for UX
        setTimeout(() => {
            handleSearch();
            
            // Reset button
            if (demoSearchBtn) {
                demoSearchBtn.innerHTML = '<i class="fas fa-magic"></i> Search';
                demoSearchBtn.disabled = false;
            }
            
            // Scroll to results
            setTimeout(() => {
                const destinationSection = document.getElementById('destinationSection');
                if (destinationSection && !destinationSection.classList.contains('hidden')) {
                    destinationSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        }, 800);
    } else {
        alert('Please enter a city name to search.');
    }
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a city name to search.');
        return;
    }
    
    // Use the sample data system for demonstration
    searchDestination(query);
}

// Display destination information
function displayDestination(destination) {
    if (cityNameElement) {
        cityNameElement.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    }
    
    if (photoGallery) {
        photoGallery.innerHTML = '';
        
        photos.forEach((photo, index) => {
            const photoCard = createRealPhotoCard(photo, index);
            photoGallery.appendChild(photoCard);
        });
    }

    if (weatherData) {
        displayRealWeather(weatherData);
    }
}

// Create photo card with real Unsplash data
function createRealPhotoCard(photo, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    
    card.innerHTML = `
        <img src="${photo.urls.regular}" alt="${photo.alt_description || 'Destination photo'}" loading="lazy">
        <div class="photo-info">
            <h4>${photo.alt_description || `Photo ${index + 1}`}</h4>
            <p>Photo by ${photo.user.name} on Unsplash</p>
        </div>
    `;
    
    return card;
}

// Display real weather data
function displayRealWeather(weatherData) {
    if (!weatherIcon || !temperature || !weatherCondition || !weatherLocation) return;
    
    const iconMap = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-rain',
        '09n': 'fas fa-cloud-rain',
        '10d': 'fas fa-cloud-sun-rain',
        '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog',
        '50n': 'fas fa-smog'
    };
    
    weatherIcon.className = iconMap[weatherData.weather[0].icon] || 'fas fa-sun';
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherCondition.textContent = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
    weatherLocation.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
}

// Show search results sections
function showSearchResults() {
    if (welcomeSection) welcomeSection.classList.add('hidden');
    if (destinationSection) destinationSection.classList.remove('hidden');
    if (weatherSection) weatherSection.classList.remove('hidden');
    
    if (destinationSection) {
        destinationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search for destination
function searchDestination(query) {
    // Normalize the query to lowercase for matching
    const normalizedQuery = query.toLowerCase().trim();
    const destination = sampleDestinations[normalizedQuery];
    
    if (destination) {
        // Add to recent searches
        addToRecentSearches(destination.name);
        
        // Display results
        displayDestination(destination);
        displayWeather(destination.weather, destination.name);
        
        // Hide welcome section and show results
        if (welcomeSection) welcomeSection.classList.add('hidden');
        if (destinationSection) destinationSection.classList.remove('hidden');
        if (weatherSection) weatherSection.classList.remove('hidden');
        
        // Scroll to results
        if (destinationSection) {
            destinationSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Show message for city not found
        showCityNotFound(query);
    }
    
    // Clear search input
    if (searchInput) {
        searchInput.value = '';
    }
}

// Initialize trending dropdown
function initializeTrendingDropdown() {
    const trendingItems = document.querySelectorAll('.trending-item');
    
    if (trendingItems.length > 0) {
        trendingItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = item.getAttribute('data-destination');
                
                if (destination) {
                    // Set the search input and trigger search
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        searchInput.value = destination;
                        
                        // Add visual feedback
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.transform = '';
                        }, 150);
                        
                        // Trigger search
                        setTimeout(() => {
                            handleSearch();
                        }, 200);
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
}

// Global performSearch function for trending dropdown and external calls
window.performSearch = function(query) {
    searchDestination(query);
};

// Display destination information
function displayDestination(destination) {
    if (!cityNameElement || !photoGallery) return;
    
    cityNameElement.textContent = destination.name;
    photoGallery.innerHTML = '';
    
    destination.photos.forEach((photo, index) => {
        const photoCard = createPhotoCard(photo, index);
        photoGallery.appendChild(photoCard);
    });
}

// Create photo card element
function createPhotoCard(photo, index) {
    const card = document.createElement('div');
    card.className = 'photo-card fade-in';
    
    // Use a placeholder image with gradient background
    card.innerHTML = `
        <div style="
            height: 240px;
            background: ${cardColors[index % cardColors.length]};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            font-weight: bold;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%);
                background-size: 20px 20px;
            "></div>
            📸
        </div>
        <div class="photo-info">
            <h4>${photo.title}</h4>
            <p>${photo.description}</p>
        </div>
    `;
    
    // Add stagger animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    return card;
}

// Display weather information
function displayWeather(weather, cityName) {
    if (!weatherIcon || !temperature || !weatherCondition || !weatherLocation) return;
    
    weatherIcon.className = weather.icon;
    temperature.textContent = weather.temperature;
    weatherCondition.textContent = weather.condition;
    weatherLocation.textContent = cityName;
}

// Add city to recent searches
function addToRecentSearches(cityName) {
    // Remove if already exists
    recentSearches = recentSearches.filter(city => city.toLowerCase() !== cityName.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(cityName);
    
    // Keep only last 6 searches
    recentSearches = recentSearches.slice(0, 6);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    
    // Update display
    displayRecentSearches();
}

// Display recent searches
function displayRecentSearches() {
    if (!recentSearchesContainer) return;
    
    if (recentSearches.length === 0) {
        recentSearchesContainer.innerHTML = '<p class="no-searches">No recent searches yet. Start exploring!</p>';
        return;
    }
    
    recentSearchesContainer.innerHTML = '';
    
    recentSearches.forEach(city => {
        const searchCard = createSearchCard(city);
        recentSearchesContainer.appendChild(searchCard);
    });
}

// Create search card element
function createSearchCard(cityName) {
    const card = document.createElement('div');
    card.className = 'search-card fade-in';
    
    card.innerHTML = `
        <div style="margin-bottom: 1rem; font-size: 2rem;">🏙️</div>
        <h4>${cityName}</h4>
        <p>Click to explore again</p>
    `;
    
    card.addEventListener('click', () => {
        const query = cityName.split(',')[0].toLowerCase();
        searchInput.value = cityName;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        searchDestination(query);
    });
    
    return card;
}

// Show city not found message
function showCityNotFound(query) {
    if (welcomeSection) welcomeSection.classList.add('hidden');
    if (destinationSection) destinationSection.classList.remove('hidden');
    if (weatherSection) weatherSection.classList.add('hidden');
    
    if (cityNameElement) {
        cityNameElement.textContent = `"${query}" - City Not Found`;
    }
    
    if (photoGallery) {
        photoGallery.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: #666;
            ">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: #ccc;"></i>
                <h3 style="margin-bottom: 10px;">City Not Found</h3>
                <p>Sorry, we couldn't find information about "${query}". Try searching for: Paris, Tokyo, London, New York, Sydney, or Rome.</p>
            </div>
        `;
    }
    
    if (destinationSection) {
        destinationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero section on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add modern button ripple effect
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .photo-card, .destination-highlight, .benefit-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add CSS for ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .floating-element {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Enhanced smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Add parallax effect to hero section with performance optimization
let ticking = false;

function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Initialize destination highlights
function initializeDestinationHighlights() {
    const destinationHighlights = document.querySelectorAll('.destination-highlight');
    
    destinationHighlights.forEach(highlight => {
        highlight.addEventListener('click', function() {
            const cityName = this.dataset.city;
            if (searchInput && cityName) {
                searchInput.value = cityName;
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Trigger search
                setTimeout(() => {
                    handleSearch();
                }, 200);
            }
        });
        
        // Add hover animation
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Clear search and show welcome section
        if (searchInput) {
            searchInput.value = '';
        }
        if (welcomeSection) welcomeSection.classList.remove('hidden');
        if (destinationSection) destinationSection.classList.add('hidden');
        if (weatherSection) weatherSection.classList.add('hidden');
    }
});

// Enhanced Mobile Touch and Accessibility Features
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileTouchFeatures();
    initializeAccessibilityFeatures();
    initializeMobileOptimizations();
});

// Mobile Touch Features
function initializeMobileTouchFeatures() {
    // Touch-friendly navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        });

        link.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
        });
    });

    // Swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && navMenu && navMenu.classList.contains('active')) {
                // Swipe right to close menu
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            } else if (swipeDistance < 0 && navMenu && !navMenu.classList.contains('active')) {
                // Swipe left to open menu (only if hamburger is visible)
                if (window.innerWidth <= 768 && hamburger) {
                    hamburger.classList.add('active');
                    navMenu.classList.add('active');
                }
            }
        }
    }

    // Touch feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .destination-card, .feature-card, .quick-destination-card');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });

        element.addEventListener('touchend', function(e) {
            this.style.transform = '';
        });
    });
}

// Accessibility Features
function initializeAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // Screen reader announcements
    const announceElement = document.createElement('div');
    announceElement.setAttribute('aria-live', 'polite');
    announceElement.setAttribute('aria-atomic', 'true');
    announceElement.className = 'sr-only';
    announceElement.id = 'screen-reader-announcements';
    document.body.appendChild(announceElement);

    window.announceToScreenReader = function(message) {
        announceElement.textContent = message;
        setTimeout(() => {
            announceElement.textContent = '';
        }, 1000);
    };
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.setAttribute('data-original-font-size', this.style.fontSize || '');
            this.style.fontSize = '16px'; // Prevent zoom on iOS
        });

        input.addEventListener('blur', function() {
            const originalSize = this.getAttribute('data-original-font-size');
            if (originalSize) {
                this.style.fontSize = originalSize;
            } else {
                this.style.fontSize = '';
            }
        });
    });

    // Optimize scroll performance on mobile
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                updateScrollDependentElements();
                scrollTimer = null;
            }, 16); // ~60fps
        }
    });

    function updateScrollDependentElements() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');

        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
}

// Destination Modal Functionality
let currentModalDestination = null;

const destinationData = {
    paris: {
        title: "Paris, France",
        weather: "22°C Partly Cloudy",
        rating: "4.8/5",
        bestTime: "Best: Apr-Jun, Sep-Oct",
        description: "The City of Light enchants millions with its timeless beauty, world-class museums, and romantic atmosphere. From the iconic Eiffel Tower to charming riverside cafés, Paris offers an unparalleled blend of art, culture, and gastronomy that defines European elegance.",
        highlights: [
            { icon: "🗼", text: "Eiffel Tower" },
            { icon: "🏛️", text: "Louvre Museum" },
            { icon: "⛪", text: "Notre-Dame" },
            { icon: "🎨", text: "Montmartre" },
            { icon: "🌊", text: "Seine River" },
            { icon: "🥐", text: "French Cuisine" }
        ],
        tips: [
            { icon: "💡", text: "Visit museums on first Sunday mornings for free entry to many attractions" },
            { icon: "🚇", text: "Buy a weekly metro pass (Navigo) for convenient transportation" },
            { icon: "🍷", text: "Try local bistros away from tourist areas for authentic French dining" },
            { icon: "📱", text: "Download offline maps as WiFi can be limited in some areas" }
        ],
        mainImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1549144511-f099e773c147?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=200&h=150&fit=crop"
        ]
    },
    tokyo: {
        title: "Tokyo, Japan",
        weather: "18°C Clear",
        rating: "4.9/5",
        bestTime: "Best: Mar-May, Sep-Nov",
        description: "A mesmerizing metropolis where ultra-modern skyscrapers stand alongside ancient temples, and cutting-edge technology blends seamlessly with centuries-old traditions. Tokyo offers an incredible journey through Japanese culture, cuisine, and innovation.",
        highlights: [
            { icon: "🏯", text: "Senso-ji Temple" },
            { icon: "🌸", text: "Cherry Blossoms" },
            { icon: "🍣", text: "Sushi & Ramen" },
            { icon: "🛍️", text: "Shibuya Crossing" },
            { icon: "🎌", text: "Imperial Palace" },
            { icon: "🎮", text: "Gaming Culture" }
        ],
        tips: [
            { icon: "🚄", text: "Get a JR Pass for unlimited train travel throughout Japan" },
            { icon: "🎭", text: "Experience a traditional tea ceremony in historic districts" },
            { icon: "🍜", text: "Try different ramen styles in various neighborhoods" },
            { icon: "📱", text: "Download Google Translate app with camera function for signs" }
        ],
        mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1492804080853-c00a4b19c02c?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=200&h=150&fit=crop"
        ]
    },
    bali: {
        title: "Bali, Indonesia",
        weather: "28°C Sunny",
        rating: "4.7/5",
        bestTime: "Best: Apr-Jun, Sep-Nov",
        description: "A tropical paradise that captivates visitors with its lush rice terraces, pristine beaches, and rich spiritual heritage. Bali offers the perfect blend of relaxation, adventure, and cultural immersion in an island setting that feels like heaven on earth.",
        highlights: [
            { icon: "🏖️", text: "Beautiful Beaches" },
            { icon: "🌾", text: "Rice Terraces" },
            { icon: "🛕", text: "Hindu Temples" },
            { icon: "🌺", text: "Tropical Flora" },
            { icon: "🏄", text: "Surfing Spots" },
            { icon: "💆", text: "Spa & Wellness" }
        ],
        tips: [
            { icon: "🏍️", text: "Rent a scooter for easy transportation around the island" },
            { icon: "💧", text: "Always carry bottled water and stay hydrated" },
            { icon: "🍽️", text: "Try local warungs (small restaurants) for authentic Indonesian food" },
            { icon: "🌅", text: "Wake up early for sunrise at Mount Batur - it's unforgettable" }
        ],
        mainImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1555400113-e0c7c40cf73c?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    rome: {
        title: "Rome, Italy",
        weather: "25°C Sunny",
        rating: "4.6/5",
        bestTime: "Best: Apr-Jun, Sep-Oct",
        description: "The Eternal City stands as a living museum where every street corner tells a story spanning over 2,000 years. From the mighty Colosseum to the spiritual Vatican, Rome offers an unparalleled journey through the heart of Western civilization.",
        highlights: [
            { icon: "🏛️", text: "Colosseum" },
            { icon: "⛲", text: "Trevi Fountain" },
            { icon: "⛪", text: "Vatican City" },
            { icon: "🎨", text: "Sistine Chapel" },
            { icon: "🏺", text: "Roman Forum" },
            { icon: "🍝", text: "Italian Cuisine" }
        ],
        tips: [
            { icon: "🎫", text: "Book skip-the-line tickets for major attractions in advance" },
            { icon: "🚶", text: "Wear comfortable walking shoes - Rome is best explored on foot" },
            { icon: "🍕", text: "Try authentic Roman pizza al taglio (by the slice)" },
            { icon: "⛪", text: "Dress modestly when visiting religious sites" }
        ],
        mainImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=200&h=150&fit=crop"
        ]
    },
    iceland: {
        title: "Iceland",
        weather: "12°C Partly Cloudy",
        rating: "4.9/5",
        bestTime: "Best: Jun-Aug, Nov-Mar",
        description: "A Nordic island of dramatic contrasts where fire meets ice, creating some of Earth's most spectacular landscapes. From the Northern Lights to geothermal hot springs, Iceland offers otherworldly experiences that redefine natural beauty.",
        highlights: [
            { icon: "🌋", text: "Geysir Hot Springs" },
            { icon: "❄️", text: "Northern Lights" },
            { icon: "🏔️", text: "Glaciers" },
            { icon: "💎", text: "Diamond Beach" },
            { icon: "🌈", text: "Waterfalls" },
            { icon: "🐋", text: "Whale Watching" }
        ],
        tips: [
            { icon: "🧥", text: "Pack warm, waterproof clothing regardless of season" },
            { icon: "🚗", text: "Rent a 4WD vehicle for exploring the Ring Road" },
            { icon: "🌙", text: "Visit between September-March for best Northern Lights viewing" },
            { icon: "♨️", text: "Don't miss the Blue Lagoon geothermal spa experience" }
        ],
        mainImage: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    santorini: {
        title: "Santorini, Greece",
        weather: "26°C Sunny",
        rating: "4.8/5",
        bestTime: "Best: Apr-Jun, Sep-Oct",
        description: "A volcanic island paradise in the Aegean Sea, famous for its dramatic cliffs, white-washed buildings, and stunning sunsets. Santorini offers a perfect blend of ancient history, romantic ambiance, and Mediterranean charm.",
        highlights: [
            { icon: "🌅", text: "Oia Sunset" },
            { icon: "🏛️", text: "Ancient Akrotiri" },
            { icon: "🍷", text: "Wine Tasting" },
            { icon: "🏖️", text: "Red Beach" },
            { icon: "⛪", text: "Blue Domes" },
            { icon: "🛥️", text: "Volcano Tours" }
        ],
        tips: [
            { icon: "📸", text: "Arrive early at Oia for the best sunset viewing spots" },
            { icon: "🍽️", text: "Try local specialties like fava beans and fresh seafood" },
            { icon: "🚶", text: "Wear comfortable shoes for walking on cobblestone streets" },
            { icon: "💰", text: "Book accommodations early - prices rise quickly in peak season" }
        ],
        mainImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1516650281061-5f44b1b7e8b9?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    dubai: {
        title: "Dubai, UAE",
        weather: "32°C Sunny",
        rating: "4.5/5",
        bestTime: "Best: Nov-Mar",
        description: "A gleaming metropolis that rose from the desert to become a global hub of luxury, innovation, and architectural marvels. Dubai offers world-class shopping, dining, and entertainment in a setting that defies imagination.",
        highlights: [
            { icon: "🏗️", text: "Burj Khalifa" },
            { icon: "🏖️", text: "Jumeirah Beach" },
            { icon: "🛍️", text: "Dubai Mall" },
            { icon: "🏜️", text: "Desert Safari" },
            { icon: "🏨", text: "Luxury Hotels" },
            { icon: "⛵", text: "Marina District" }
        ],
        tips: [
            { icon: "🌡️", text: "Visit during winter months (Nov-Mar) for comfortable weather" },
            { icon: "👗", text: "Dress conservatively in public areas and malls" },
            { icon: "💳", text: "Use metro system for convenient and affordable transportation" },
            { icon: "🕌", text: "Respect local customs, especially during Ramadan" }
        ],
        mainImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1580295189149-20a2eb6e7d14?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    maldives: {
        title: "Maldives",
        weather: "30°C Sunny",
        rating: "4.9/5",
        bestTime: "Best: Nov-Apr",
        description: "A tropical nation of 1,192 coral islands scattered across the Indian Ocean, offering some of the world's most pristine beaches, crystal-clear waters, and luxurious overwater accommodations that define paradise.",
        highlights: [
            { icon: "🏖️", text: "Private Beaches" },
            { icon: "🏠", text: "Overwater Villas" },
            { icon: "🐠", text: "Snorkeling" },
            { icon: "🐋", text: "Diving" },
            { icon: "🌺", text: "Spa Treatments" },
            { icon: "🛥️", text: "Island Hopping" }
        ],
        tips: [
            { icon: "🏊", text: "Bring reef-safe sunscreen to protect marine life" },
            { icon: "💰", text: "All-inclusive packages often provide better value" },
            { icon: "📱", text: "WiFi may be limited - perfect for digital detox" },
            { icon: "🌊", text: "Book excursions through your resort for safety and convenience" }
        ],
        mainImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    switzerland: {
        title: "Switzerland",
        weather: "15°C Clear",
        rating: "4.9/5",
        bestTime: "Best: Jun-Sep, Dec-Mar",
        description: "A Alpine wonderland of snow-capped peaks, pristine lakes, and charming villages. Switzerland offers world-class skiing, hiking, and some of the most breathtaking mountain scenery on Earth.",
        highlights: [
            { icon: "🏔️", text: "Swiss Alps" },
            { icon: "🚂", text: "Scenic Railways" },
            { icon: "🏔️", text: "Matterhorn" },
            { icon: "🧀", text: "Swiss Cheese" },
            { icon: "⛷️", text: "Skiing" },
            { icon: "🍫", text: "Swiss Chocolate" }
        ],
        tips: [
            { icon: "🚂", text: "Get a Swiss Travel Pass for unlimited train travel" },
            { icon: "💰", text: "Switzerland is expensive - budget accordingly" },
            { icon: "🧥", text: "Pack layers - mountain weather changes quickly" },
            { icon: "📱", text: "Download SBB app for train schedules and tickets" }
        ],
        mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    thailand: {
        title: "Thailand",
        weather: "29°C Sunny",
        rating: "4.7/5",
        bestTime: "Best: Nov-Apr",
        description: "The Land of Smiles captivates visitors with its golden temples, pristine beaches, bustling markets, and incredibly hospitable people. Experience a perfect blend of ancient culture and modern attractions.",
        highlights: [
            { icon: "🛕", text: "Buddhist Temples" },
            { icon: "🏖️", text: "Tropical Beaches" },
            { icon: "🍜", text: "Street Food" },
            { icon: "🐘", text: "Elephant Sanctuaries" },
            { icon: "💆", text: "Thai Massage" },
            { icon: "🏝️", text: "Island Hopping" }
        ],
        tips: [
            { icon: "👗", text: "Dress modestly when visiting temples" },
            { icon: "🌶️", text: "Start with mild spice levels and work your way up" },
            { icon: "💰", text: "Bargain at markets but be respectful" },
            { icon: "🚕", text: "Use Grab app for convenient transportation" }
        ],
        mainImage: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    morocco: {
        title: "Morocco",
        weather: "24°C Sunny",
        rating: "4.6/5",
        bestTime: "Best: Oct-Apr",
        description: "A North African kingdom where ancient traditions meet stunning landscapes. From the bustling souks of Marrakech to the vast Sahara Desert, Morocco offers an exotic adventure filled with rich culture and hospitality.",
        highlights: [
            { icon: "🕌", text: "Historic Medinas" },
            { icon: "🏜️", text: "Sahara Desert" },
            { icon: "🍃", text: "Mint Tea Culture" },
            { icon: "🧶", text: "Berber Carpets" },
            { icon: "🏰", text: "Kasbahs" },
            { icon: "🌶️", text: "Tagine Cuisine" }
        ],
        tips: [
            { icon: "🧥", text: "Pack layers - desert nights can be cold" },
            { icon: "💰", text: "Haggling is expected in souks and markets" },
            { icon: "👗", text: "Dress conservatively, especially in rural areas" },
            { icon: "💧", text: "Drink bottled water and avoid ice in drinks" }
        ],
        mainImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    newzealand: {
        title: "New Zealand",
        weather: "16°C Partly Cloudy",
        rating: "4.8/5",
        bestTime: "Best: Dec-Mar, Sep-Nov",
        description: "A land of dramatic landscapes and outdoor adventures, where snow-capped mountains meet pristine beaches. New Zealand offers world-class hiking, extreme sports, and breathtaking scenery at every turn.",
        highlights: [
            { icon: "🏔️", text: "Mountain Ranges" },
            { icon: "🚁", text: "Adventure Sports" },
            { icon: "🐧", text: "Wildlife" },
            { icon: "🎬", text: "Movie Locations" },
            { icon: "🌿", text: "National Parks" },
            { icon: "🍷", text: "Wine Regions" }
        ],
        tips: [
            { icon: "👟", text: "Bring quality hiking boots for trails" },
            { icon: "🌦️", text: "Weather changes quickly - pack layers" },
            { icon: "🚗", text: "Road trips offer the best way to explore" },
            { icon: "📱", text: "Book activities in advance during peak season" }
        ],
        mainImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    peru: {
        title: "Peru",
        weather: "20°C Sunny",
        rating: "4.7/5",
        bestTime: "Best: May-Sep",
        description: "Home to the legendary Machu Picchu and rich Incan heritage, Peru combines ancient mysteries with stunning Andean landscapes. Experience colorful markets, delicious cuisine, and some of the world's most iconic archaeological sites.",
        highlights: [
            { icon: "🏛️", text: "Machu Picchu" },
            { icon: "🏔️", text: "Andes Mountains" },
            { icon: "🦙", text: "Llamas & Alpacas" },
            { icon: "🍽️", text: "Peruvian Cuisine" },
            { icon: "🎨", text: "Inca Heritage" },
            { icon: "🌈", text: "Rainbow Mountain" }
        ],
        tips: [
            { icon: "💊", text: "Prepare for altitude sickness in Cusco" },
            { icon: "🎫", text: "Book Machu Picchu tickets months in advance" },
            { icon: "🥤", text: "Try coca tea to help with altitude adjustment" },
            { icon: "👟", text: "Bring comfortable hiking shoes for ruins" }
        ],
        mainImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    norway: {
        title: "Norway",
        weather: "8°C Clear",
        rating: "4.9/5",
        bestTime: "Best: May-Sep, Nov-Mar",
        description: "A Nordic wonderland of dramatic fjords, northern lights, and midnight sun. Norway offers some of Europe's most spectacular natural beauty, from deep blue fjords to the magical aurora borealis dancing across polar skies.",
        highlights: [
            { icon: "🌊", text: "Norwegian Fjords" },
            { icon: "❄️", text: "Northern Lights" },
            { icon: "🌅", text: "Midnight Sun" },
            { icon: "🏔️", text: "Arctic Circle" },
            { icon: "🚢", text: "Coastal Cruises" },
            { icon: "🏠", text: "Traditional Villages" }
        ],
        tips: [
            { icon: "🧥", text: "Pack warm, waterproof clothing year-round" },
            { icon: "💰", text: "Norway is expensive - budget accordingly" },
            { icon: "🚂", text: "Take scenic train routes for amazing views" },
            { icon: "🌙", text: "Best northern lights viewing: September-March" }
        ],
        mainImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    },
    australia: {
        title: "Australia",
        weather: "22°C Sunny",
        rating: "4.8/5",
        bestTime: "Best: Sep-Nov, Mar-May",
        description: "A vast continent of diverse landscapes and unique wildlife. From the Great Barrier Reef to the red heart of the Outback, Australia offers urban sophistication, natural wonders, and adventures found nowhere else on Earth.",
        highlights: [
            { icon: "🐨", text: "Unique Wildlife" },
            { icon: "🏖️", text: "Great Barrier Reef" },
            { icon: "🏜️", text: "Outback Adventure" },
            { icon: "🏙️", text: "Modern Cities" },
            { icon: "🏄", text: "Surfing Culture" },
            { icon: "🍷", text: "Wine Regions" }
        ],
        tips: [
            { icon: "☀️", text: "Use strong sunscreen - UV levels are intense" },
            { icon: "🚗", text: "Distances are vast - plan travel time carefully" },
            { icon: "🦘", text: "Respect wildlife and maintain safe distances" },
            { icon: "🏊", text: "Learn about local water safety before swimming" }
        ],
        mainImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop&crop=entropy&auto=format",
        gallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
        ]
    }
};

function openDestinationModal(destination) {
    currentModalDestination = destination;
    const modal = document.getElementById('destinationModal');
    const data = destinationData[destination];
    
    if (!data) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalWeather').textContent = data.weather;
    document.getElementById('modalRating').textContent = data.rating;
    document.getElementById('modalBestTime').textContent = data.bestTime;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Set main image
    const modalImage = document.getElementById('modalImage');
    modalImage.style.backgroundImage = `url(${data.mainImage})`;
    
    // Load gallery
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';
    data.gallery.forEach((imgUrl, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'modal-gallery-thumb';
        thumb.style.backgroundImage = `url(${imgUrl})`;
        thumb.onclick = () => {
            modalImage.style.backgroundImage = `url(${imgUrl})`;
            document.querySelectorAll('.modal-gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
        if (index === 0) thumb.classList.add('active');
        gallery.appendChild(thumb);
    });
    
    // Load highlights
    const highlights = document.getElementById('modalHighlights');
    highlights.innerHTML = '';
    data.highlights.forEach(highlight => {
        const item = document.createElement('div');
        item.className = 'modal-highlight-item';
        item.innerHTML = `
            <span class="highlight-icon">${highlight.icon}</span>
            <span class="highlight-text">${highlight.text}</span>
        `;
        highlights.appendChild(item);
    });
    
    // Load tips
    const tips = document.getElementById('modalTips');
    tips.innerHTML = '';
    data.tips.forEach(tip => {
        const item = document.createElement('div');
        item.className = 'travel-tip-item';
        item.innerHTML = `
            <i class="fas fa-lightbulb tip-icon"></i>
            <span class="tip-text">${tip.text}</span>
        `;
        tips.appendChild(item);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add closing animation
    modalContent.style.animation = 'modalSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards';
    modal.style.animation = 'backdropFadeOut 0.3s ease-out forwards';
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalContent.style.animation = '';
        modal.style.animation = '';
        currentModalDestination = null;
    }, 300);
}

function addToFavorites(destination) {
    // Add to favorites functionality
    alert(`${destinationData[destination]?.title || destination} added to favorites!`);
}

function shareDestination(destination) {
    // Share functionality
    if (navigator.share) {
        navigator.share({
            title: destinationData[destination]?.title || destination,
            text: `Check out this amazing destination: ${destinationData[destination]?.title}`,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        const shareText = `Check out ${destinationData[destination]?.title || destination} on Exploora!`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Share link copied to clipboard!');
        });
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('destinationModal');
    if (e.target === modal) {
        closeDestinationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDestinationModal();
    }
});
