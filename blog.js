// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogPage();
});

// Blog articles data
const blogArticles = [
    {
        id: 1,
        title: "10 Hidden Gems in Southeast Asia You've Never Heard Of",
        excerpt: "Discover remote islands, ancient temples, and pristine beaches away from the tourist crowds in these lesser-known Southeast Asian destinations.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop",
        author: "Sarah Chen",
        date: "2025-09-18",
        readTime: "7 min read",
        category: "guides",
        tags: ["Southeast Asia", "Hidden Gems", "Adventure"]
    },
    {
        id: 2,
        title: "Budget Travel: How to See Europe for Under $50 a Day",
        excerpt: "Complete guide to backpacking through Europe on a shoestring budget, including accommodation, food, and transportation tips.",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
        author: "Mike Johnson",
        date: "2025-09-16",
        readTime: "10 min read",
        category: "tips",
        tags: ["Budget Travel", "Europe", "Backpacking"]
    },
    {
        id: 3,
        title: "Street Food Adventures: Bangkok's Best Local Eats",
        excerpt: "Navigate Bangkok's incredible street food scene like a pro with this comprehensive guide to the city's most delicious local dishes.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        author: "Lila Patel",
        date: "2025-09-14",
        readTime: "6 min read",
        category: "culture",
        tags: ["Bangkok", "Street Food", "Culture"]
    },
    {
        id: 4,
        title: "Hiking the Inca Trail: Everything You Need to Know",
        excerpt: "Complete preparation guide for one of the world's most famous treks, including permits, packing lists, and training tips.",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop",
        author: "Carlos Rivera",
        date: "2025-09-12",
        readTime: "12 min read",
        category: "adventure",
        tags: ["Peru", "Hiking", "Machu Picchu"]
    },
    {
        id: 5,
        title: "Golden Hour Photography: Capturing Cities at Sunset",
        excerpt: "Master the art of urban photography during golden hour with these professional tips and camera settings.",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
        author: "Emma Thompson",
        date: "2025-09-10",
        readTime: "8 min read",
        category: "photography",
        tags: ["Photography", "Golden Hour", "Cities"]
    },
    {
        id: 6,
        title: "Solo Female Travel: Safety Tips and Empowering Destinations",
        excerpt: "Comprehensive guide for women traveling alone, featuring the safest destinations and practical safety advice.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
        author: "Jessica Williams",
        date: "2025-09-08",
        readTime: "9 min read",
        category: "tips",
        tags: ["Solo Travel", "Women", "Safety"]
    },
    {
        id: 7,
        title: "Island Hopping in Greece: The Ultimate Cyclades Adventure",
        excerpt: "Plan the perfect Greek island adventure with ferry schedules, accommodation tips, and must-see destinations.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop",
        author: "Andreas Kostas",
        date: "2025-09-06",
        readTime: "11 min read",
        category: "guides",
        tags: ["Greece", "Islands", "Mediterranean"]
    },
    {
        id: 8,
        title: "Digital Nomad Guide: Working from Bali",
        excerpt: "Everything you need to know about living and working remotely in Bali, from visa requirements to co-working spaces.",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop",
        author: "Ryan Mitchell",
        date: "2025-09-04",
        readTime: "15 min read",
        category: "tips",
        tags: ["Digital Nomad", "Bali", "Remote Work"]
    }
];

let filteredArticles = [...blogArticles];
let displayedArticles = 6; // Number of articles to show initially

function initializeBlogPage() {
    setupCategoryFilters();
    setupBlogSearch();
    setupNewsletterForm();
    renderArticles();
    updateArticlesCount();
    setupLoadMore();
}

// Setup category filters
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter articles
            const category = this.getAttribute('data-category');
            filterArticlesByCategory(category);
        });
    });
}

// Filter articles by category
function filterArticlesByCategory(category) {
    if (category === 'all') {
        filteredArticles = [...blogArticles];
    } else {
        filteredArticles = blogArticles.filter(article => article.category === category);
    }
    
    displayedArticles = 6; // Reset displayed count
    renderArticles();
    updateArticlesCount();
    
    // Show/hide load more button
    updateLoadMoreButton();
}

// Setup blog search
function setupBlogSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    const searchBtn = document.getElementById('blogSearchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performBlogSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performBlogSearch();
            }
        });
        
        // Real-time search
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2 || this.value.length === 0) {
                performBlogSearch();
            }
        });
    }
}

// Perform blog search
function performBlogSearch() {
    const searchTerm = document.getElementById('blogSearchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredArticles = [...blogArticles];
    } else {
        filteredArticles = blogArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.author.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    displayedArticles = 6; // Reset displayed count
    renderArticles();
    updateArticlesCount();
    updateLoadMoreButton();
}

// Render articles
function renderArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    // Get articles to display
    const articlesToShow = filteredArticles.slice(0, displayedArticles);
    
    articlesGrid.innerHTML = '';
    
    if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-articles">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    articlesToShow.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
    
    // Add scroll animation
    setTimeout(() => {
        const newCards = articlesGrid.querySelectorAll('.article-card:not(.animated)');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        });
    }, 100);
}

// Create article card
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.setAttribute('data-category', article.category);
    
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const categoryLabel = getCategoryLabel(article.category);
    
    card.innerHTML = `
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <div class="article-category">${categoryLabel}</div>
        </div>
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="article-meta">
                <span class="author">
                    <i class="fas fa-user"></i>
                    ${article.author}
                </span>
                <span class="date">
                    <i class="fas fa-calendar"></i>
                    ${formattedDate}
                </span>
                <span class="read-time">
                    <i class="fas fa-clock"></i>
                    ${article.readTime}
                </span>
            </div>
            <button class="read-more-btn" onclick="readArticle(${article.id})">
                Read Article
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'guides': 'Travel Guide',
        'tips': 'Travel Tips',
        'culture': 'Culture & Food',
        'adventure': 'Adventure',
        'photography': 'Photography'
    };
    return labels[category] || category;
}

// Update articles count
function updateArticlesCount() {
    const countElement = document.getElementById('articlesCount');
    if (countElement) {
        const total = filteredArticles.length;
        const showing = Math.min(displayedArticles, total);
        countElement.textContent = `Showing ${showing} of ${total} articles`;
    }
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }
    updateLoadMoreButton();
}

// Load more articles
function loadMoreArticles() {
    displayedArticles += 6;
    renderArticles();
    updateArticlesCount();
    updateLoadMoreButton();
    
    // Smooth scroll to new content
    setTimeout(() => {
        const lastCard = document.querySelector('.article-card:last-child');
        if (lastCard) {
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
}

// Update load more button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (displayedArticles >= filteredArticles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });
    }
}

// Handle newsletter signup
function handleNewsletterSignup() {
    const form = document.getElementById('newsletterForm');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNewsletterSuccess();
        
        // Clear form
        emailInput.value = '';
    }, 2000);
}

// Show newsletter success message
function showNewsletterSuccess() {
    const form = document.getElementById('newsletterForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thanks for subscribing! Check your email to confirm.</span>
    `;
    
    form.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 5000);
}

// Read article function (placeholder)
function readArticle(articleId) {
    // In a real application, this would navigate to the full article
    console.log(`Reading article ${articleId}`);
    
    // For demo purposes, show an alert
    const article = blogArticles.find(a => a.id === articleId);
    if (article) {
        alert(`Opening article: "${article.title}"\n\nIn a real application, this would open the full article page.`);
    }
}

// Search functionality for trending items (if needed)
function searchBlogFromTrending(destination) {
    const searchInput = document.getElementById('blogSearchInput');
    if (searchInput) {
        searchInput.value = destination;
        performBlogSearch();
        
        // Scroll to articles
        const articlesSection = document.querySelector('.blog-articles');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}