// Advanced Destinations Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedFeatures();
});

function initializeAdvancedFeatures() {
    // Initialize favorites from localStorage
    loadFavorites();
    
    // Setup search functionality
    setupSearch();
    
    // Setup filter tabs
    setupFilterTabs();
    
    // Setup advanced filters
    setupAdvancedFilters();
    
    // Setup favorite buttons
    setupFavoriteButtons();
    
    // Setup reset filters
    setupResetFilters();
    
    // Setup view favorites
    setupViewFavorites();
    
    // Initial count update
    updateResultsCount();
}

// ============= FAVORITES MANAGEMENT =============
let favorites = [];

function loadFavorites() {
    favorites = JSON.parse(localStorage.getItem('favoriteDestinations') || '[]');
    updateFavoriteCount();
    updateFavoriteButtons();
}

function saveFavorites() {
    localStorage.setItem('favoriteDestinations', JSON.stringify(favorites));
    updateFavoriteCount();
}

function toggleFavorite(destination) {
    const index = favorites.indexOf(destination);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(destination);
    }
    saveFavorites();
    updateFavoriteButtons();
}

function updateFavoriteCount() {
    const countElement = document.getElementById('favCount');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const destination = btn.dataset.destination;
        const icon = btn.querySelector('i');
        
        if (favorites.includes(destination)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('active');
        }
    });
}

function setupFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const destination = this.dataset.destination;
            toggleFavorite(destination);
            
            // Add animation
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ============= SEARCH FUNCTIONALITY =============
function setupSearch() {
    const searchInput = document.getElementById('destinationSearch');
    const clearBtn = document.getElementById('clearSearch');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // Show/hide clear button
        if (clearBtn) {
            clearBtn.style.display = query ? 'flex' : 'none';
        }
        
        filterDestinations();
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            filterDestinations();
            searchInput.focus();
        });
    }
    
    // Add enter key support
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterDestinations();
        }
    });
}

// ============= FILTER TABS =============
let activeRegion = 'all';

function setupFilterTabs() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update active region
            activeRegion = this.dataset.region;
            
            // Filter destinations
            filterDestinations();
        });
    });
}

// ============= ADVANCED FILTERS =============
function setupAdvancedFilters() {
    const budgetFilter = document.getElementById('budgetFilter');
    const activityFilter = document.getElementById('activityFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    [budgetFilter, activityFilter, sortFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterDestinations);
        }
    });
}

// ============= FILTER LOGIC =============
function filterDestinations() {
    const searchQuery = document.getElementById('destinationSearch')?.value.toLowerCase() || '';
    const budgetFilter = document.getElementById('budgetFilter')?.value || 'all';
    const activityFilter = document.getElementById('activityFilter')?.value || 'all';
    const sortFilter = document.getElementById('sortFilter')?.value || 'popular';
    
    const cards = Array.from(document.querySelectorAll('.destination-card'));
    let visibleCount = 0;
    
    // Filter cards
    cards.forEach(card => {
        const cardRegion = card.dataset.region;
        const cardBudget = card.dataset.budget;
        const cardActivity = card.dataset.activity;
        const cardText = card.textContent.toLowerCase();
        
        // Check all filter conditions
        const matchesSearch = searchQuery === '' || cardText.includes(searchQuery);
        const matchesRegion = activeRegion === 'all' || cardRegion === activeRegion;
        const matchesBudget = budgetFilter === 'all' || cardBudget === budgetFilter;
        const matchesActivity = activityFilter === 'all' || cardActivity === activityFilter;
        
        if (matchesSearch && matchesRegion && matchesBudget && matchesActivity) {
            card.style.display = '';
            card.style.animation = 'fadeInScale 0.5s ease forwards';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort visible cards
    sortDestinations(cards.filter(card => card.style.display !== 'none'), sortFilter);
    
    // Update results count
    updateResultsCount(visibleCount);
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount);
}

function sortDestinations(cards, sortBy) {
    const grid = document.querySelector('.destinations-grid');
    if (!grid) return;
    
    const sortedCards = [...cards].sort((a, b) => {
        switch(sortBy) {
            case 'name':
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                return nameA.localeCompare(nameB);
                
            case 'recent':
                // Reverse order for recently added
                return 0; // Keep original order for now
                
            case 'popular':
            default:
                // Keep original order (already sorted by popularity)
                return 0;
        }
    });
    
    // Re-append in sorted order
    sortedCards.forEach(card => grid.appendChild(card));
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        if (count === undefined) {
            const visibleCards = document.querySelectorAll('.destination-card:not([style*="display: none"])').length;
            count = visibleCards;
        }
        resultsCount.textContent = `Showing ${count} destination${count !== 1 ? 's' : ''}`;
    }
}

function showNoResultsMessage(count) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (count === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No destinations found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="resetAllFilters()">
                        <i class="fas fa-redo"></i>
                        Reset All Filters
                    </button>
                </div>
            `;
            document.querySelector('.destinations-grid').parentElement.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'flex';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// ============= RESET FILTERS =============
function setupResetFilters() {
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
    }
}

function resetAllFilters() {
    // Reset search
    const searchInput = document.getElementById('destinationSearch');
    if (searchInput) {
        searchInput.value = '';
        document.getElementById('clearSearch').style.display = 'none';
    }
    
    // Reset region filter
    activeRegion = 'all';
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.region === 'all');
    });
    
    // Reset dropdowns
    document.getElementById('budgetFilter').value = 'all';
    document.getElementById('activityFilter').value = 'all';
    document.getElementById('sortFilter').value = 'popular';
    
    // Re-filter
    filterDestinations();
    
    // Add feedback animation
    const resetBtn = document.getElementById('resetFilters');
    resetBtn.innerHTML = '<i class="fas fa-check"></i> Reset!';
    setTimeout(() => {
        resetBtn.innerHTML = '<i class="fas fa-redo"></i> Reset Filters';
    }, 1500);
}

// ============= VIEW FAVORITES =============
function setupViewFavorites() {
    const viewFavBtn = document.getElementById('viewFavorites');
    if (viewFavBtn) {
        viewFavBtn.addEventListener('click', showOnlyFavorites);
    }
}

let showingFavoritesOnly = false;

function showOnlyFavorites() {
    const viewFavBtn = document.getElementById('viewFavorites');
    showingFavoritesOnly = !showingFavoritesOnly;
    
    if (showingFavoritesOnly) {
        // Show only favorites
        document.querySelectorAll('.destination-card').forEach(card => {
            const destination = card.dataset.destination;
            if (favorites.includes(destination)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        viewFavBtn.innerHTML = '<i class="fas fa-th"></i> Show All';
        viewFavBtn.classList.add('active');
        
        const visibleCount = document.querySelectorAll('.destination-card:not([style*="display: none"])').length;
        updateResultsCount(visibleCount);
        showNoResultsMessage(visibleCount);
    } else {
        // Show all and reapply filters
        resetAllFilters();
        viewFavBtn.innerHTML = `<i class="fas fa-heart"></i> View Saved (<span id="favCount">${favorites.length}</span>)`;
        viewFavBtn.classList.remove('active');
    }
}

// ============= ANIMATIONS =============
// Add fade in scale animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ============= EXPOSE FUNCTIONS GLOBALLY =============
window.resetAllFilters = resetAllFilters;
