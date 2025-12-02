// Search Suggestions with Debounce
(function() {
    'use strict';

    // Debounce utility function
    function debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Popular destinations and search suggestions
    const searchSuggestions = [
        { name: 'Paris', country: 'France', icon: '🗼', category: 'Cultural' },
        { name: 'Tokyo', country: 'Japan', icon: '🏯', category: 'Cultural' },
        { name: 'Bali', country: 'Indonesia', icon: '🏝️', category: 'Beach' },
        { name: 'New York', country: 'USA', icon: '🗽', category: 'Urban' },
        { name: 'London', country: 'UK', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', category: 'Cultural' },
        { name: 'Dubai', country: 'UAE', icon: '🏙️', category: 'Luxury' },
        { name: 'Santorini', country: 'Greece', icon: '🌅', category: 'Beach' },
        { name: 'Rome', country: 'Italy', icon: '🏛️', category: 'Cultural' },
        { name: 'Barcelona', country: 'Spain', icon: '🏖️', category: 'Beach' },
        { name: 'Sydney', country: 'Australia', icon: '🦘', category: 'Urban' },
        { name: 'Maldives', country: 'Maldives', icon: '🏝️', category: 'Beach' },
        { name: 'Iceland', country: 'Iceland', icon: '🏔️', category: 'Adventure' },
        { name: 'Thailand', country: 'Thailand', icon: '🛕', category: 'Cultural' },
        { name: 'Switzerland', country: 'Switzerland', icon: '⛰️', category: 'Adventure' },
        { name: 'Morocco', country: 'Morocco', icon: '🕌', category: 'Cultural' }
    ];

    // Create suggestions dropdown
    function createSuggestionsDropdown(input) {
        const dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            margin-top: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        // Position relative to input
        const parent = input.closest('.search-wrapper') || input.parentElement;
        if (parent) {
            parent.style.position = 'relative';
            parent.appendChild(dropdown);
        }
        
        return dropdown;
    }

    // Filter suggestions based on query
    function filterSuggestions(query) {
        if (!query || query.length < 2) return [];
        
        const lowerQuery = query.toLowerCase();
        return searchSuggestions.filter(item => 
            item.name.toLowerCase().includes(lowerQuery) ||
            item.country.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 8);
    }

    // Render suggestions
    function renderSuggestions(dropdown, suggestions, query) {
        if (suggestions.length === 0) {
            dropdown.innerHTML = `
                <div style="padding: 16px; text-align: center; color: var(--gray-500);">
                    <i class="fas fa-search" style="font-size: 24px; margin-bottom: 8px; opacity: 0.5;"></i>
                    <p>No destinations found for "${query}"</p>
                </div>
            `;
            return;
        }

        dropdown.innerHTML = suggestions.map(item => `
            <div class="suggestion-item" data-destination="${item.name}" style="
                padding: 12px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background 0.2s ease;
                border-bottom: 1px solid var(--gray-100);
            " onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
                <span style="font-size: 24px;">${item.icon}</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: var(--gray-900);">${highlightMatch(item.name, query)}</div>
                    <div style="font-size: 13px; color: var(--gray-500);">${item.country} • ${item.category}</div>
                </div>
                <i class="fas fa-arrow-right" style="color: var(--gray-400); font-size: 14px;"></i>
            </div>
        `).join('');

        // Add click handlers
        dropdown.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const destination = item.dataset.destination;
                window.location.href = `destination-detail.html?destination=${destination.toLowerCase().replace(/\s+/g, '')}`;
            });
        });
    }

    // Highlight matching text
    function highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color); font-weight: 600;">$1</span>');
    }

    // Initialize search suggestions for an input
    function initSearchSuggestions(input) {
        if (!input || input.dataset.suggestionsInitialized) return;
        
        input.dataset.suggestionsInitialized = 'true';
        const dropdown = createSuggestionsDropdown(input);

        // Debounced search handler
        const handleSearch = debounce((e) => {
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            const suggestions = filterSuggestions(query);
            renderSuggestions(dropdown, suggestions, query);
            dropdown.style.display = 'block';
        }, 300);

        input.addEventListener('input', handleSearch);
        
        // Close dropdown on click outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        // Show dropdown on focus if there's a value
        input.addEventListener('focus', () => {
            if (input.value.trim().length >= 2) {
                const suggestions = filterSuggestions(input.value.trim());
                if (suggestions.length > 0) {
                    renderSuggestions(dropdown, suggestions, input.value.trim());
                    dropdown.style.display = 'block';
                }
            }
        });

        // Keyboard navigation
        input.addEventListener('keydown', (e) => {
            if (dropdown.style.display === 'none') return;
            
            const items = dropdown.querySelectorAll('.suggestion-item');
            const currentIndex = Array.from(items).findIndex(item => 
                item.style.background === 'var(--gray-100)'
            );

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % items.length;
                items.forEach(item => item.style.background = 'white');
                items[nextIndex].style.background = 'var(--gray-100)';
                items[nextIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                items.forEach(item => item.style.background = 'white');
                items[prevIndex].style.background = 'var(--gray-100)';
                items[prevIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                const selected = items[currentIndex];
                if (selected) {
                    e.preventDefault();
                    selected.click();
                }
            } else if (e.key === 'Escape') {
                dropdown.style.display = 'none';
            }
        });
    }

    // Auto-initialize all search inputs
    function initAll() {
        const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i], input[placeholder*="destination" i]');
        searchInputs.forEach(input => initSearchSuggestions(input));
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Re-initialize when new inputs are added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.tagName === 'INPUT') {
                        initSearchSuggestions(node);
                    } else if (node.querySelectorAll) {
                        const inputs = node.querySelectorAll('input[type="search"]');
                        inputs.forEach(input => initSearchSuggestions(input));
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Expose globally
    window.SearchSuggestions = {
        init: initSearchSuggestions,
        debounce: debounce
    };
})();
