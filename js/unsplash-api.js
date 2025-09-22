import { API_CONFIG } from './api-config.js';

/**
 * Get trending travel photos from Unsplash API
 * @param {string} query - Search query for photos (e.g., 'travel', 'beach', 'mountains')
 * @param {number} count - Number of photos to fetch (default: 12)
 * @returns {Promise<Array>} Array of photo objects
 */
export async function getTrendingPhotos(query = 'travel destination', count = 12) {
    try {
        showTrendingLoadingState();
        
        const response = await fetch(
            `${API_CONFIG.UNSPLASH.baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&order_by=popular&orientation=landscape`,
            {
                headers: {
                    'Authorization': `Client-ID ${API_CONFIG.UNSPLASH.accessKey}`
                }
            }
        );
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid Unsplash API key. Please check your configuration.');
            }
            throw new Error(`Unsplash API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            throw new Error('No trending photos found');
        }
        
        const photos = data.results.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            thumb: photo.urls.thumb,
            description: photo.description || photo.alt_description || 'Beautiful destination',
            photographer: photo.user.name,
            photographerUrl: photo.user.links.html,
            location: photo.location?.name || 'Unknown location',
            likes: photo.likes,
            downloadUrl: photo.links.download
        }));
        
        displayTrendingPhotos(photos);
        return photos;
        
    } catch (error) {
        console.error('Error fetching trending photos:', error);
        displayTrendingError(error.message);
        throw error;
    }
}

/**
 * Get photos for specific travel categories
 * @param {Array} categories - Array of category strings
 * @returns {Promise<Object>} Object with category names as keys and photo arrays as values
 */
export async function getPhotosByCategories(categories = ['beach', 'mountains', 'city', 'nature']) {
    try {
        const categoryPromises = categories.map(async (category) => {
            try {
                const photos = await getTrendingPhotos(category, 6);
                return { category, photos };
            } catch (error) {
                console.log(`Photos not available for category: ${category}`);
                return { category, photos: [] };
            }
        });
        
        const results = await Promise.all(categoryPromises);
        
        const categorizedPhotos = {};
        results.forEach(result => {
            categorizedPhotos[result.category] = result.photos;
        });
        
        return categorizedPhotos;
        
    } catch (error) {
        console.error('Error fetching categorized photos:', error);
        throw error;
    }
}

/**
 * Display trending photos in the trending section
 * @param {Array} photos - Array of photo objects
 */
function displayTrendingPhotos(photos) {
    const trendingContainer = document.getElementById('trending-photos') || createTrendingContainer();
    
    const photoCards = photos.map(photo => `
        <div class="trending-photo-card" data-photo-id="${photo.id}">
            <div class="photo-container">
                <img src="${photo.thumb}" alt="${photo.description}" loading="lazy" />
                <div class="photo-overlay">
                    <div class="photo-actions">
                        <button class="photo-action-btn" onclick="viewFullPhoto('${photo.url}', '${photo.description}')" title="View full size">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button class="photo-action-btn" onclick="likePhoto('${photo.id}')" title="Like photo">
                            <i class="fas fa-heart"></i>
                            <span>${photo.likes}</span>
                        </button>
                    </div>
                    <div class="photo-info">
                        <p class="photo-description">${photo.description}</p>
                        <div class="photo-credit">
                            <i class="fas fa-camera"></i>
                            <a href="${photo.photographerUrl}" target="_blank" rel="noopener">
                                ${photo.photographer}
                            </a>
                        </div>
                        ${photo.location !== 'Unknown location' ? `
                            <div class="photo-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${photo.location}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    trendingContainer.innerHTML = `
        <div class="trending-header">
            <h2>🔥 Trending Travel Photos</h2>
            <p>Discover stunning destinations through the lens of talented photographers</p>
            <div class="trending-filters">
                <button class="filter-btn active" onclick="filterTrendingPhotos('all')">All</button>
                <button class="filter-btn" onclick="filterTrendingPhotos('beach')">Beaches</button>
                <button class="filter-btn" onclick="filterTrendingPhotos('mountains')">Mountains</button>
                <button class="filter-btn" onclick="filterTrendingPhotos('city')">Cities</button>
                <button class="filter-btn" onclick="filterTrendingPhotos('nature')">Nature</button>
            </div>
        </div>
        <div class="trending-photos-grid">
            ${photoCards}
        </div>
        <div class="trending-actions">
            <button class="btn btn-outline" onclick="loadMoreTrendingPhotos()">
                <i class="fas fa-plus"></i>
                Load More Photos
            </button>
            <a href="https://unsplash.com/" target="_blank" class="unsplash-credit">
                <span>Photos provided by</span>
                <img src="https://unsplash.com/assets/core/logo-white-8962708214629a3e8f4c6b97e919af0265c651fcc8e1b3c1f43c5fdbac7b5cc3.svg" alt="Unsplash" />
            </a>
        </div>
    `;
    
    trendingContainer.style.display = 'block';
}

/**
 * Display error message for trending photos
 * @param {string} message - Error message
 */
function displayTrendingError(message) {
    const trendingContainer = document.getElementById('trending-photos') || createTrendingContainer();
    
    trendingContainer.innerHTML = `
        <div class="trending-error">
            <div class="error-icon">
                <i class="fas fa-image"></i>
            </div>
            <h3>Photos Unavailable</h3>
            <p>${message}</p>
            <p class="error-suggestion">Please check your Unsplash API configuration or try again later.</p>
            <button class="btn btn-primary" onclick="getTrendingPhotos()">
                <i class="fas fa-redo"></i>
                Try Again
            </button>
        </div>
    `;
    
    trendingContainer.style.display = 'block';
}

/**
 * Show loading state for trending photos
 */
function showTrendingLoadingState() {
    const trendingContainer = document.getElementById('trending-photos') || createTrendingContainer();
    
    const loadingCards = Array(12).fill().map((_, index) => `
        <div class="trending-photo-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-info">
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
            </div>
        </div>
    `).join('');
    
    trendingContainer.innerHTML = `
        <div class="trending-header">
            <h2>🔥 Trending Travel Photos</h2>
            <div class="loading-indicator">
                <div class="loading-spinner"></div>
                <span>Loading stunning travel photos...</span>
            </div>
        </div>
        <div class="trending-photos-grid">
            ${loadingCards}
        </div>
    `;
    
    trendingContainer.style.display = 'block';
}

/**
 * Create trending photos container if it doesn't exist
 * @returns {HTMLElement} The trending container element
 */
function createTrendingContainer() {
    let container = document.getElementById('trending-photos');
    if (!container) {
        container = document.createElement('section');
        container.id = 'trending-photos';
        container.className = 'trending-section';
        
        // Try to insert it in a logical place (after main content)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }
    return container;
}

/**
 * Filter trending photos by category
 * @param {string} category - Category to filter by
 */
window.filterTrendingPhotos = async function(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        await getTrendingPhotos('travel destination', 12);
    } else {
        await getTrendingPhotos(category, 12);
    }
};

/**
 * Load more trending photos
 */
window.loadMoreTrendingPhotos = async function() {
    const currentCategory = document.querySelector('.filter-btn.active').textContent.toLowerCase();
    const query = currentCategory === 'all' ? 'travel destination' : currentCategory;
    
    try {
        const newPhotos = await getTrendingPhotos(query, 6);
        const grid = document.querySelector('.trending-photos-grid');
        if (grid) {
            const newPhotoCards = newPhotos.map(photo => `
                <div class="trending-photo-card" data-photo-id="${photo.id}">
                    <!-- Photo card HTML similar to above -->
                </div>
            `).join('');
            grid.insertAdjacentHTML('beforeend', newPhotoCards);
        }
    } catch (error) {
        console.error('Error loading more photos:', error);
    }
};

/**
 * View full size photo in modal
 * @param {string} url - Full size image URL
 * @param {string} description - Photo description
 */
window.viewFullPhoto = function(url, description) {
    // Create and show modal with full size image
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closePhotoModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closePhotoModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${url}" alt="${description}" />
            <div class="modal-info">
                <p>${description}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
};

/**
 * Close photo modal
 */
window.closePhotoModal = function() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.remove();
    }
};

/**
 * Like a photo (placeholder function)
 * @param {string} photoId - Photo ID
 */
window.likePhoto = function(photoId) {
    const button = event.target.closest('.photo-action-btn');
    button.classList.toggle('liked');
    
    // You could implement actual like functionality here
    console.log(`Photo ${photoId} liked!`);
};