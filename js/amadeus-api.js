import { API_CONFIG, amadeusToken, tokenExpiry } from './api-config.js';

/**
 * Get Amadeus access token
 * @returns {Promise<string>} Access token
 */
async function getAmadeusToken() {
    // Check if we have a valid token
    if (amadeusToken && tokenExpiry && new Date() < tokenExpiry) {
        return amadeusToken;
    }
    
    try {
        const response = await fetch(`${API_CONFIG.AMADEUS.baseUrl}/security/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': API_CONFIG.AMADEUS.clientId,
                'client_secret': API_CONFIG.AMADEUS.clientSecret
            })
        });
        
        if (!response.ok) {
            throw new Error(`Amadeus authentication failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store token and expiry time
        amadeusToken = data.access_token;
        tokenExpiry = new Date(Date.now() + (data.expires_in * 1000) - 60000); // Subtract 1 minute for safety
        
        return amadeusToken;
        
    } catch (error) {
        console.error('Error getting Amadeus token:', error);
        throw error;
    }
}

/**
 * Search for flights and hotels for a destination
 * @param {string} cityName - Destination city name
 * @param {number} lat - Latitude of the destination
 * @param {number} lon - Longitude of the destination
 * @param {string} originCity - Origin city (default: 'NYC' for demo)
 * @returns {Promise<Object>} Object containing flights and hotels data
 */
export async function getFlightsHotels(cityName, lat, lon, originCity = 'NYC') {
    try {
        showDealsLoadingState(cityName);
        
        const token = await getAmadeusToken();
        
        // Get IATA code for destination city
        const destinationCode = await getCityIATACode(cityName, token);
        const originCode = await getCityIATACode(originCity, token);
        
        // Search for flights and hotels in parallel
        const [flightsData, hotelsData] = await Promise.all([
            searchFlights(originCode, destinationCode, token),
            searchHotels(lat, lon, token)
        ]);
        
        const dealsData = {
            destination: cityName,
            flights: flightsData,
            hotels: hotelsData
        };
        
        displayFlightsHotels(dealsData);
        return dealsData;
        
    } catch (error) {
        console.error('Error fetching flights and hotels:', error);
        displayDealsError(error.message, cityName);
        throw error;
    }
}

/**
 * Get IATA code for a city
 * @param {string} cityName - City name
 * @param {string} token - Amadeus access token
 * @returns {Promise<string>} IATA code
 */
async function getCityIATACode(cityName, token) {
    try {
        const response = await fetch(
            `${API_CONFIG.AMADEUS.baseUrl}/reference-data/locations?keyword=${encodeURIComponent(cityName)}&subType=CITY,AIRPORT&page%5Blimit%5D=1`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Failed to get IATA code for ${cityName}`);
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            throw new Error(`No IATA code found for ${cityName}`);
        }
        
        return data.data[0].iataCode;
        
    } catch (error) {
        console.error(`Error getting IATA code for ${cityName}:`, error);
        // Return default codes for demo purposes
        const defaultCodes = {
            'New York': 'NYC',
            'London': 'LON',
            'Paris': 'PAR',
            'Tokyo': 'TYO',
            'Sydney': 'SYD',
            'Dubai': 'DXB',
            'Rome': 'ROM',
            'Bali': 'DPS',
            'Santorini': 'JTR'
        };
        return defaultCodes[cityName] || 'NYC';
    }
}

/**
 * Search for flights
 * @param {string} originCode - Origin IATA code
 * @param {string} destinationCode - Destination IATA code
 * @param {string} token - Amadeus access token
 * @returns {Promise<Array>} Array of flight offers
 */
async function searchFlights(originCode, destinationCode, token) {
    try {
        // Get departure date (7 days from now)
        const departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 7);
        const departureDateString = departureDate.toISOString().split('T')[0];
        
        const response = await fetch(
            `${API_CONFIG.AMADEUS.baseUrl}/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destinationCode}&departureDate=${departureDateString}&adults=1&max=5`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
            if (response.status === 400) {
                // Return sample data for demo
                return getSampleFlightData(originCode, destinationCode);
            }
            throw new Error(`Flight search failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            return getSampleFlightData(originCode, destinationCode);
        }
        
        return data.data.slice(0, 5).map(offer => ({
            id: offer.id,
            price: offer.price.total,
            currency: offer.price.currency,
            airline: offer.validatingAirlineCodes[0],
            duration: offer.itineraries[0].duration,
            segments: offer.itineraries[0].segments.length,
            departure: offer.itineraries[0].segments[0].departure,
            arrival: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival
        }));
        
    } catch (error) {
        console.error('Error searching flights:', error);
        return getSampleFlightData(originCode, destinationCode);
    }
}

/**
 * Search for hotels
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} token - Amadeus access token
 * @returns {Promise<Array>} Array of hotel offers
 */
async function searchHotels(lat, lon, token) {
    try {
        const response = await fetch(
            `${API_CONFIG.AMADEUS.baseUrl}/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=5&radiusUnit=KM&hotelSource=ALL`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
            if (response.status === 400) {
                return getSampleHotelData();
            }
            throw new Error(`Hotel search failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            return getSampleHotelData();
        }
        
        return data.data.slice(0, 5).map(hotel => ({
            id: hotel.hotelId,
            name: hotel.name,
            rating: hotel.rating || Math.floor(Math.random() * 2) + 4, // 4-5 star rating
            distance: hotel.distance?.value || Math.random() * 5,
            distanceUnit: hotel.distance?.unit || 'KM',
            address: hotel.address?.lines?.join(', ') || 'City Center',
            price: `$${Math.floor(Math.random() * 200) + 100}`, // Sample price
            amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'].slice(0, Math.floor(Math.random() * 4) + 1)
        }));
        
    } catch (error) {
        console.error('Error searching hotels:', error);
        return getSampleHotelData();
    }
}

/**
 * Get sample flight data for demo purposes
 * @param {string} origin - Origin code
 * @param {string} destination - Destination code
 * @returns {Array} Sample flight data
 */
function getSampleFlightData(origin, destination) {
    const sampleFlights = [
        {
            id: 'SAMPLE1',
            price: '459.99',
            currency: 'USD',
            airline: 'AA',
            duration: 'PT8H30M',
            segments: 1,
            departure: { iataCode: origin, at: '2024-10-01T08:00:00' },
            arrival: { iataCode: destination, at: '2024-10-01T16:30:00' }
        },
        {
            id: 'SAMPLE2',
            price: '523.45',
            currency: 'USD',
            airline: 'DL',
            duration: 'PT10H15M',
            segments: 2,
            departure: { iataCode: origin, at: '2024-10-01T14:20:00' },
            arrival: { iataCode: destination, at: '2024-10-02T00:35:00' }
        },
        {
            id: 'SAMPLE3',
            price: '398.20',
            currency: 'USD',
            airline: 'UA',
            duration: 'PT9H45M',
            segments: 1,
            departure: { iataCode: origin, at: '2024-10-01T11:15:00' },
            arrival: { iataCode: destination, at: '2024-10-01T21:00:00' }
        }
    ];
    
    return sampleFlights;
}

/**
 * Get sample hotel data for demo purposes
 * @returns {Array} Sample hotel data
 */
function getSampleHotelData() {
    const sampleHotels = [
        {
            id: 'HOTEL1',
            name: 'Grand Plaza Hotel',
            rating: 5,
            distance: 0.5,
            distanceUnit: 'KM',
            address: 'City Center, Downtown',
            price: '$189',
            amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa']
        },
        {
            id: 'HOTEL2',
            name: 'Boutique Suites',
            rating: 4,
            distance: 1.2,
            distanceUnit: 'KM',
            address: 'Arts District',
            price: '$145',
            amenities: ['WiFi', 'Restaurant', 'Bar']
        },
        {
            id: 'HOTEL3',
            name: 'Budget Inn & Suites',
            rating: 3,
            distance: 2.8,
            distanceUnit: 'KM',
            address: 'Airport District',
            price: '$89',
            amenities: ['WiFi', 'Parking']
        }
    ];
    
    return sampleHotels;
}

/**
 * Display flights and hotels information
 * @param {Object} dealsData - Object containing flights and hotels data
 */
function displayFlightsHotels(dealsData) {
    const dealsContainer = document.getElementById('deals-display') || createDealsContainer();
    
    const flightCards = dealsData.flights.map(flight => {
        const departureTime = new Date(flight.departure.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const arrivalTime = new Date(flight.arrival.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const duration = parseDuration(flight.duration);
        
        return `
            <div class="deal-card flight-card">
                <div class="deal-header">
                    <div class="airline-info">
                        <i class="fas fa-plane"></i>
                        <span class="airline-code">${flight.airline}</span>
                    </div>
                    <div class="deal-price">
                        <span class="price-amount">${flight.currency} ${flight.price}</span>
                        <span class="price-label">per person</span>
                    </div>
                </div>
                <div class="flight-details">
                    <div class="flight-route">
                        <div class="flight-time">
                            <span class="time">${departureTime}</span>
                            <span class="airport">${flight.departure.iataCode}</span>
                        </div>
                        <div class="flight-duration">
                            <i class="fas fa-arrow-right"></i>
                            <span>${duration}</span>
                            ${flight.segments > 1 ? `<span class="stops">${flight.segments - 1} stop${flight.segments > 2 ? 's' : ''}</span>` : '<span class="nonstop">Nonstop</span>'}
                        </div>
                        <div class="flight-time">
                            <span class="time">${arrivalTime}</span>
                            <span class="airport">${flight.arrival.iataCode}</span>
                        </div>
                    </div>
                </div>
                <div class="deal-actions">
                    <button class="btn btn-primary btn-small">Select Flight</button>
                </div>
            </div>
        `;
    }).join('');
    
    const hotelCards = dealsData.hotels.map(hotel => `
        <div class="deal-card hotel-card">
            <div class="deal-header">
                <div class="hotel-info">
                    <h4 class="hotel-name">${hotel.name}</h4>
                    <div class="hotel-rating">
                        ${Array(hotel.rating).fill().map(() => '<i class="fas fa-star"></i>').join('')}
                        <span class="rating-number">${hotel.rating}</span>
                    </div>
                </div>
                <div class="deal-price">
                    <span class="price-amount">${hotel.price}</span>
                    <span class="price-label">per night</span>
                </div>
            </div>
            <div class="hotel-details">
                <div class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${hotel.address}</span>
                    <span class="distance">${hotel.distance} ${hotel.distanceUnit} from center</span>
                </div>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
            </div>
            <div class="deal-actions">
                <button class="btn btn-primary btn-small">Book Hotel</button>
            </div>
        </div>
    `).join('');
    
    dealsContainer.innerHTML = `
        <div class="deals-header">
            <h2>✈️ Flights & Hotels for ${dealsData.destination}</h2>
            <p>Find the best deals for your upcoming trip</p>
        </div>
        
        <div class="deals-section">
            <div class="section-title">
                <h3><i class="fas fa-plane"></i> Flight Deals</h3>
                <span class="results-count">${dealsData.flights.length} options found</span>
            </div>
            <div class="deals-grid flights-grid">
                ${flightCards}
            </div>
        </div>
        
        <div class="deals-section">
            <div class="section-title">
                <h3><i class="fas fa-bed"></i> Hotel Deals</h3>
                <span class="results-count">${dealsData.hotels.length} options found</span>
            </div>
            <div class="deals-grid hotels-grid">
                ${hotelCards}
            </div>
        </div>
        
        <div class="deals-footer">
            <p class="disclaimer">
                <i class="fas fa-info-circle"></i>
                Prices are estimates and may vary. Book directly with airlines and hotels for final pricing.
            </p>
        </div>
    `;
    
    dealsContainer.style.display = 'block';
}

/**
 * Parse ISO 8601 duration to readable format
 * @param {string} duration - ISO 8601 duration string
 * @returns {string} Human readable duration
 */
function parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    
    if (hours && minutes) {
        return `${hours}h ${minutes}m`;
    } else if (hours) {
        return `${hours}h`;
    } else if (minutes) {
        return `${minutes}m`;
    }
    return duration;
}

/**
 * Show loading state for deals
 * @param {string} cityName - City name
 */
function showDealsLoadingState(cityName) {
    const dealsContainer = document.getElementById('deals-display') || createDealsContainer();
    
    dealsContainer.innerHTML = `
        <div class="deals-loading">
            <div class="loading-header">
                <h2>🔍 Searching for deals in ${cityName}...</h2>
                <div class="loading-spinner"></div>
            </div>
            <div class="loading-content">
                <div class="loading-section">
                    <h3><i class="fas fa-plane"></i> Finding flights...</h3>
                    <div class="loading-cards">
                        ${Array(3).fill().map(() => '<div class="deal-skeleton"></div>').join('')}
                    </div>
                </div>
                <div class="loading-section">
                    <h3><i class="fas fa-bed"></i> Searching hotels...</h3>
                    <div class="loading-cards">
                        ${Array(3).fill().map(() => '<div class="deal-skeleton"></div>').join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    dealsContainer.style.display = 'block';
}

/**
 * Display error message for deals
 * @param {string} message - Error message
 * @param {string} cityName - City name
 */
function displayDealsError(message, cityName) {
    const dealsContainer = document.getElementById('deals-display') || createDealsContainer();
    
    dealsContainer.innerHTML = `
        <div class="deals-error">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Unable to Load Deals</h3>
            <p>We couldn't find flights and hotels for ${cityName} at the moment.</p>
            <p class="error-message">${message}</p>
            <div class="error-actions">
                <button class="btn btn-primary" onclick="getFlightsHotels('${cityName}')">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
                <p class="error-suggestion">Check your Amadeus API configuration or try a different destination.</p>
            </div>
        </div>
    `;
    
    dealsContainer.style.display = 'block';
}

/**
 * Create deals container if it doesn't exist
 * @returns {HTMLElement} The deals container element
 */
function createDealsContainer() {
    let container = document.getElementById('deals-display');
    if (!container) {
        container = document.createElement('div');
        container.id = 'deals-display';
        container.className = 'deals-container';
        
        // Try to insert it in a logical place
        const weatherContainer = document.getElementById('weather-display');
        if (weatherContainer) {
            weatherContainer.parentNode.insertBefore(container, weatherContainer.nextSibling);
        } else {
            document.body.appendChild(container);
        }
    }
    return container;
}