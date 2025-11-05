// Destination detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get destination from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const destinationName = urlParams.get('destination');
        
        if (destinationName) {
            loadDestinationDetails(destinationName);
            initializeDetailPageAnimations();
        } else {
            // If no destination specified, redirect to destinations page
            console.warn('No destination specified in URL');
            setTimeout(() => {
                window.location.href = 'destinations.html';
            }, 2000);
        }
        
        // Setup save button
        setupSaveButton();
    } catch (error) {
        console.error('Error initializing destination detail page:', error);
    }
});

// ============================================================================
// DESTINATION DETAIL PAGE COOL ANIMATIONS (MOBILE-SAFE)
// ============================================================================

function initializeDetailPageAnimations() {
    const isMobile = window.innerWidth <= 768;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Core animations (all devices)
    animateAttractionCards();
    animateTravelTips();
    animateActivityTabs();
    animateSaveButton();
    animateWeatherForecast();
    
    // Desktop-only animations (performance)
    if (!isMobile) {
        animateHeroBanner();
        animatePhotoGallery();
        animateStatsCounter();
        animateSimilarDestinations();
        animateMapZoom();
    } else {
        // Mobile-optimized versions
        animateMobileHeroBanner();
    }
}

// Mobile-optimized hero banner (no parallax)
function animateMobileHeroBanner() {
    const heroBanner = document.querySelector('.destination-hero, .detail-hero');
    if (!heroBanner) return;
    
    // Simple fade-in only
    heroBanner.style.opacity = '0';
    
    setTimeout(() => {
        heroBanner.style.transition = 'opacity 1s ease-out';
        heroBanner.style.opacity = '1';
    }, 100);
}

// Hero banner parallax and reveal (desktop only)
function animateHeroBanner() {
    const heroBanner = document.querySelector('.destination-hero, .detail-hero');
    if (!heroBanner) return;
    
    heroBanner.style.opacity = '0';
    heroBanner.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        heroBanner.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        heroBanner.style.opacity = '1';
        heroBanner.style.transform = 'scale(1)';
    }, 100);
    
    // MOBILE-SAFE: Throttled parallax scroll effect with limits
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                // MOBILE-SAFE: Limit parallax distance to prevent off-screen content
                const parallaxDistance = Math.min(scrolled * 0.3, 100); // Reduced from 0.5, capped at 100px
                const scaleAmount = Math.min(1 + scrolled * 0.00005, 1.05); // Reduced scale effect
                heroBanner.style.transform = `translateY(${parallaxDistance}px) scale(${scaleAmount})`;
                heroBanner.style.opacity = Math.max(1 - (scrolled / 500), 0.3); // Keep minimum opacity
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Attraction cards staggered animation
function animateAttractionCards() {
    const cards = document.querySelectorAll('.attraction-card, .place-card');
    const isMobile = window.innerWidth <= 768;
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        
        // MOBILE-SAFE: Reduced transforms to prevent layout breaks
        if (isMobile) {
            card.style.transform = 'translateY(25px)'; // Reduced from 80px, no 3D rotation
        } else {
            card.style.transform = 'translateY(80px) rotateX(-20deg) scale(0.9)';
        }
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        }, 150 * index);
        
        // MOBILE-SAFE: Simplified hover effects on mobile
        card.addEventListener('mouseenter', function() {
            if (isMobile) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.2)';
            } else {
                this.style.transform = 'translateY(-15px) scale(1.05) rotateZ(2deg)';
                this.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.4)';
                this.style.animation = 'pulse 0.6s ease';
                this.style.filter = 'brightness(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
            this.style.boxShadow = '';
            this.style.animation = '';
            this.style.filter = '';
        });
        
        // MOBILE-SAFE: Card tilt on mouse move (desktop only)
        if (!isMobile) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }
    });
}

// Photo gallery animations
function animatePhotoGallery() {
    const photos = document.querySelectorAll('.gallery-photo, .photo-item');
    
    photos.forEach((photo, index) => {
        photo.style.opacity = '0';
        photo.style.transform = 'scale(0.8) rotate(-10deg)';
        photo.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            photo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            photo.style.opacity = '1';
            photo.style.transform = 'scale(1) rotate(0deg)';
            photo.style.filter = 'blur(0)';
        }, 80 * index);
        
        // Hover zoom effect
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.zIndex = '10';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = '';
            this.style.boxShadow = '';
        });
        
        // Click for lightbox
        photo.addEventListener('click', function() {
            this.style.animation = 'zoomIn 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Activity tabs animation
function animateActivityTabs() {
    const tabs = document.querySelectorAll('.activity-tab, .tab-button');
    
    tabs.forEach((tab, index) => {
        tab.style.opacity = '0';
        tab.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            tab.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            tab.style.opacity = '1';
            tab.style.transform = 'translateY(0)';
        }, 50 * index);
        
        tab.addEventListener('click', function() {
            this.style.animation = 'rubberBand 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        tab.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        tab.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Travel tips reveal animation
function animateTravelTips() {
    const tips = document.querySelectorAll('.travel-tip, .tip-item');
    
    tips.forEach((tip, index) => {
        tip.style.opacity = '0';
        tip.style.transform = 'translateX(-100px)';
        
        setTimeout(() => {
            tip.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tip.style.opacity = '1';
            tip.style.transform = 'translateX(0)';
        }, 100 * index);
        
        tip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.03)';
            this.style.animation = 'swing 0.8s ease';
        });
        
        tip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.animation = '';
        });
    });
}

// Stats counter animation
function animateStatsCounter() {
    const stats = document.querySelectorAll('.stat-number, .counter');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        stat.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
        
        // Pulse animation
        stat.style.animation = 'pulse 1s ease-in-out infinite';
    });
}

// Similar destinations carousel
function animateSimilarDestinations() {
    const similarCards = document.querySelectorAll('.similar-destination, .recommendation-card');
    
    similarCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px) rotate(10deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) rotate(0deg)';
        }, 120 * index);
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.animation = 'heartBeat 0.8s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.animation = '';
        });
    });
}

// Save button heart animation
function animateSaveButton() {
    const saveBtn = document.querySelector('.save-btn, .bookmark-btn');
    if (!saveBtn) return;
    
    saveBtn.addEventListener('click', function() {
        const heart = this.querySelector('i, .heart-icon');
        if (heart) {
            heart.style.animation = 'heartBeat 0.8s ease';
            setTimeout(() => {
                heart.style.animation = '';
            }, 800);
        }
        
        // Confetti effect
        createHeartConfetti(this);
    });
}

// Heart confetti for save button
function createHeartConfetti(button) {
    const hearts = ['❤️', '💙', '💚', '💛', '💜'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: heartFloat ${2 + Math.random()}s ease-out forwards;
        `;
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            to {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Weather forecast animation
function animateWeatherForecast() {
    const weatherCards = document.querySelectorAll('.weather-day, .forecast-card');
    
    weatherCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0) rotate(-180deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotate(0deg)';
        }, 80 * index);
        
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'tada 0.8s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Map zoom animation
function animateMapZoom() {
    const mapContainer = document.querySelector('.map-container, #map');
    if (!mapContainer) return;
    
    mapContainer.style.opacity = '0';
    mapContainer.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        mapContainer.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        mapContainer.style.opacity = '1';
        mapContainer.style.transform = 'scale(1)';
    }, 500);
}

// ============================================================================

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
    },
    'bali': {
        name: 'Bali',
        country: 'Indonesia',
        region: 'Asia',
        emoji: '🏝️',
        gradient: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
        description: 'Bali is Indonesia\'s tropical paradise, known for its stunning beaches, ancient temples, and rich cultural heritage. This island offers a perfect blend of spiritual tranquility, adventure activities, and natural beauty. From terraced rice paddies to sacred monkey forests, Bali captivates every traveler.',
        bestTime: 'April to October',
        language: 'Indonesian, Balinese',
        currency: 'Indonesian Rupiah (IDR)',
        timezone: 'GMT+8',
        attractions: [
            {
                name: 'Tanah Lot Temple',
                description: 'Iconic sea temple perched on a rock formation, offering spectacular sunset views and spiritual significance.'
            },
            {
                name: 'Ubud Rice Terraces',
                description: 'Stunning UNESCO-listed rice paddies with traditional irrigation system and lush green landscapes.'
            },
            {
                name: 'Sacred Monkey Forest',
                description: 'Ancient temple complex in the jungle inhabited by playful long-tailed macaque monkeys.'
            },
            {
                name: 'Mount Batur',
                description: 'Active volcano offering sunrise trekking experiences with breathtaking panoramic views.'
            },
            {
                name: 'Seminyak Beach',
                description: 'Upscale beach area known for surfing, beach clubs, boutique shopping, and vibrant nightlife.'
            },
            {
                name: 'Tirta Empul Temple',
                description: 'Sacred water temple where locals perform purification rituals in natural spring-fed pools.'
            }
        ],
        tips: [
            'Dress modestly when visiting temples - sarongs are often required',
            'Negotiate prices at local markets - haggling is expected',
            'Rent a scooter for easy transportation, but drive carefully',
            'Try traditional Balinese massage and spa treatments',
            'Book sunrise Mount Batur trek at least a day in advance'
        ]
    },
    'rome': {
        name: 'Rome',
        country: 'Italy',
        region: 'Europe',
        emoji: '🏛️',
        gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
        description: 'Rome, the Eternal City, is a living museum where ancient history meets modern Italian life. With nearly 3,000 years of history, Rome offers unparalleled historical sites, world-class art, and delicious cuisine. Every corner reveals stunning architecture, fountains, and piazzas.',
        bestTime: 'April to June, September to October',
        language: 'Italian',
        currency: 'Euro (EUR)',
        timezone: 'GMT+1',
        attractions: [
            {
                name: 'Colosseum',
                description: 'Ancient amphitheater and iconic symbol of Imperial Rome, once hosting gladiatorial contests.'
            },
            {
                name: 'Vatican Museums',
                description: 'Vast museum complex featuring the Sistine Chapel with Michelangelo\'s magnificent frescoes.'
            },
            {
                name: 'Trevi Fountain',
                description: 'Baroque masterpiece where tradition says throwing a coin ensures your return to Rome.'
            },
            {
                name: 'Roman Forum',
                description: 'Ancient plaza surrounded by ruins of important government buildings from Roman civilization.'
            },
            {
                name: 'Pantheon',
                description: 'Remarkably preserved Roman temple with the world\'s largest unreinforced concrete dome.'
            },
            {
                name: 'Spanish Steps',
                description: 'Monumental stairway of 135 steps, a popular gathering place in the heart of Rome.'
            }
        ],
        tips: [
            'Book Colosseum and Vatican tickets online weeks in advance',
            'Visit popular sites early morning or late afternoon to avoid crowds',
            'Try authentic Roman cuisine: carbonara, cacio e pepe, supplì',
            'Dress modestly for churches - cover shoulders and knees',
            'Get a Roma Pass for skip-the-line access and public transport'
        ]
    },
    'santorini': {
        name: 'Santorini',
        country: 'Greece',
        region: 'Europe',
        emoji: '🇬🇷',
        gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
        description: 'Santorini is Greece\'s most spectacular island, famous for its dramatic cliffs, white-washed buildings with blue domes, and stunning sunsets. This volcanic island in the Aegean Sea offers romantic ambiance, excellent wine, and breathtaking caldera views that make it a bucket-list destination.',
        bestTime: 'April to November',
        language: 'Greek',
        currency: 'Euro (EUR)',
        timezone: 'GMT+2',
        attractions: [
            {
                name: 'Oia Village',
                description: 'Picture-perfect village with iconic blue-domed churches and the world\'s most famous sunset views.'
            },
            {
                name: 'Red Beach',
                description: 'Unique beach with dramatic red volcanic cliffs and crystal-clear turquoise waters.'
            },
            {
                name: 'Akrotiri Archaeological Site',
                description: 'Ancient Minoan city preserved by volcanic ash, often called the "Greek Pompeii".'
            },
            {
                name: 'Wine Tours',
                description: 'Visit traditional wineries carved into volcanic rock, tasting unique Assyrtiko and Vinsanto wines.'
            },
            {
                name: 'Caldera Cruise',
                description: 'Boat tours around the volcanic caldera with hot springs swimming and sunset viewing.'
            },
            {
                name: 'Fira Town',
                description: 'Island capital with stunning caldera views, cable car access, and vibrant nightlife.'
            }
        ],
        tips: [
            'Book accommodations with caldera views well in advance for sunset rooms',
            'Arrive in Oia by 7 PM to secure a good sunset viewing spot',
            'Rent an ATV or quad bike to explore the island independently',
            'Try local specialties: fava, tomatokeftedes, and fresh seafood',
            'Visit in shoulder seasons (May or October) to avoid peak crowds'
        ]
    }
};

function loadDestinationDetails(destinationName) {
    try {
        const normalizedName = destinationName.toLowerCase().replace(/\s+/g, '');
        const destination = detailedDestinationsData[normalizedName];
        
        if (!destination) {
            // If destination not found, redirect to destinations page
            console.error(`Destination '${destinationName}' not found in data`);
            alert('Destination not found. Redirecting to destinations page...');
            window.location.href = 'destinations.html';
            return;
        }
        
        console.log(`Loading details for: ${destination.name}`);
        
        // Update page title
        document.title = `${destination.name} - Travel Explorer`;
        
        // Update hero section
        const detailHero = document.getElementById('detailHero');
        if (detailHero) {
            detailHero.style.background = destination.gradient;
        }
        
        const heroEmoji = document.getElementById('heroEmoji');
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        
        if (heroEmoji) heroEmoji.textContent = destination.emoji;
        if (heroTitle) heroTitle.textContent = destination.name;
        if (heroSubtitle) heroSubtitle.textContent = destination.country;
    
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
    if (addToTripBtn) {
        addToTripBtn.href = `planner.html?add=${normalizedName}`;
    }
    
    console.log(`Successfully loaded details for ${destination.name}`);
    } catch (error) {
        console.error('Error loading destination details:', error);
        alert('Error loading destination details. Redirecting...');
        setTimeout(() => {
            window.location.href = 'destinations.html';
        }, 2000);
    }
}

function setupSaveButton() {
    try {
        const saveBtn = document.getElementById('saveBtn');
        if (!saveBtn) {
            console.warn('Save button not found');
            return;
        }
        
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
    } catch (error) {
        console.error('Error setting up save button:', error);
    }
}
