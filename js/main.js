import { searchCity } from './teleport-api.js';
import { getWeather, addWeatherToDestinationCard } from './weather-api.js';
import { getTrendingPhotos } from './unsplash-api.js';
import { getFlightsHotels } from './amadeus-api.js';

/**
 * Main application initialization
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the Travel Explorer application
 */
function initializeApp() {
    console.log('🌍 Travel Explorer initializing...');
    
    // Initialize search functionality
    initializeSearch();
    
    // Load trending photos on homepage
    if (isHomePage()) {
        loadTrendingPhotos();
    }
    
    // Initialize destination cards with weather
    if (isDestinationsPage()) {
        initializeDestinationWeather();
    }
    
    // Initialize navigation
    initializeNavigation();
    
    console.log('✅ Travel Explorer initialized successfully!');
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput') || document.getElementById('demo-search');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        // Handle Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Handle search button click
        if (searchBtn) {
            searchBtn.addEventListener('click', handleSearch);
        }
        
        // Add search suggestions (optional)
        searchInput.addEventListener('input', debounce(showSearchSuggestions, 300));
    }
}

/**
 * Handle search functionality
 */
async function handleSearch() {
    const searchInput = document.getElementById('searchInput') || document.getElementById('demo-search');
    const query = searchInput.value.trim();
    
    if (!query) {
        showNotification('Please enter a city name to search', 'warning');
        return;
    }
    
    try {
        showNotification('Searching for city information...', 'info');
        
        // Search for city using Teleport API
        const cityInfo = await searchCity(query);
        
        // Get weather for the city
        if (cityInfo.location) {
            await getWeather(query, cityInfo.location.lat, cityInfo.location.lon);
        }
        
        showNotification(`Found information for ${cityInfo.name}!`, 'success');
        
        // Scroll to results
        const resultsContainer = document.getElementById('city-search-results');
        if (resultsContainer) {
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
    } catch (error) {
        console.error('Search error:', error);
        showNotification('City not found. Please try a different search term.', 'error');
    }
}

/**
 * Load trending photos for homepage
 */
async function loadTrendingPhotos() {
    try {
        await getTrendingPhotos('travel destination beautiful', 12);
    } catch (error) {
        console.error('Error loading trending photos:', error);
    }
}

/**
 * Initialize weather for destination cards
 */
async function initializeDestinationWeather() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(async (card) => {
        const cityName = extractCityNameFromCard(card);
        if (cityName) {
            try {
                const weather = await getWeather(cityName);
                addWeatherToDestinationCard(card, weather);
            } catch (error) {
                console.log(`Weather not available for ${cityName}`);
            }
        }
    });
}

/**
 * Extract city name from destination card
 * @param {HTMLElement} card - Destination card element
 * @returns {string|null} City name
 */
function extractCityNameFromCard(card) {
    const heading = card.querySelector('h3');
    if (heading) {
        const fullName = heading.textContent.trim();
        // Extract just the city name (before the comma)
        return fullName.split(',')[0].trim();
    }
    return null;
}

/**
 * Show search suggestions (basic implementation)
 * @param {Event} e - Input event
 */
function showSearchSuggestions(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    
    // Popular cities for suggestions
    const popularCities = [
        'New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Dubai', 
        'Rome', 'Barcelona', 'Amsterdam', 'Berlin', 'Los Angeles', 
        'San Francisco', 'Hong Kong', 'Singapore', 'Bangkok', 'Istanbul'
    ];
    
    const suggestions = popularCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
    
    if (suggestions.length > 0) {
        showSuggestionsList(suggestions, e.target);
    } else {
        hideSuggestions();
    }
}

/**
 * Show suggestions list
 * @param {Array} suggestions - Array of suggestion strings
 * @param {HTMLElement} inputElement - Input element
 */
function showSuggestionsList(suggestions, inputElement) {
    hideSuggestions(); // Remove existing suggestions
    
    const suggestionsList = document.createElement('div');
    suggestionsList.id = 'search-suggestions';
    suggestionsList.className = 'search-suggestions';
    
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            inputElement.value = suggestion;
            hideSuggestions();
            handleSearch();
        });
        suggestionsList.appendChild(suggestionItem);
    });
    
    inputElement.parentNode.appendChild(suggestionsList);
}

/**
 * Hide search suggestions
 */
function hideSuggestions() {
    const existingSuggestions = document.getElementById('search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Handle trending dropdown
    const trendingTrigger = document.querySelector('.trending-trigger');
    const trendingMenu = document.querySelector('.trending-menu');
    
    if (trendingTrigger && trendingMenu) {
        trendingTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            trendingMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!trendingTrigger.contains(e.target) && !trendingMenu.contains(e.target)) {
                trendingMenu.classList.remove('active');
            }
        });
        
        // Handle trending destination clicks
        const trendingItems = trendingMenu.querySelectorAll('.trending-item');
        trendingItems.forEach(item => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                const destination = item.dataset.destination;
                if (destination) {
                    trendingMenu.classList.remove('active');
                    await searchCity(destination);
                }
            });
        });
    }
    
    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Show notification to user
 * @param {string} message - Message to show
 * @param {string} type - Type of notification (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Get icon for notification type
 * @param {string} type - Notification type
 * @returns {string} Icon class
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if current page is homepage
 * @returns {boolean} True if homepage
 */
function isHomePage() {
    return window.location.pathname === '/' || 
           window.location.pathname.includes('index.html') ||
           window.location.pathname === '';
}

/**
 * Check if current page is destinations page
 * @returns {boolean} True if destinations page
 */
function isDestinationsPage() {
    return window.location.pathname.includes('destinations.html');
}

/**
 * Utility function to format numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Utility function to format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Global functions for button interactions
window.searchCity = searchCity;
window.getWeather = getWeather;
window.getFlightsHotels = getFlightsHotels;
window.getTrendingPhotos = getTrendingPhotos;

// Export for use in other modules
export {
    initializeApp,
    handleSearch,
    showNotification,
    formatNumber,
    formatCurrency
};