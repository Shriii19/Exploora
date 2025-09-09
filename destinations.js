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
    card.className = 'destination-card fade-in';
    card.dataset.city = destination.name.toLowerCase();
    
    card.innerHTML = `
        <div class="destination-image" style="background: ${destination.gradient}; position: relative; overflow: hidden;">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%);
                background-size: 30px 30px;
                opacity: 0.5;
            "></div>
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 4rem;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            ">🏙️</div>
            <div style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255,255,255,0.9);
                backdrop-filter: blur(10px);
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--gray-700);
            ">${destination.region.charAt(0).toUpperCase() + destination.region.slice(1)}</div>
        </div>
        <div class="destination-info">
            <h3>${destination.name}, ${destination.country}</h3>
            <p>${destination.description}</p>
            <div class="destination-highlights" style="margin: 1rem 0; padding: 0.75rem; background: var(--gray-50); border-radius: 0.5rem;">
                <strong style="color: var(--primary-color);">Must-see:</strong> ${destination.highlights.slice(0, 2).join(', ')}
            </div>
            <div class="destination-meta">
                <span><i class="fas fa-calendar" style="color: var(--primary-color);"></i> ${destination.bestTime}</span>
                <span><i class="fas fa-star" style="color: var(--accent-color);"></i> Featured</span>
            </div>
        </div>
    `;
    
    // Add click event to search for this destination
    card.addEventListener('click', function() {
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
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
