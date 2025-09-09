// Global variables
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

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
const loadingSpinner = document.getElementById('loadingSpinner');

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
    displayRecentSearches();
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Add some sample searches if none exist
    if (recentSearches.length === 0) {
        recentSearches = ['Paris', 'Tokyo', 'London'];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        displayRecentSearches();
    }
});

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a city name to search.');
        return;
    }
    
    showLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
        searchDestination(query);
        showLoading(false);
    }, 1500);
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
        welcomeSection.classList.add('hidden');
        destinationSection.classList.remove('hidden');
        weatherSection.classList.remove('hidden');
        
        // Scroll to results
        destinationSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show message for city not found
        showCityNotFound(query);
    }
    
    // Clear search input
    searchInput.value = '';
}

// Display destination information
function displayDestination(destination) {
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
    card.className = 'photo-card';
    
    // Use a placeholder image with gradient background
    card.innerHTML = `
        <div style="
            height: 200px;
            background: ${cardColors[index % cardColors.length]};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: bold;
        ">
            📸
        </div>
        <div class="photo-info">
            <h4>${photo.title}</h4>
            <p>${photo.description}</p>
        </div>
    `;
    
    return card;
}

// Display weather information
function displayWeather(weather, cityName) {
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
    card.className = 'search-card';
    
    card.innerHTML = `
        <h4>${cityName}</h4>
        <p>Click to search again</p>
    `;
    
    card.addEventListener('click', () => {
        const query = cityName.split(',')[0].toLowerCase();
        searchInput.value = cityName;
        showLoading(true);
        
        setTimeout(() => {
            searchDestination(query);
            showLoading(false);
        }, 1000);
    });
    
    return card;
}

// Show city not found message
function showCityNotFound(query) {
    welcomeSection.classList.add('hidden');
    destinationSection.classList.remove('hidden');
    weatherSection.classList.add('hidden');
    
    cityNameElement.textContent = `"${query}" - City Not Found`;
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
    
    destinationSection.scrollIntoView({ behavior: 'smooth' });
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero section on load
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Add hover effects to cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.photo-card') || e.target.closest('.search-card')) {
            e.target.style.transform = 'translateY(-5px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.photo-card') || e.target.closest('.search-card')) {
            e.target.style.transform = 'translateY(0)';
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Clear search and show welcome section
        searchInput.value = '';
        welcomeSection.classList.remove('hidden');
        destinationSection.classList.add('hidden');
        weatherSection.classList.add('hidden');
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
