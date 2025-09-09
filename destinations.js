// Destinations page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDestinationsPage();
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
    }
];

function initializeDestinationsPage() {
    const destinationsGrid = document.getElementById('destinationsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
    card.className = 'destination-card';
    card.dataset.city = destination.name.toLowerCase();
    
    card.innerHTML = `
        <div class="destination-image" style="background: ${destination.gradient}">
            🏙️
        </div>
        <div class="destination-info">
            <h3>${destination.name}, ${destination.country}</h3>
            <p>${destination.description}</p>
            <div class="destination-highlights">
                <strong>Must-see:</strong> ${destination.highlights.slice(0, 2).join(', ')}
            </div>
            <div class="destination-meta">
                <span><i class="fas fa-calendar"></i> Best time: ${destination.bestTime}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${destination.region.charAt(0).toUpperCase() + destination.region.slice(1)}</span>
            </div>
        </div>
    `;
    
    // Add click event to search for this destination
    card.addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = destination.name;
            // Navigate to home page and trigger search
            window.location.href = `index.html?search=${encodeURIComponent(destination.name)}`;
        }
    });
    
    return card;
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
