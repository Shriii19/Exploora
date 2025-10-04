import { API_CONFIG } from './api-config.js';

/**
 * Get weather information for a city using OpenWeather API
 * @param {string} cityName - Name of the city
 * @param {number} lat - Latitude (optional)
 * @param {number} lon - Longitude (optional)
 * @returns {Promise<Object>} Weather information object
 */
export async function getWeather(cityName, lat = null, lon = null) {
    try {
        let url;
        
        if (lat && lon) {
            url = `${API_CONFIG.OPENWEATHER.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.OPENWEATHER.key}&units=metric`;
        } else {
            url = `${API_CONFIG.OPENWEATHER.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${API_CONFIG.OPENWEATHER.key}&units=metric`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Weather data not found for this location');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
            }
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        const weatherInfo = {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            main: data.weather[0].main,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            visibility: data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A',
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        displayWeatherInfo(weatherInfo);
        return weatherInfo;
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        displayWeatherError(error.message);
        throw error;
    }
}

/**
 * Get weather for multiple destinations (for destination cards)
 * @param {Array} destinations - Array of destination objects with city names
 */
export async function getWeatherForDestinations(destinations) {
    const weatherPromises = destinations.map(async (destination) => {
        try {
            const weather = await getWeather(destination.city);
            return { ...destination, weather };
        } catch (error) {
            console.log(`Weather not available for ${destination.city}`);
            return { ...destination, weather: null };
        }
    });
    
    return await Promise.all(weatherPromises);
}

/**
 * Display weather information in the UI
 * @param {Object} weatherInfo - Weather information object
 */
function displayWeatherInfo(weatherInfo) {
    try {
        // Validate weatherInfo object
        if (!weatherInfo || typeof weatherInfo !== 'object') {
            throw new Error('Invalid weather information provided');
        }
        
        // Check if we're in a city search context or destination card context
        const weatherContainer = document.getElementById('weather-display') || createWeatherContainer();
        
        if (!weatherContainer) {
            console.warn('Weather container not found, skipping display');
            return;
        }
        
        // Safely construct icon URL with fallback
        const iconCode = weatherInfo.icon || '01d'; // Default to clear sky icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        // Safely get values with fallbacks
        const city = weatherInfo.city || 'Unknown';
        const country = weatherInfo.country || '';
        const description = weatherInfo.description || 'No description';
        
        weatherContainer.innerHTML = `
            <div class="weather-card">
                <div class="weather-header">
                    <div class="weather-location">
                        <h3>${city}${country ? `, ${country}` : ''}</h3>
                        <p class="weather-time">Updated: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="${iconUrl}" alt="${description}" onerror="this.style.display='none'" />
                </div>
            </div>
            
            <div class="weather-main">
                <div class="temperature">
                    <span class="temp-value">${temperature}°C</span>
                    <span class="feels-like">Feels like ${feelsLike}°C</span>
                </div>
                <div class="weather-description">
                    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="weather-detail">
                    <i class="fas fa-tint"></i>
                    <span>Humidity</span>
                    <strong>${humidity}%</strong>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-wind"></i>
                    <span>Wind</span>
                    <strong>${windSpeed} m/s</strong>
                    <strong>${weatherInfo.windSpeed} m/s</strong>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-eye"></i>
                    <span>Visibility</span>
                    <strong>${visibility} km</strong>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-thermometer-half"></i>
                    <span>Pressure</span>
                    <strong>${pressure} hPa</strong>
                </div>
            </div>
            
            <div class="sun-times">
                <div class="sun-time">
                    <i class="fas fa-sunrise"></i>
                    <span>Sunrise: ${sunrise}</span>
                </div>
                <div class="sun-time">
                    <i class="fas fa-sunset"></i>
                    <span>Sunset: ${sunset}</span>
                </div>
            </div>
        </div>
    `;
    
    weatherContainer.style.display = 'block';
    } catch (error) {
        console.error('Error displaying weather information:', error);
        displayWeatherError('Unable to display weather information');
    }
}

/**
 * Add weather widget to destination card
 * @param {HTMLElement} cardElement - The destination card element
 * @param {Object} weatherInfo - Weather information object
 */
export function addWeatherToDestinationCard(cardElement, weatherInfo) {
    if (!weatherInfo) return;
    
    const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
    
    // Check if weather widget already exists
    let weatherWidget = cardElement.querySelector('.weather-widget');
    if (!weatherWidget) {
        weatherWidget = document.createElement('div');
        weatherWidget.className = 'weather-widget';
        
        // Insert weather widget in the destination card
        const destinationContent = cardElement.querySelector('.destination-content');
        if (destinationContent) {
            destinationContent.insertBefore(weatherWidget, destinationContent.firstChild);
        }
    }
    
    weatherWidget.innerHTML = `
        <div class="weather-mini">
            <img src="${iconUrl}" alt="${weatherInfo.description}" class="weather-mini-icon" />
            <div class="weather-mini-info">
                <span class="weather-temp">${weatherInfo.temperature}°C</span>
                <span class="weather-desc">${weatherInfo.main}</span>
            </div>
        </div>
    `;
}

/**
 * Display weather error message
 * @param {string} message - Error message
 */
function displayWeatherError(message) {
    const weatherContainer = document.getElementById('weather-display') || createWeatherContainer();
    
    weatherContainer.innerHTML = `
        <div class="weather-error-card">
            <div class="error-icon">
                <i class="fas fa-cloud-rain"></i>
            </div>
            <h3>Weather Unavailable</h3>
            <p>${message}</p>
            <p class="error-suggestion">Please try again later or check your API configuration.</p>
        </div>
    `;
    
    weatherContainer.style.display = 'block';
}

/**
 * Create weather container if it doesn't exist
 * @returns {HTMLElement} The weather container element
 */
function createWeatherContainer() {
    let container = document.getElementById('weather-display');
    if (!container) {
        container = document.createElement('div');
        container.id = 'weather-display';
        container.className = 'weather-container';
        
        // Try to insert it in a logical place
        const cityResults = document.getElementById('city-search-results');
        if (cityResults) {
            cityResults.parentNode.insertBefore(container, cityResults.nextSibling);
        } else {
            document.body.appendChild(container);
        }
    }
    return container;
}