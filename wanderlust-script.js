// Modern Exploora - Enhanced JavaScript
// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const destinationSection = document.getElementById('destinationSection');
const destinationGrid = document.getElementById('destinationGrid');
const weatherSection = document.getElementById('weatherSection');
const weatherCard = document.getElementById('weatherCard');
const recentSearchesContainer = document.getElementById('recentSearches');

// Navigation elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Sample destination data with enhanced information
const destinations = {
    paris: {
        name: "Paris, France",
        description: "The City of Light, renowned for its art, fashion, cuisine, and timeless romance.",
        icon: "🗼",
        region: "Europe",
        weather: { temp: "18°C", condition: "Partly Cloudy", icon: "fas fa-cloud-sun" },
        highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées"]
    },
    tokyo: {
        name: "Tokyo, Japan", 
        description: "A mesmerizing blend of ancient traditions and cutting-edge technology.",
        icon: "🏯",
        region: "Asia",
        weather: { temp: "22°C", condition: "Sunny", icon: "fas fa-sun" },
        highlights: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple", "Harajuku"]
    },
    bali: {
        name: "Bali, Indonesia",
        description: "Tropical paradise with stunning beaches, rich culture, and spiritual serenity.",
        icon: "🏝️",
        region: "Asia",
        weather: { temp: "28°C", condition: "Tropical", icon: "fas fa-umbrella-beach" },
        highlights: ["Ubud Rice Terraces", "Mount Batur", "Tanah Lot", "Seminyak Beach"]
    },
    newyork: {
        name: "New York, USA",
        description: "The city that never sleeps, a global hub of culture, finance, and dreams.",
        icon: "🏙️",
        region: "North America", 
        weather: { temp: "15°C", condition: "Clear", icon: "fas fa-cloud" },
        highlights: ["Central Park", "Times Square", "Statue of Liberty", "Brooklyn Bridge"]
    },
    london: {
        name: "London, UK",
        description: "Historic metropolis blending royal heritage with modern cosmopolitan energy.",
        icon: "🎡",
        region: "Europe",
        weather: { temp: "12°C", condition: "Rainy", icon: "fas fa-cloud-rain" },
        highlights: ["Big Ben", "Tower Bridge", "British Museum", "London Eye"]
    },
    dubai: {
        name: "Dubai, UAE",
        description: "Futuristic oasis of luxury, innovation, and architectural marvels.",
        icon: "🏗️",
        region: "Middle East",
        weather: { temp: "35°C", condition: "Sunny", icon: "fas fa-sun" },
        highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Burj Al Arab"]
    },
    rome: {
        name: "Rome, Italy",
        description: "The Eternal City, where ancient history meets vibrant modern Italian life.",
        icon: "🏛️",
        region: "Europe", 
        weather: { temp: "20°C", condition: "Pleasant", icon: "fas fa-cloud-sun" },
        highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"]
    },
    sydney: {
        name: "Sydney, Australia",
        description: "Harbor city combining iconic architecture with pristine beaches and laid-back culture.",
        icon: "🌉",
        region: "Oceania",
        weather: { temp: "24°C", condition: "Clear", icon: "fas fa-sun" },
        highlights: ["Opera House", "Harbour Bridge", "Bondi Beach", "Royal Botanic Gardens"]
    }
};

// Recent searches storage
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    initializeRecentSearches();
    setupScrollAnimations();
    setupHeaderScroll();
    addRippleEffects();
    setupMobileNavigation();
}

// Event Listeners Setup
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Suggestion tags
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const destination = this.dataset.destination;
            searchInput.value = destinations[destination]?.name.split(',')[0] || destination;
            handleSearch();
            addRippleEffect(this);
        });
    });

    // Experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const experience = this.dataset.experience;
            handleExperienceClick(experience);
            addRippleEffect(this);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('.welcome-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Enhanced Search Functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        showNotification('Please enter a destination to explore! 🌍', 'warning');
        return;
    }

    // Add search animation
    addSearchAnimation();
    
    // Find destination
    const destination = findDestination(query);
    
    if (destination) {
        displaySearchResults(destination, query);
        displayWeather(destination.weather, destination.name);
        addToRecentSearches(destination.name);
        
        // Smooth scroll to results
        setTimeout(() => {
            destinationSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    } else {
        showNotFound(query);
    }
}

function findDestination(query) {
    // Direct match
    if (destinations[query]) {
        return destinations[query];
    }
    
    // Partial match
    for (let key in destinations) {
        const dest = destinations[key];
        if (dest.name.toLowerCase().includes(query) || 
            key.includes(query) || 
            dest.description.toLowerCase().includes(query) ||
            dest.region.toLowerCase().includes(query)) {
            return dest;
        }
    }
    
    return null;
}

function displaySearchResults(destination, query) {
    destinationSection.classList.remove('hidden');
    
    // Get related destinations
    const relatedDestinations = getRelatedDestinations(destination);
    
    destinationGrid.innerHTML = '';
    
    // Main destination card
    const mainCard = createDestinationCard(destination, true);
    destinationGrid.appendChild(mainCard);
    
    // Related destinations
    relatedDestinations.forEach(dest => {
        const card = createDestinationCard(dest, false);
        destinationGrid.appendChild(card);
    });
    
    // Add stagger animation
    animateCards();
}

function createDestinationCard(destination, isMain = false) {
    const card = document.createElement('div');
    card.className = `destination-card ${isMain ? 'main-destination' : ''}`;
    
    const gradients = [
        'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
        'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)',
        'linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%)',
        'linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-color) 100%)'
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    card.innerHTML = `
        <div class="destination-image" style="background: ${randomGradient};">
            <span style="font-size: 4rem;">${destination.icon}</span>
            ${isMain ? '<div class="featured-badge">✨ Featured</div>' : ''}
        </div>
        <div class="destination-info">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="destination-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${destination.region}</span>
                <span><i class="fas fa-thermometer-half"></i> ${destination.weather.temp}</span>
            </div>
            <div class="destination-highlights">
                ${destination.highlights.slice(0, 2).map(highlight => 
                    `<span class="highlight-tag">${highlight}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Add click interaction
    card.addEventListener('click', function() {
        addRippleEffect(this);
        setTimeout(() => {
            showDestinationDetails(destination);
        }, 200);
    });
    
    return card;
}

function getRelatedDestinations(currentDest) {
    const allDests = Object.values(destinations);
    return allDests
        .filter(dest => dest !== currentDest && dest.region === currentDest.region)
        .concat(allDests.filter(dest => dest !== currentDest && dest.region !== currentDest.region))
        .slice(0, 3);
}

function displayWeather(weather, cityName) {
    weatherSection.classList.remove('hidden');
    
    weatherCard.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">
                <i class="${weather.icon}"></i>
            </div>
            <div class="temperature">${weather.temp}</div>
        </div>
        <div class="weather-details">
            <h3>${cityName}</h3>
            <p>${weather.condition}</p>
            <p style="margin-top: var(--space-lg); opacity: 0.8; font-size: var(--text-sm);">
                <i class="fas fa-info-circle"></i> Perfect weather for exploring! 
            </p>
        </div>
    `;
    
    // Add animation
    animateWeatherCard();
}

function showNotFound(query) {
    destinationSection.classList.remove('hidden');
    weatherSection.classList.add('hidden');
    
    destinationGrid.innerHTML = `
        <div class="not-found-container">
            <div class="not-found-icon">🔍</div>
            <h3>Destination Not Found</h3>
            <p>We couldn't find "${query}" in our collection, but your adventure awaits!</p>
            <div class="suggestions">
                <p>Try searching for these amazing destinations:</p>
                <div class="suggestion-chips">
                    ${Object.keys(destinations).slice(0, 4).map(key => 
                        `<span class="suggestion-chip" data-dest="${key}">${destinations[key].name.split(',')[0]}</span>`
                    ).join('')}
                </div>
            </div>
            <button class="try-again-btn" onclick="searchInput.focus()">
                <i class="fas fa-search"></i> Try Another Search
            </button>
        </div>
    `;
    
    // Add event listeners to suggestion chips
    const suggestionChips = destinationGrid.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const destKey = this.dataset.dest;
            searchInput.value = destinations[destKey].name.split(',')[0];
            handleSearch();
        });
    });
}

// Recent Searches Management
function addToRecentSearches(destination) {
    if (!recentSearches.includes(destination)) {
        recentSearches.unshift(destination);
        if (recentSearches.length > 6) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        updateRecentSearchesDisplay();
    }
}

function initializeRecentSearches() {
    if (recentSearches.length === 0) {
        recentSearches = ['Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'New York, USA'];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    updateRecentSearchesDisplay();
}

function updateRecentSearchesDisplay() {
    if (!recentSearchesContainer) return;
    
    recentSearchesContainer.innerHTML = '';
    
    recentSearches.forEach((destination, index) => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.innerHTML = `
            <h4>${destination}</h4>
            <p>Click to explore again</p>
        `;
        
        card.addEventListener('click', () => {
            searchInput.value = destination.split(',')[0];
            handleSearch();
            addRippleEffect(card);
        });
        
        recentSearchesContainer.appendChild(card);
        
        // Stagger animation
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Experience Handling
function handleExperienceClick(experience) {
    const experienceMap = {
        adventure: 'mountains switzerland',
        beach: 'bali beach',
        culture: 'rome history',
        urban: 'tokyo modern'
    };
    
    const searchTerm = experienceMap[experience]?.split(' ')[0] || 'paris';
    searchInput.value = searchTerm;
    handleSearch();
}

// Animation Functions
function addSearchAnimation() {
    searchBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        searchBtn.style.transform = 'scale(1)';
    }, 150);
}

function animateCards() {
    const cards = destinationGrid.querySelectorAll('.destination-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function animateWeatherCard() {
    weatherCard.style.opacity = '0';
    weatherCard.style.transform = 'scale(0.9)';
    setTimeout(() => {
        weatherCard.style.transition = 'all 0.5s ease';
        weatherCard.style.opacity = '1';
        weatherCard.style.transform = 'scale(1)';
    }, 300);
}

function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addRippleEffects() {
    const interactiveElements = document.querySelectorAll('button, .recent-card, .experience-card, .suggestion-tag');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            addRippleEffect(this);
        });
    });
}

// Header Scroll Effect
function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Navigation
function setupMobileNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Scroll Animations
function setupScrollAnimations() {
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

    const animateElements = document.querySelectorAll('.section-title, .experience-card, .insight-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showDestinationDetails(destination) {
    const modal = document.createElement('div');
    modal.className = 'destination-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <span class="modal-icon">${destination.icon}</span>
                <h2>${destination.name}</h2>
            </div>
            <div class="modal-body">
                <p>${destination.description}</p>
                <div class="modal-highlights">
                    <h3>Top Attractions</h3>
                    <ul>
                        ${destination.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-weather">
                    <h3>Current Weather</h3>
                    <div class="weather-display">
                        <i class="${destination.weather.icon}"></i>
                        <span>${destination.weather.temp}</span>
                        <span>${destination.weather.condition}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;
    
    if (email) {
        showNotification('Thank you for subscribing! 📧', 'success');
        e.target.reset();
    } else {
        showNotification('Please enter a valid email address', 'warning');
    }
}

// Initialize smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Console welcome message
console.log(`
🌍 Welcome to Exploora! 
✈️ Redesigned with modern styling and enhanced features
🎨 Built with our custom design system
💻 Powered by HTML, CSS, and JavaScript
🚀 Ready for your next adventure!
`);

// Search functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a destination to explore! 🌍');
        return;
    }

    // Add ripple effect to search button
    addRippleEffect(searchBtn);
    
    // Find destination
    const destination = findDestination(query);
    
    if (destination) {
        displayDestination(destination, query);
        displayWeather(destination.weather, destination.name);
        addToRecentSearches(destination.name);
        
        // Smooth scroll to results
        setTimeout(() => {
            destinationSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        showNotFound(query);
    }
}

// Find destination in data
function findDestination(query) {
    // Direct match
    if (destinations[query]) {
        return destinations[query];
    }
    
    // Partial match
    for (let key in destinations) {
        const dest = destinations[key];
        if (dest.name.toLowerCase().includes(query) || 
            key.includes(query) || 
            dest.description.toLowerCase().includes(query)) {
            return dest;
        }
    }
    
    return null;
}

// Display destination results
function displayDestination(destination, query) {
    destinationSection.classList.remove('hidden');
    
    // Create multiple cards for better visual impact
    const relatedDestinations = getRelatedDestinations(query);
    
    destinationGrid.innerHTML = '';
    
    // Main destination card
    const mainCard = createDestinationCard(destination, true);
    destinationGrid.appendChild(mainCard);
    
    // Related destinations
    relatedDestinations.forEach(dest => {
        const card = createDestinationCard(dest, false);
        destinationGrid.appendChild(card);
    });
    
    // Add stagger animation
    const cards = destinationGrid.querySelectorAll('.destination-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Create destination card
function createDestinationCard(destination, isMain = false) {
    const card = document.createElement('div');
    card.className = `destination-card ${isMain ? 'main-destination' : ''}`;
    
    const gradients = [
        'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
        'linear-gradient(135deg, #0077b6 0%, #90e0ef 100%)',
        'linear-gradient(135deg, #023e8a 0%, #0077b6 100%)',
        'linear-gradient(135deg, #00b4d8 0%, #90e0ef 100%)'
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    card.innerHTML = `
        <div class="destination-image" style="background: ${randomGradient};">
            <span style="font-size: 4rem;">${destination.icon}</span>
        </div>
        <div class="destination-info">
            <h3>${destination.name} ${isMain ? '⭐' : ''}</h3>
            <p>${destination.description}</p>
        </div>
    `;
    
    // Add click animation
    card.addEventListener('click', function() {
        addRippleEffect(this);
        setTimeout(() => {
            alert(`🧳 Planning a trip to ${destination.name}? That's an amazing choice! More detailed information coming soon.`);
        }, 200);
    });
    
    return card;
}

// Get related destinations
function getRelatedDestinations(query) {
    const allDests = Object.values(destinations);
    const currentDest = findDestination(query);
    
    return allDests
        .filter(dest => dest !== currentDest)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
}

// Display weather information
function displayWeather(weather, cityName) {
    weatherSection.classList.remove('hidden');
    
    weatherCard.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">
                <i class="${weather.icon}"></i>
            </div>
            <div class="temperature">${weather.temp}</div>
        </div>
        <div class="weather-details">
            <h3>${cityName}</h3>
            <p>${weather.condition}</p>
            <p style="margin-top: 15px; opacity: 0.8; font-size: 0.9rem;">
                Perfect weather for exploring! 🌟
            </p>
        </div>
    `;
    
    // Add animation
    weatherCard.style.opacity = '0';
    weatherCard.style.transform = 'scale(0.9)';
    setTimeout(() => {
        weatherCard.style.transition = 'all 0.5s ease';
        weatherCard.style.opacity = '1';
        weatherCard.style.transform = 'scale(1)';
    }, 200);
}

// Show not found message
function showNotFound(query) {
    destinationSection.classList.remove('hidden');
    weatherSection.classList.add('hidden');
    
    destinationGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
            <h3 style="color: #0077b6; font-size: 1.8rem; margin-bottom: 15px;">
                Destination Not Found
            </h3>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px;">
                We couldn't find "${query}" in our database, but don't worry!
            </p>
            <p style="color: #666; margin-bottom: 30px;">
                Try searching for: Paris, Tokyo, Bali, New York, London, Dubai, Rome, or Sydney
            </p>
            <button onclick="searchInput.focus()" style="
                background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                Try Another Search
            </button>
        </div>
    `;
}

// Recent searches functionality
function addToRecentSearches(destination) {
    if (!recentSearches.includes(destination)) {
        recentSearches.unshift(destination);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        updateRecentSearchesDisplay();
    }
}

function initializeRecentSearches() {
    if (recentSearches.length === 0) {
        // Add some default recent searches
        recentSearches = ['Paris, France', 'Tokyo, Japan', 'Bali, Indonesia'];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    updateRecentSearchesDisplay();
}

function updateRecentSearchesDisplay() {
    recentSearchesContainer.innerHTML = '';
    
    recentSearches.forEach((destination, index) => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.innerHTML = `
            <h4>${destination}</h4>
            <p>Click to explore again</p>
        `;
        
        card.addEventListener('click', () => {
            searchInput.value = destination.split(',')[0];
            handleSearch();
            addRippleEffect(card);
        });
        
        recentSearchesContainer.appendChild(card);
        
        // Add stagger animation
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.4s ease';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Animation functions
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .main-destination {
        border: 3px solid #0077b6;
        position: relative;
    }
    
    .main-destination::before {
        content: '⭐ Featured Destination';
        position: absolute;
        top: 15px;
        right: 15px;
        background: #0077b6;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll('.section-title, .featured-card, .tip-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Hero animations
function addHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive features
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        hero.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// Console welcome message
console.log(`
🌍 Welcome to Wanderlust Hub! 
✈️ Your gateway to extraordinary adventures
🎯 Built with modern web technologies
💝 Made with ❤️ using HTML, CSS, and JavaScript
`);
