// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const destinationSection = document.getElementById('destinationSection');
const destinationGrid = document.getElementById('destinationGrid');
const weatherSection = document.getElementById('weatherSection');
const weatherCard = document.getElementById('weatherCard');
const recentSearchesContainer = document.getElementById('recentSearches');

// Sample destination data
const destinations = {
    paris: {
        name: "Paris, France",
        description: "The City of Light, famous for its art, fashion, gastronomy, and culture.",
        icon: "🗼",
        weather: { temp: "18°C", condition: "Partly Cloudy", icon: "fas fa-cloud-sun" }
    },
    tokyo: {
        name: "Tokyo, Japan",
        description: "A bustling metropolis blending ultramodern and traditional architecture.",
        icon: "🏯",
        weather: { temp: "22°C", condition: "Sunny", icon: "fas fa-sun" }
    },
    bali: {
        name: "Bali, Indonesia",
        description: "Tropical paradise known for beautiful beaches and vibrant culture.",
        icon: "🏝️",
        weather: { temp: "28°C", condition: "Tropical", icon: "fas fa-umbrella-beach" }
    },
    newyork: {
        name: "New York, USA",
        description: "The Big Apple, a global hub of art, fashion, and finance.",
        icon: "🏙️",
        weather: { temp: "15°C", condition: "Cloudy", icon: "fas fa-cloud" }
    },
    london: {
        name: "London, UK",
        description: "Historic city combining royal heritage with modern innovation.",
        icon: "🎡",
        weather: { temp: "12°C", condition: "Rainy", icon: "fas fa-cloud-rain" }
    },
    dubai: {
        name: "Dubai, UAE",
        description: "Luxury destination featuring stunning architecture and shopping.",
        icon: "🏗️",
        weather: { temp: "35°C", condition: "Hot", icon: "fas fa-sun" }
    },
    rome: {
        name: "Rome, Italy",
        description: "Eternal City rich in history, art, and culinary traditions.",
        icon: "🏛️",
        weather: { temp: "20°C", condition: "Pleasant", icon: "fas fa-cloud-sun" }
    },
    sydney: {
        name: "Sydney, Australia",
        description: "Harbor city famous for the Opera House and beautiful beaches.",
        icon: "🌉",
        weather: { temp: "24°C", condition: "Clear", icon: "fas fa-sun" }
    }
};

// Recent searches storage
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeRecentSearches();
    addEventListeners();
    addScrollAnimations();
    addHeroAnimations();
});

// Event Listeners
function addEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // CTA button functionality
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', function() {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', function() {
            alert('🎬 Travel stories feature coming soon! Stay tuned for amazing travel videos and experiences.');
        });
    }

    // Featured card interactions
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.querySelector('h3').textContent.toLowerCase();
            let searchTerm = '';
            
            switch(true) {
                case cardType.includes('mountain'):
                    searchTerm = 'Switzerland';
                    break;
                case cardType.includes('beach'):
                    searchTerm = 'Bali';
                    break;
                case cardType.includes('urban'):
                    searchTerm = 'Tokyo';
                    break;
                case cardType.includes('nature'):
                    searchTerm = 'New Zealand';
                    break;
                default:
                    searchTerm = 'Paris';
            }
            
            searchInput.value = searchTerm;
            handleSearch();
        });
    });
}

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
