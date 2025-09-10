// Global variables
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// API Keys (Replace with your actual API keys)
const UNSPLASH_API_KEY = 'your_unsplash_api_key_here';
const OPENWEATHER_API_KEY = 'your_openweather_api_key_here';

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
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

// Navigation elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Animation and scroll handling
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupScrollEffects();
    setupIntersectionObserver();
});

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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when scrolled into view
    const elementsToObserve = document.querySelectorAll('.feature-card, .photo-card, .destination-section, .weather-section');
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
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a city name to search.');
        return;
    }
    
    // Use real APIs or fallback to sample data
    if (UNSPLASH_API_KEY !== 'your_unsplash_api_key_here' && OPENWEATHER_API_KEY !== 'your_openweather_api_key_here') {
        searchWithAPIs(query);
    } else {
        // Fallback to sample data
        searchDestination(query);
    }
}

// Search using real APIs
async function searchWithAPIs(query) {
    try {
        const [photosData, weatherData] = await Promise.all([
            fetchUnsplashPhotos(query),
            fetchWeatherData(query)
        ]);

        if (photosData && weatherData) {
            displayRealDestination(query, photosData, weatherData);
            addToRecentSearches(query);
            showSearchResults();
        } else {
            showCityNotFound(query);
        }
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to sample data
        searchDestination(query);
    }
}

// Fetch photos from Unsplash API
async function fetchUnsplashPhotos(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=${UNSPLASH_API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Unsplash API Error:', error);
        return null;
    }
}

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(query) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Weather API Error:', error);
        return null;
    }
}

// Display destination with real API data
function displayRealDestination(query, photos, weatherData) {
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
    const destination = sampleDestinations[query];
    
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
        if (e.target.classList.contains('btn')) {
            const btn = e.target;
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
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
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

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

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

// Add search suggestions (simple implementation)
const searchSuggestions = Object.keys(sampleDestinations);
let currentSuggestionIndex = -1;

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    
    if (query.length > 0) {
        const matches = searchSuggestions.filter(city => 
            city.toLowerCase().includes(query)
        );
        
        // You could implement a dropdown here for suggestions
        // For now, we'll just update placeholder text
        if (matches.length > 0 && matches[0] !== query) {
            this.style.background = `linear-gradient(to right, transparent ${query.length}ch, #f0f8ff ${query.length}ch)`;
        } else {
            this.style.background = 'white';
        }
    } else {
        this.style.background = 'white';
    }
});

// Clear background on focus out
searchInput.addEventListener('blur', function() {
    this.style.background = 'white';
});
