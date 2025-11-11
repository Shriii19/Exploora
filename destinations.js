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
        region: 'americas',
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
        region: 'middleeast',
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
        region: 'americas',
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
        region: 'americas',
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
    const filterButtons = document.querySelectorAll('.filter-tab');
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
    
    // Ensure all cards are visible immediately, then add smooth animation
    const cards = destinationsGrid.querySelectorAll('.destination-item');
    
    // First, make all cards visible to prevent black screen
    cards.forEach(card => {
        card.style.visibility = 'visible';
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Then animate them in with a slight delay
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('fade-in-ready');
            }, index * 80);
        });
    }, 100);
    
    // Fallback: ensure all cards are visible after 2 seconds
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
        });
    }, 2000);
}

// Helper function to get Unsplash image IDs for destinations
function getImageId(destinationName) {
    const imageIds = {
        'Paris': '1499856871958-5b9627545d1a',
        'Tokyo': '1540959733332-eab4deabeeaf',
        'London': '1513635269975-59663e0ac1ad',
        'New York': '1496442226666-8d4d0e62e6e9',
        'Sydney': '1506905925346-21bda4d32df4',
        'Rome': '1552832230-c0197dd311b5',
        'Dubai': '1512453979798-5ea266f8880c',
        'Barcelona': '1539037116277-4db20889f2d4',
        'Los Angeles': '1534190239940-9ba8944ea261',
        'Bangkok': '1508009603792-1e4265b81167',
        'Bali': '1537953773345-d172ccf13cf1',
        'Santorini': '1570077188670-e3a8d69ac5ff'
    };
    return imageIds[destinationName] || '1234567890';
}

// Helper function to get tags for destinations
function getTagsForDestination(destinationName) {
    const tags = {
        'Paris': ['Culture', 'Romance', 'Art'],
        'Tokyo': ['Culture', 'Tech', 'Food'],
        'London': ['Royal', 'Museums', 'Parks'],
        'New York': ['Urban', 'Culture', 'Food'],
        'Sydney': ['Beach', 'Opera', 'Harbor'],
        'Rome': ['History', 'Art', 'Food'],
        'Dubai': ['Luxury', 'Modern', 'Shopping'],
        'Barcelona': ['Beach', 'Art', 'Food'],
        'Los Angeles': ['Beach', 'Hollywood', 'Sun'],
        'Bangkok': ['Culture', 'Food', 'Temples'],
        'Bali': ['Beach', 'Tropical', 'Spa'],
        'Santorini': ['Sunsets', 'Wine', 'Romance']
    };
    
    const destTags = tags[destinationName] || ['Travel', 'Explore', 'Adventure'];
    return destTags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function createDestinationCard(destination) {
    const card = document.createElement('a');
    card.className = 'destination-item fade-in';
    card.href = `destination-detail.html?destination=${destination.name.toLowerCase().replace(/\s+/g, '')}`;
    card.dataset.destination = destination.name.toLowerCase().replace(/\s+/g, '');
    card.dataset.city = destination.name.toLowerCase();
    
    // Get appropriate emoji for destination
    const destinationEmojis = {
        'Paris': '🗼',
        'Tokyo': '🏯',
        'London': '�🇧',
        'New York': '🗽',
        'Sydney': '�',
        'Rome': '🏛️',
        'Dubai': '�️',
        'Barcelona': '🏖️',
        'Los Angeles': '🌴',
        'Bangkok': '🛕',
        'Bali': '🌴',
        'Santorini': '🌅'
    };
    
    const emoji = destinationEmojis[destination.name] || '🏙️';
    
    // Get temperature (mock data)
    const temps = {
        'Paris': '22°C',
        'Tokyo': '18°C',
        'London': '17°C',
        'New York': '15°C',
        'Sydney': '24°C',
        'Rome': '25°C',
        'Dubai': '32°C',
        'Barcelona': '23°C',
        'Los Angeles': '21°C',
        'Bangkok': '30°C',
        'Bali': '28°C',
        'Santorini': '26°C'
    };
    
    const rating = '4.' + (7 + Math.floor(Math.random() * 3));
    const temp = temps[destination.name] || '20°C';
    
    card.innerHTML = `
        <div class="dest-item-image">
            <img src="https://images.unsplash.com/photo-${getImageId(destination.name)}?w=800&h=600&fit=crop" alt="${destination.name}" loading="lazy">
            <div class="dest-gradient"></div>
            <div class="dest-icon">${emoji}</div>
            <button class="favorite-btn" data-destination="${destination.name.toLowerCase()}" title="Save to favorites" onclick="event.preventDefault(); event.stopPropagation();">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="dest-item-content">
            <h4>${destination.name}</h4>
            <p class="dest-country">${destination.country}</p>
            <div class="dest-meta">
                <span class="meta-rating">⭐ ${rating}</span>
                <span class="meta-temp">${temp}</span>
            </div>
            <div class="dest-tags">
                ${getTagsForDestination(destination.name)}
            </div>
        </div>
        <div class="dest-hover-arrow">
            <i class="fas fa-arrow-right"></i>
        </div>
    `;
    
    // Add favorite button functionality
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
    });
    
    return card;
}

// Scroll to and highlight specific destination or show detailed view
function scrollToDestination(destinationName) {
    setTimeout(() => {
        const normalizedName = destinationName.toLowerCase().replace(/\s+/g, '');
        
        // Try to find the destination card by data-city attribute
        const allCards = document.querySelectorAll('.destination-item[data-city]');
        let destinationCard = null;
        
        for (let card of allCards) {
            const cardCity = card.dataset.city.toLowerCase().replace(/\s+/g, '');
            if (cardCity === normalizedName || cardCity.includes(normalizedName) || normalizedName.includes(cardCity)) {
                destinationCard = card;
                break;
            }
        }
        
        if (destinationCard) {
            // Scroll to the card smoothly
            destinationCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add highlight effect
            destinationCard.style.animation = 'pulse 1s ease-in-out 3';
            destinationCard.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
            destinationCard.style.transform = 'scale(1.05)';
            destinationCard.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                destinationCard.style.boxShadow = '';
                destinationCard.style.transform = 'scale(1)';
            }, 3000);
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
