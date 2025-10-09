// Destinations page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDestinationsPage();
    
    // Check if there's a destination parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const destinationParam = urlParams.get('destination');
    
    if (destinationParam) {
        // Scroll to the specific destination or highlight it
        scrollToDestination(destinationParam);
    }
});

// Sample destinations data with regions
const destinationsData = [
    {
        name: 'Paris',
        country: 'France',
        region: 'europe',
        description: 'The City of Light, famous for the Eiffel Tower, art museums, and romantic atmosphere.',
        highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe'],
        bestTime: 'April to October',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'Tokyo',
        country: 'Japan',
        region: 'asia',
        description: 'A bustling metropolis blending traditional culture with cutting-edge technology.',
        highlights: ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Mount Fuji View'],
        bestTime: 'March to May, September to November',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        name: 'London',
        country: 'United Kingdom',
        region: 'europe',
        description: 'Historic capital with royal palaces, world-class museums, and iconic landmarks.',
        highlights: ['Big Ben', 'Tower Bridge', 'Buckingham Palace', 'London Eye'],
        bestTime: 'May to September',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        name: 'New York',
        country: 'USA',
        region: 'america',
        description: 'The city that never sleeps, offering Broadway shows, world-famous landmarks, and diverse culture.',
        highlights: ['Statue of Liberty', 'Times Square', 'Central Park', 'Brooklyn Bridge'],
        bestTime: 'April to June, September to November',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: 'Sydney',
        country: 'Australia',
        region: 'oceania',
        description: 'Harbor city known for its iconic Opera House, beautiful beaches, and laid-back lifestyle.',
        highlights: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Royal Botanic Gardens'],
        bestTime: 'September to November, March to May',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        name: 'Rome',
        country: 'Italy',
        region: 'europe',
        description: 'The Eternal City, home to ancient ruins, Vatican City, and incredible Italian cuisine.',
        highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum'],
        bestTime: 'April to June, September to October',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
        name: 'Dubai',
        country: 'UAE',
        region: 'asia',
        description: 'Modern oasis with luxury shopping, ultramodern architecture, and desert adventures.',
        highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Desert Safari'],
        bestTime: 'November to March',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
        name: 'Barcelona',
        country: 'Spain',
        region: 'europe',
        description: 'Vibrant city known for Gaudí architecture, beautiful beaches, and lively culture.',
        highlights: ['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Gothic Quarter'],
        bestTime: 'May to September',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
        name: 'Los Angeles',
        country: 'USA',
        region: 'america',
        description: 'Entertainment capital with Hollywood glamour, beautiful beaches, and perfect weather.',
        highlights: ['Hollywood Sign', 'Santa Monica Pier', 'Getty Center', 'Venice Beach'],
        bestTime: 'March to May, September to November',
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
        name: 'Bangkok',
        country: 'Thailand',
        region: 'asia',
        description: 'Bustling capital with ornate temples, vibrant street life, and incredible street food.',
        highlights: ['Grand Palace', 'Wat Pho Temple', 'Floating Markets', 'Khao San Road'],
        bestTime: 'November to February',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    },
    {
        name: 'Bali',
        country: 'Indonesia',
        region: 'asia',
        description: 'Tropical paradise with stunning beaches, ancient temples, and lush rice paddies. Perfect for relaxation and adventure.',
        highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Surfing'],
        bestTime: 'April to October',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: 'Iceland',
        country: 'Iceland',
        region: 'europe',
        description: 'Witness nature\'s raw power with glaciers, volcanoes, waterfalls, and the magical Aurora Borealis.',
        highlights: ['Northern Lights', 'Hot Springs', 'Glaciers', 'Waterfalls'],
        bestTime: 'June to August (summer), September to March (Northern Lights)',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'Santorini',
        country: 'Greece',
        region: 'europe',
        description: 'Iconic whitewashed buildings, blue-domed churches, and the most spectacular sunsets over the Aegean Sea.',
        highlights: ['White Villages', 'Sunset Views', 'Wine Tasting', 'Beaches'],
        bestTime: 'April to November',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        name: 'Maldives',
        country: 'Maldives',
        region: 'asia',
        description: 'Ultimate paradise with crystal-clear waters, overwater bungalows, and world-class diving in pristine coral reefs.',
        highlights: ['Private Islands', 'Coral Reefs', 'Diving', 'Luxury Resorts'],
        bestTime: 'November to April',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: 'Switzerland',
        country: 'Switzerland',
        region: 'europe',
        description: 'Majestic mountain peaks, pristine lakes, charming villages, and world-famous chocolate and cheese experiences.',
        highlights: ['Swiss Alps', 'Chocolate', 'Lakes', 'Skiing'],
        bestTime: 'December to March (skiing), June to September (hiking)',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'Thailand',
        country: 'Thailand',
        region: 'asia',
        description: 'Golden temples, tropical islands, vibrant street food, and warm hospitality create an unforgettable Southeast Asian adventure.',
        highlights: ['Temples', 'Islands', 'Thai Food', 'Beaches'],
        bestTime: 'November to February',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        name: 'Morocco',
        country: 'Morocco',
        region: 'africa',
        description: 'Exotic bazaars, ancient medinas, vast deserts, and Atlas Mountains create a magical North African experience.',
        highlights: ['Sahara Desert', 'Medinas', 'Souks', 'Atlas Mountains'],
        bestTime: 'March to May, September to November',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        name: 'New Zealand',
        country: 'New Zealand',
        region: 'oceania',
        description: 'Breathtaking fjords, Middle-earth filming locations, adventure sports, and stunning landscapes at every turn.',
        highlights: ['Milford Sound', 'LOTR Locations', 'Adventure Sports', 'Nature'],
        bestTime: 'December to February (summer), June to August (skiing)',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: 'Peru',
        country: 'Peru',
        region: 'america',
        description: 'Ancient Incan citadel, Amazon rainforest, colorful markets, and rich cultural heritage in the heart of South America.',
        highlights: ['Machu Picchu', 'Amazon', 'Cusco', 'Lake Titicaca'],
        bestTime: 'May to September',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        name: 'Norway',
        country: 'Norway',
        region: 'europe',
        description: 'Dramatic fjords, midnight sun, Northern Lights, and pristine Scandinavian nature create unforgettable memories.',
        highlights: ['Fjords', 'Aurora Borealis', 'Midnight Sun', 'Viking Heritage'],
        bestTime: 'May to September (fjords), September to March (Northern Lights)',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'Australia',
        country: 'Australia',
        region: 'oceania',
        description: 'Iconic Opera House, stunning beaches, unique wildlife, and the world\'s largest coral reef system await exploration.',
        highlights: ['Great Barrier Reef', 'Sydney Opera House', 'Outback', 'Beaches'],
        bestTime: 'September to November, March to May',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        name: 'Singapore',
        country: 'Singapore',
        region: 'asia',
        description: 'Garden city-state where East meets West with architectural marvels and diverse cuisines.',
        highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Food Scene', 'Sentosa'],
        bestTime: 'February to April',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
];

function initializeDestinationsPage() {
    const destinationsGrid = document.getElementById('destinationsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const heroSearchBtn = document.querySelector('.hero-search-btn');
    const heroSearchInput = document.querySelector('.hero-search-input');
    
    if (destinationsGrid) {
        displayDestinations('all');
        
        // Filter button events
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter destinations
                const region = this.dataset.region;
                displayDestinations(region);
            });
        });
    }
    
    // Hero search functionality
    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', function() {
            const query = heroSearchInput.value.trim();
            if (query) {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                heroSearchBtn.click();
            }
        });
    }
}

function displayDestinations(region) {
    const destinationsGrid = document.getElementById('destinationsGrid');
    if (!destinationsGrid) return;
    
    destinationsGrid.innerHTML = '';
    
    const filteredDestinations = region === 'all' 
        ? destinationsData 
        : destinationsData.filter(dest => dest.region === region);
    
    filteredDestinations.forEach(destination => {
        const destinationCard = createDestinationCard(destination);
        destinationsGrid.appendChild(destinationCard);
    });
    
    // Add animation
    setTimeout(() => {
        destinationsGrid.querySelectorAll('.destination-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card fade-in';
    card.dataset.city = destination.name.toLowerCase();
    
    // Get appropriate emoji for destination
    const destinationEmojis = {
        'Paris': '🗼',
        'Tokyo': '🏯',
        'London': '🏰',
        'New York': '🗽',
        'Sydney': '🏖️',
        'Rome': '🏛️',
        'Dubai': '🏙️',
        'Barcelona': '🏖️',
        'Los Angeles': '🌴',
        'Bangkok': '🛕'
    };
    
    const emoji = destinationEmojis[destination.name] || '🏙️';
    
    card.innerHTML = `
        <div class="destination-image" style="background: ${destination.gradient};">
            <div class="destination-pattern"></div>
            <div class="destination-emoji">${emoji}</div>
            <div class="destination-badges">
                <span class="destination-region-badge">${destination.region.charAt(0).toUpperCase() + destination.region.slice(1)}</span>
            </div>
            <div class="destination-favorite">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="destination-info">
            <h3>${destination.name}, ${destination.country}</h3>
            <p>${destination.description}</p>
            <div class="destination-highlights">
                <div class="highlights-header">
                    <i class="fas fa-star"></i>
                    Must-see attractions
                </div>
                <div class="highlights-list">${destination.highlights.slice(0, 3).join(' • ')}</div>
            </div>
            <div class="destination-meta">
                <span class="meta-time">
                    <i class="fas fa-calendar"></i> 
                    ${destination.bestTime}
                </span>
                <button class="btn btn-primary destination-explore-btn">
                    <i class="fas fa-search"></i>
                    Explore
                </button>
            </div>
        </div>
    `;
    
    // Add click event to search for this destination
    const exploreBtn = card.querySelector('.destination-explore-btn');
    exploreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Add click animation
        exploreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            exploreBtn.style.transform = '';
        }, 150);
        
        // Navigate to home page and trigger search
        window.location.href = `index.html?search=${encodeURIComponent(destination.name)}`;
    });
    
    // Add favorite button functionality
    const favoriteBtn = card.querySelector('.destination-favorite');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
    });
    
    return card;
}

// Scroll to and highlight specific destination or show detailed view
function scrollToDestination(destinationName) {
    setTimeout(() => {
        const normalizedName = destinationName.toLowerCase();
        
        // Find the destination in data
        const destinationData = destinationsData.find(dest => 
            dest.name.toLowerCase() === normalizedName || 
            dest.name.toLowerCase().includes(normalizedName) ||
            normalizedName.includes(dest.name.toLowerCase())
        );
        
        if (destinationData) {
            // Show detailed view for the destination
            showDestinationDetails(destinationData);
        } else {
            // Try to find and scroll to the card
            const destinationCard = document.querySelector(`[data-destination="${normalizedName}"]`);
            
            if (destinationCard) {
                destinationCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add highlight effect
                destinationCard.style.animation = 'pulse 1s ease-in-out 3';
                destinationCard.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
                
                setTimeout(() => {
                    destinationCard.style.boxShadow = '';
                }, 3000);
            }
        }
    }, 500);
}

// Show detailed destination information
function showDestinationDetails(destination) {
    const searchResults = document.getElementById('searchResults');
    const destinationDetails = document.getElementById('destinationDetails');
    
    if (!searchResults || !destinationDetails) return;
    
    // Hide regular destinations grid and show search results
    const regularSection = document.querySelector('.destinations-section');
    if (regularSection) {
        regularSection.style.display = 'none';
    }
    
    searchResults.classList.remove('hidden');
    
    // Create detailed view
    destinationDetails.innerHTML = `
        <div class="destination-detail-card">
            <div class="detail-hero" style="background: ${destination.gradient};">
                <div class="detail-hero-content">
                    <h1>${destination.name}, ${destination.country}</h1>
                    <p class="detail-subtitle">${destination.description}</p>
                    <div class="detail-badges">
                        <span class="detail-badge"><i class="fas fa-calendar"></i> Best Time: ${destination.bestTime}</span>
                        <span class="detail-badge"><i class="fas fa-map-marker-alt"></i> ${destination.region.toUpperCase()}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h3><i class="fas fa-star"></i> Top Attractions</h3>
                    <div class="highlights-grid">
                        ${destination.highlights.map(highlight => `
                            <div class="highlight-item">
                                <i class="fas fa-map-pin"></i>
                                <span>${highlight}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> About This Destination</h3>
                    <p class="detail-description">${destination.description}</p>
                </div>
                
                <div class="detail-actions">
                    <button class="btn btn-primary btn-lg" onclick="window.location.href='index.html?search=${destination.name.toLowerCase()}'">
                        <i class="fas fa-search"></i>
                        Explore in Detail
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="window.location.href='destinations.html'">
                        <i class="fas fa-arrow-left"></i>
                        Back to All Destinations
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle search parameter from URL
function handleSearchFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            // Trigger search after a short delay
            setTimeout(() => {
                if (typeof handleSearch === 'function') {
                    handleSearch();
                }
            }, 500);
        }
    }
}

// Check if we're on the home page and handle URL search
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', handleSearchFromURL);
}
