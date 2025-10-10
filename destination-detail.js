// Destination detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get destination from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destinationName = urlParams.get('destination');
    
    if (destinationName) {
        loadDestinationDetails(destinationName);
    } else {
        // If no destination specified, redirect to destinations page
        window.location.href = 'destinations.html';
    }
    
    // Setup save button
    setupSaveButton();
});

// Extended destination data with full details
const detailedDestinationsData = {
    'paris': {
        name: 'Paris',
        country: 'France',
        region: 'Europe',
        emoji: '🗼',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Paris, the City of Light, is one of the most romantic and iconic cities in the world. Known for its timeless art, architecture, and culture, Paris offers an unforgettable experience with its charming cafes, world-class museums, and stunning monuments. From the Eiffel Tower to the Louvre, every corner tells a story.',
        bestTime: 'April to October',
        language: 'French',
        currency: 'Euro (EUR)',
        timezone: 'GMT+1',
        attractions: [
            {
                name: 'Eiffel Tower',
                description: 'Iconic iron lattice tower and symbol of Paris, offering breathtaking city views from its observation decks.'
            },
            {
                name: 'Louvre Museum',
                description: 'World\'s largest art museum, home to thousands of works including the Mona Lisa and Venus de Milo.'
            },
            {
                name: 'Notre-Dame Cathedral',
                description: 'Gothic masterpiece on Île de la Cité, famous for its stunning architecture and historical significance.'
            },
            {
                name: 'Arc de Triomphe',
                description: 'Monumental arch honoring those who fought for France, located at the center of Place Charles de Gaulle.'
            },
            {
                name: 'Champs-Élysées',
                description: 'Famous avenue lined with shops, cafes, and theaters, stretching from Place de la Concorde to Arc de Triomphe.'
            },
            {
                name: 'Sacré-Cœur',
                description: 'Beautiful white-domed basilica atop Montmartre hill, offering panoramic views of the city.'
            }
        ],
        tips: [
            'Purchase a Paris Museum Pass for skip-the-line access to major attractions',
            'Visit popular sites early in the morning or late evening to avoid crowds',
            'Learn basic French phrases - locals appreciate the effort',
            'Use the efficient Metro system for affordable transportation',
            'Try authentic French pastries at local boulangeries'
        ]
    },
    'tokyo': {
        name: 'Tokyo',
        country: 'Japan',
        region: 'Asia',
        emoji: '🏯',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'Tokyo is a fascinating blend of ancient traditions and cutting-edge modernity. As one of the world\'s most dynamic cities, it offers everything from serene temples and gardens to neon-lit streets and futuristic technology. Experience unique culture, incredible cuisine, and unmatched hospitality.',
        bestTime: 'March to May, September to November',
        language: 'Japanese',
        currency: 'Japanese Yen (¥)',
        timezone: 'GMT+9',
        attractions: [
            {
                name: 'Tokyo Tower',
                description: 'Iconic red and white communication tower offering spectacular city views and cultural exhibitions.'
            },
            {
                name: 'Senso-ji Temple',
                description: 'Tokyo\'s oldest and most significant Buddhist temple, featuring the famous Thunder Gate and bustling Nakamise shopping street.'
            },
            {
                name: 'Shibuya Crossing',
                description: 'World\'s busiest pedestrian crossing, symbolizing Tokyo\'s urban energy and modern culture.'
            },
            {
                name: 'Mount Fuji View',
                description: 'Day trips to see Japan\'s iconic sacred mountain, offering stunning views and hiking opportunities.'
            },
            {
                name: 'Meiji Shrine',
                description: 'Peaceful Shinto shrine surrounded by forest, dedicated to Emperor Meiji and Empress Shoken.'
            },
            {
                name: 'Tsukiji Outer Market',
                description: 'Famous fish market area with fresh seafood, sushi restaurants, and Japanese culinary delights.'
            }
        ],
        tips: [
            'Get a JR Pass for unlimited train travel if visiting multiple cities',
            'Download translation apps - not everyone speaks English',
            'Respect local customs: bow when greeting, remove shoes indoors',
            'Try conveyor belt sushi restaurants for an authentic experience',
            'Visit during cherry blossom season for unforgettable scenery'
        ]
    },
    'london': {
        name: 'London',
        country: 'United Kingdom',
        region: 'Europe',
        emoji: '🏰',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        description: 'London is a vibrant metropolis where history meets contemporary culture. From royal palaces and world-class museums to diverse neighborhoods and theatrical performances, the British capital offers endless discoveries. Experience centuries of heritage while enjoying modern cosmopolitan life.',
        bestTime: 'May to September',
        language: 'English',
        currency: 'British Pound (£)',
        timezone: 'GMT+0',
        attractions: [
            {
                name: 'Big Ben & Parliament',
                description: 'Iconic clock tower and Gothic parliamentary buildings along the Thames, symbols of British democracy.'
            },
            {
                name: 'Tower of London',
                description: 'Historic castle housing the Crown Jewels, with nearly 1000 years of royal and dark history.'
            },
            {
                name: 'British Museum',
                description: 'World-renowned museum with vast collections spanning human history and culture from around the globe.'
            },
            {
                name: 'Buckingham Palace',
                description: 'Official residence of the British monarch, famous for the Changing of the Guard ceremony.'
            },
            {
                name: 'London Eye',
                description: 'Giant observation wheel on the South Bank, offering panoramic views of the city skyline.'
            },
            {
                name: 'Tower Bridge',
                description: 'Iconic Victorian bascule bridge with glass walkways providing stunning Thames views.'
            }
        ],
        tips: [
            'Get an Oyster Card or use contactless payment for the Tube and buses',
            'Many world-class museums offer free admission including the British Museum',
            'Book theater tickets in advance for West End shows',
            'Explore diverse neighborhoods like Notting Hill, Camden, and Shoreditch',
            'Try traditional afternoon tea for an authentic British experience'
        ]
    },
    'newyork': {
        name: 'New York',
        country: 'United States',
        region: 'North America',
        emoji: '🗽',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        description: 'New York City, the city that never sleeps, is a global hub of culture, finance, and entertainment. With its iconic skyline, world-famous landmarks, and incredible diversity, NYC offers unparalleled energy and excitement. From Broadway shows to Central Park, every moment is memorable.',
        bestTime: 'April to June, September to November',
        language: 'English',
        currency: 'US Dollar ($)',
        timezone: 'GMT-5',
        attractions: [
            {
                name: 'Statue of Liberty',
                description: 'Iconic symbol of freedom and democracy, offering ferry tours and crown access with city views.'
            },
            {
                name: 'Central Park',
                description: 'Massive urban park in Manhattan with lakes, gardens, theaters, and countless recreational activities.'
            },
            {
                name: 'Times Square',
                description: 'Bustling commercial intersection known for bright lights, Broadway theaters, and New Year\'s celebrations.'
            },
            {
                name: 'Empire State Building',
                description: 'Art Deco skyscraper with observation decks offering breathtaking 360-degree views of the city.'
            },
            {
                name: 'Brooklyn Bridge',
                description: 'Historic suspension bridge connecting Manhattan and Brooklyn, perfect for walking with skyline views.'
            },
            {
                name: 'Metropolitan Museum',
                description: 'One of the world\'s largest art museums with over 2 million works spanning 5,000 years.'
            }
        ],
        tips: [
            'Purchase a MetroCard for convenient subway and bus travel',
            'Visit Top of the Rock for better Empire State Building photo opportunities',
            'Explore diverse neighborhoods like SoHo, Greenwich Village, and Williamsburg',
            'Try authentic New York pizza and bagels from local establishments',
            'Book Broadway tickets through TKTS booths for discounted same-day shows'
        ]
    },
    'sydney': {
        name: 'Sydney',
        country: 'Australia',
        region: 'Oceania',
        emoji: '🏖️',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        description: 'Sydney is Australia\'s stunning harbor city, famous for its iconic Opera House, beautiful beaches, and laid-back lifestyle. Combining natural beauty with urban sophistication, Sydney offers world-class dining, cultural attractions, and outdoor adventures. The sunny climate and friendly locals make it irresistible.',
        bestTime: 'September to November, March to May',
        language: 'English',
        currency: 'Australian Dollar (AUD)',
        timezone: 'GMT+10',
        attractions: [
            {
                name: 'Sydney Opera House',
                description: 'Architectural masterpiece and UNESCO World Heritage site, hosting world-class performances.'
            },
            {
                name: 'Sydney Harbour Bridge',
                description: 'Iconic steel arch bridge offering bridge climb experiences and pedestrian walkways with harbor views.'
            },
            {
                name: 'Bondi Beach',
                description: 'World-famous beach known for surfing, swimming, and the scenic coastal walk to Coogee.'
            },
            {
                name: 'Darling Harbour',
                description: 'Waterfront precinct with restaurants, attractions, museums, and stunning harbor views.'
            },
            {
                name: 'Royal Botanic Garden',
                description: 'Beautiful gardens near the Opera House with diverse plant collections and harbor outlooks.'
            },
            {
                name: 'The Rocks',
                description: 'Historic neighborhood with cobblestone streets, weekend markets, galleries, and colonial architecture.'
            }
        ],
        tips: [
            'Use the Opal Card for easy travel on trains, buses, and ferries',
            'Take a ferry to Manly for stunning harbor views and great beaches',
            'Apply sunscreen regularly - Australian sun is very strong',
            'Explore the coastal walk from Bondi to Coogee for scenic views',
            'Visit Taronga Zoo for unique Australian wildlife with Opera House backdrop'
        ]
    },
    'dubai': {
        name: 'Dubai',
        country: 'United Arab Emirates',
        region: 'Middle East',
        emoji: '🏙️',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        description: 'Dubai is a futuristic desert metropolis known for luxury shopping, ultramodern architecture, and a lively nightlife scene. Rising from the Arabian desert, this glamorous city features the world\'s tallest building, artificial islands, and endless entertainment options, all wrapped in Arabian hospitality.',
        bestTime: 'November to March',
        language: 'Arabic, English widely spoken',
        currency: 'UAE Dirham (AED)',
        timezone: 'GMT+4',
        attractions: [
            {
                name: 'Burj Khalifa',
                description: 'World\'s tallest building at 828m, featuring observation decks with spectacular city and desert views.'
            },
            {
                name: 'Dubai Mall',
                description: 'World\'s largest shopping mall with 1,200+ stores, aquarium, ice rink, and entertainment options.'
            },
            {
                name: 'Palm Jumeirah',
                description: 'Artificial palm-shaped island with luxury resorts, restaurants, and beach clubs.'
            },
            {
                name: 'Dubai Marina',
                description: 'Stunning waterfront district with yachts, skyscrapers, restaurants, and the Marina Walk promenade.'
            },
            {
                name: 'Gold Souk',
                description: 'Traditional market with hundreds of gold jewelry shops in the historic Deira district.'
            },
            {
                name: 'Desert Safari',
                description: 'Thrilling dune bashing, camel rides, and traditional Bedouin camp experiences in the Arabian desert.'
            }
        ],
        tips: [
            'Dress modestly in public places and respect local customs and traditions',
            'Visit malls and indoor attractions during hot summer months',
            'Use the efficient Dubai Metro to avoid traffic',
            'Book desert safari tours through reputable operators',
            'Take advantage of tax-free shopping at Dubai Mall and Mall of Emirates'
        ]
    },
    'barcelona': {
        name: 'Barcelona',
        country: 'Spain',
        region: 'Europe',
        emoji: '🏖️',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        description: 'Barcelona is a vibrant Mediterranean city known for its unique architecture, beaches, and lively culture. Gaudí\'s masterpieces dot the cityscape, while Gothic Quarter streets tell medieval stories. Enjoy world-class cuisine, passionate football culture, and the perfect blend of urban and beach life.',
        bestTime: 'May to June, September to October',
        language: 'Spanish, Catalan',
        currency: 'Euro (EUR)',
        timezone: 'GMT+1',
        attractions: [
            {
                name: 'Sagrada Família',
                description: 'Gaudí\'s unfinished masterpiece basilica with stunning facades and colorful stained glass interiors.'
            },
            {
                name: 'Park Güell',
                description: 'Whimsical public park designed by Gaudí, featuring colorful mosaics and architectural elements.'
            },
            {
                name: 'Las Ramblas',
                description: 'Famous tree-lined pedestrian street with street performers, shops, and the Boqueria Market.'
            },
            {
                name: 'Gothic Quarter',
                description: 'Medieval neighborhood with narrow streets, Roman ruins, and stunning Gothic architecture.'
            },
            {
                name: 'Casa Batlló',
                description: 'Gaudí-designed building with organic shapes, colorful facade, and innovative architectural details.'
            },
            {
                name: 'Barceloneta Beach',
                description: 'Popular city beach with golden sand, beach bars, and Mediterranean Sea swimming.'
            }
        ],
        tips: [
            'Book Sagrada Família tickets online weeks in advance to avoid long queues',
            'Learn basic Spanish or Catalan phrases - locals appreciate the effort',
            'Try authentic tapas at local bars, not tourist restaurants',
            'Use the efficient Metro system to navigate the city',
            'Visit Casa Batlló and Casa Milà early morning for fewer crowds'
        ]
    },
    'singapore': {
        name: 'Singapore',
        country: 'Singapore',
        region: 'Asia',
        emoji: '🦁',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        description: 'Singapore is a gleaming city-state where East meets West in perfect harmony. Known for its cleanliness, efficiency, and multiculturalism, Singapore offers futuristic architecture, lush gardens, incredible food culture, and strict but fair laws that make it one of the world\'s safest cities.',
        bestTime: 'February to April',
        language: 'English, Mandarin, Malay, Tamil',
        currency: 'Singapore Dollar (SGD)',
        timezone: 'GMT+8',
        attractions: [
            {
                name: 'Marina Bay Sands',
                description: 'Iconic integrated resort with rooftop infinity pool, luxury shopping, casino, and stunning skyline views.'
            },
            {
                name: 'Gardens by the Bay',
                description: 'Futuristic garden with giant Supertrees, climate-controlled conservatories, and light shows.'
            },
            {
                name: 'Sentosa Island',
                description: 'Resort island with beaches, Universal Studios, aquarium, cable car, and entertainment options.'
            },
            {
                name: 'Chinatown',
                description: 'Vibrant district with temples, traditional shops, street food, and rich Chinese heritage.'
            },
            {
                name: 'Singapore Zoo',
                description: 'World-class open-concept zoo with diverse animals in naturalistic habitats and Night Safari.'
            },
            {
                name: 'Merlion Park',
                description: 'Iconic statue of the mythical Merlion, Singapore\'s symbol, with beautiful bay views.'
            }
        ],
        tips: [
            'Chewing gum is banned - don\'t bring it into the country',
            'Try local dishes at hawker centers for authentic and affordable food',
            'Use the efficient MRT system for convenient city travel',
            'Stay hydrated - it\'s hot and humid year-round',
            'Book Sentosa attractions as packages for better value'
        ]
    }
};

function loadDestinationDetails(destinationName) {
    const normalizedName = destinationName.toLowerCase().replace(/\s+/g, '');
    const destination = detailedDestinationsData[normalizedName];
    
    if (!destination) {
        // If destination not found, redirect to destinations page
        alert('Destination not found. Redirecting to destinations page...');
        window.location.href = 'destinations.html';
        return;
    }
    
    // Update page title
    document.title = `${destination.name} - Travel Explorer`;
    
    // Update hero section
    const detailHero = document.getElementById('detailHero');
    detailHero.style.background = destination.gradient;
    
    document.getElementById('heroEmoji').textContent = destination.emoji;
    document.getElementById('heroTitle').textContent = destination.name;
    document.getElementById('heroSubtitle').textContent = destination.country;
    
    // Update hero badges
    const heroBadges = document.getElementById('heroBadges');
    heroBadges.innerHTML = `
        <div class="hero-badge">
            <i class="fas fa-map-marker-alt"></i>
            ${destination.region}
        </div>
        <div class="hero-badge">
            <i class="fas fa-calendar"></i>
            ${destination.bestTime}
        </div>
        <div class="hero-badge">
            <i class="fas fa-language"></i>
            ${destination.language}
        </div>
    `;
    
    // Update description
    document.getElementById('descriptionBox').textContent = destination.description;
    
    // Update quick info
    const infoGrid = document.getElementById('infoGrid');
    infoGrid.innerHTML = `
        <div class="info-item">
            <div class="info-item-label">Best Time to Visit</div>
            <div class="info-item-value">${destination.bestTime}</div>
        </div>
        <div class="info-item">
            <div class="info-item-label">Language</div>
            <div class="info-item-value">${destination.language}</div>
        </div>
        <div class="info-item">
            <div class="info-item-label">Currency</div>
            <div class="info-item-value">${destination.currency}</div>
        </div>
        <div class="info-item">
            <div class="info-item-label">Time Zone</div>
            <div class="info-item-value">${destination.timezone}</div>
        </div>
    `;
    
    // Update attractions
    const attractionsGrid = document.getElementById('attractionsGrid');
    attractionsGrid.innerHTML = destination.attractions.map(attraction => `
        <div class="attraction-card">
            <h4>
                <i class="fas fa-map-pin"></i>
                ${attraction.name}
            </h4>
            <p>${attraction.description}</p>
        </div>
    `).join('');
    
    // Update travel tips
    const tipsList = document.getElementById('tipsList');
    tipsList.innerHTML = destination.tips.map(tip => `
        <li>
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </li>
    `).join('');
    
    // Update "Add to Trip Planner" button to include destination data
    const addToTripBtn = document.getElementById('addToTripBtn');
    addToTripBtn.href = `planner.html?add=${normalizedName}`;
}

function setupSaveButton() {
    const saveBtn = document.getElementById('saveBtn');
    const urlParams = new URLSearchParams(window.location.search);
    const destinationName = urlParams.get('destination');
    
    // Check if already saved
    const savedDestinations = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    if (savedDestinations.includes(destinationName)) {
        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        saveBtn.style.background = '#48bb78';
        saveBtn.style.color = 'white';
        saveBtn.style.borderColor = '#48bb78';
    }
    
    saveBtn.addEventListener('click', function() {
        let saved = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
        
        if (saved.includes(destinationName)) {
            // Remove from saved
            saved = saved.filter(d => d !== destinationName);
            saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Save for Later';
            saveBtn.style.background = '';
            saveBtn.style.color = '';
            saveBtn.style.borderColor = '';
        } else {
            // Add to saved
            saved.push(destinationName);
            saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            saveBtn.style.background = '#48bb78';
            saveBtn.style.color = 'white';
            saveBtn.style.borderColor = '#48bb78';
        }
        
        localStorage.setItem('savedDestinations', JSON.stringify(saved));
    });
}
