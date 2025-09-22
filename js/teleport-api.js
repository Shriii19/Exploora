import { API_CONFIG } from './api-config.js';

/**
 * Search for city information using Teleport API
 * @param {string} cityName - The name of the city to search
 * @returns {Promise<Object>} City information object
 */
export async function searchCity(cityName) {
    try {
        showLoadingState('city-search-results');
        
        // First, search for the city
        const searchResponse = await fetch(
            `${API_CONFIG.TELEPORT.baseUrl}/cities/?search=${encodeURIComponent(cityName)}`
        );
        
        if (!searchResponse.ok) {
            throw new Error(`HTTP error! status: ${searchResponse.status}`);
        }
        
        const searchData = await searchResponse.json();
        
        if (!searchData._embedded || !searchData._embedded['city:search-results'] || 
            searchData._embedded['city:search-results'].length === 0) {
            throw new Error('City not found');
        }
        
        // Get the first city result
        const city = searchData._embedded['city:search-results'][0];
        const cityDetailsUrl = city._links['city:item'].href;
        
        // Fetch detailed city information
        const detailsResponse = await fetch(cityDetailsUrl);
        const cityDetails = await detailsResponse.json();
        
        // Try to get urban area information for quality of life scores
        let urbanAreaData = null;
        if (cityDetails._links && cityDetails._links['city:urban_area']) {
            try {
                const urbanAreaResponse = await fetch(cityDetails._links['city:urban_area'].href);
                const urbanArea = await urbanAreaResponse.json();
                
                // Get scores
                if (urbanArea._links && urbanArea._links['ua:scores']) {
                    const scoresResponse = await fetch(urbanArea._links['ua:scores'].href);
                    urbanAreaData = await scoresResponse.json();
                }
            } catch (error) {
                console.log('Urban area data not available for this city');
            }
        }
        
        const cityInfo = {
            name: cityDetails.full_name,
            population: cityDetails.population || 'N/A',
            location: cityDetails.location ? {
                lat: cityDetails.location.latlon.latitude,
                lon: cityDetails.location.latlon.longitude
            } : null,
            country: cityDetails._links?.['city:country']?.name || 'Unknown',
            urbanAreaScores: urbanAreaData?.categories || null,
            overallScore: urbanAreaData?.teleport_city_score || null
        };
        
        displayCityInfo(cityInfo);
        return cityInfo;
        
    } catch (error) {
        console.error('Error searching city:', error);
        displayCityError(error.message);
        throw error;
    }
}

/**
 * Display city information in the UI
 * @param {Object} cityInfo - City information object
 */
function displayCityInfo(cityInfo) {
    const resultsContainer = document.getElementById('city-search-results') || createSearchResultsContainer();
    
    const scoreCards = cityInfo.urbanAreaScores ? 
        cityInfo.urbanAreaScores.slice(0, 6).map(score => `
            <div class="score-card">
                <div class="score-name">${score.name}</div>
                <div class="score-value">${Math.round(score.score_out_of_10 * 10)/10}/10</div>
            </div>
        `).join('') : '<p class="no-scores">Quality of life scores not available</p>';
    
    resultsContainer.innerHTML = `
        <div class="city-result-card">
            <div class="city-header">
                <h3 class="city-name">${cityInfo.name}</h3>
                ${cityInfo.overallScore ? `<div class="overall-score">${Math.round(cityInfo.overallScore)}/100</div>` : ''}
            </div>
            
            <div class="city-details">
                <div class="city-stat">
                    <i class="fas fa-users"></i>
                    <span>Population: ${cityInfo.population.toLocaleString()}</span>
                </div>
                <div class="city-stat">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${cityInfo.country}</span>
                </div>
                ${cityInfo.location ? `
                    <div class="city-stat">
                        <i class="fas fa-globe"></i>
                        <span>${cityInfo.location.lat.toFixed(2)}, ${cityInfo.location.lon.toFixed(2)}</span>
                    </div>
                ` : ''}
            </div>
            
            ${cityInfo.urbanAreaScores ? `
                <div class="quality-scores">
                    <h4>Quality of Life Scores</h4>
                    <div class="scores-grid">
                        ${scoreCards}
                    </div>
                </div>
            ` : ''}
            
            <div class="city-actions">
                <button class="btn btn-primary" onclick="getWeather('${cityInfo.name}')">
                    <i class="fas fa-cloud-sun"></i>
                    Check Weather
                </button>
                ${cityInfo.location ? `
                    <button class="btn btn-secondary" onclick="getFlightsHotels('${cityInfo.name}', ${cityInfo.location.lat}, ${cityInfo.location.lon})">
                        <i class="fas fa-plane"></i>
                        Find Deals
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    resultsContainer.style.display = 'block';
}

/**
 * Display error message for city search
 * @param {string} message - Error message
 */
function displayCityError(message) {
    const resultsContainer = document.getElementById('city-search-results') || createSearchResultsContainer();
    
    resultsContainer.innerHTML = `
        <div class="city-error-card">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>City Not Found</h3>
            <p>${message}</p>
            <p class="error-suggestion">Try searching with a different spelling or include the country name.</p>
        </div>
    `;
    
    resultsContainer.style.display = 'block';
}

/**
 * Create search results container if it doesn't exist
 * @returns {HTMLElement} The results container element
 */
function createSearchResultsContainer() {
    let container = document.getElementById('city-search-results');
    if (!container) {
        container = document.createElement('div');
        container.id = 'city-search-results';
        container.className = 'search-results-container';
        
        // Insert after the search container
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.parentNode.insertBefore(container, searchContainer.nextSibling);
        } else {
            document.body.appendChild(container);
        }
    }
    return container;
}

/**
 * Show loading state for any container
 * @param {string} containerId - ID of the container to show loading state
 */
function showLoadingState(containerId) {
    const container = document.getElementById(containerId) || createSearchResultsContainer();
    container.innerHTML = `
        <div class="loading-card">
            <div class="loading-spinner"></div>
            <p>Searching for city information...</p>
        </div>
    `;
    container.style.display = 'block';
}