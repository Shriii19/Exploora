// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogPage();
    initializeBlogAnimations();
});

// ============================================================================
// BLOG PAGE COOL ANIMATIONS
// ============================================================================

function initializeBlogAnimations() {
    // Staggered fade-in for blog cards
    animateBlogCards();
    
    // Category filter animation
    animateCategoryFilters();
    
    // Search bar focus animation
    animateSearchBar();
    
    // Featured post highlight animation
    animateFeaturedPost();
    
    // Read more button effects
    animateReadMoreButtons();
    
    // Author avatar hover
    animateAuthorAvatars();
    
    // Tag hover effects
    animateTagElements();
    
    // Image lazy load with blur-up
    animateBlogImages();
    
    // Sidebar widgets animation
    animateSidebarWidgets();
}

// Staggered animation for blog cards
function animateBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card, .article-card');
    
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-15deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0deg)';
        }, 100 * index);
        
        // 3D tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Animate category filters
function animateCategoryFilters() {
    const filters = document.querySelectorAll('.category-filter, .filter-btn');
    
    filters.forEach((filter, index) => {
        filter.style.opacity = '0';
        filter.style.transform = 'scale(0) rotate(-180deg)';
        
        setTimeout(() => {
            filter.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            filter.style.opacity = '1';
            filter.style.transform = 'scale(1) rotate(0deg)';
        }, 50 * index);
        
        // Click animation
        filter.addEventListener('click', function() {
            this.style.animation = 'tada 0.8s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 800);
        });
        
        // Hover effect
        filter.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        filter.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Search bar animation
function animateSearchBar() {
    const searchBar = document.querySelector('.blog-search, #blog-search');
    if (!searchBar) return;
    
    searchBar.addEventListener('focus', function() {
        this.style.animation = 'inputWave 0.5s ease-out';
        this.parentElement.style.transform = 'scale(1.05)';
        this.parentElement.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
    });
    
    searchBar.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
        this.parentElement.style.boxShadow = '';
    });
    
    // Typing animation
    let typingTimer;
    searchBar.addEventListener('input', function() {
        clearTimeout(typingTimer);
        this.parentElement.style.animation = 'pulse 0.3s ease';
        
        typingTimer = setTimeout(() => {
            this.parentElement.style.animation = '';
        }, 300);
    });
}

// Featured post animation
function animateFeaturedPost() {
    const featuredPost = document.querySelector('.featured-article, .featured-post');
    if (!featuredPost) return;
    
    featuredPost.style.opacity = '0';
    featuredPost.style.transform = 'scale(0.9) rotateY(-20deg)';
    
    setTimeout(() => {
        featuredPost.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        featuredPost.style.opacity = '1';
        featuredPost.style.transform = 'scale(1) rotateY(0deg)';
    }, 300);
    
    // Hover effect with gradient shift
    featuredPost.addEventListener('mouseenter', function() {
        this.style.animation = 'gradientShift 3s ease infinite';
    });
    
    featuredPost.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
}

// Read more button animations
function animateReadMoreButtons() {
    const readMoreBtns = document.querySelectorAll('.read-more, .btn-read-more');
    
    readMoreBtns.forEach(btn => {
        // Magnetic effect
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
        
        // Click ripple
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
            `;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Author avatar animations
function animateAuthorAvatars() {
    const avatars = document.querySelectorAll('.author-avatar, .article-author img');
    
    avatars.forEach(avatar => {
        avatar.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            this.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.5)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    });
}

// Tag animations
function animateTagElements() {
    const tags = document.querySelectorAll('.tag, .article-tag');
    
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.3s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 30 * index);
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.animation = 'jello 0.6s ease-in-out';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.animation = '';
        });
    });
}

// Blog image animations with blur-up effect
function animateBlogImages() {
    const images = document.querySelectorAll('.blog-card img, .article-image img');
    
    images.forEach(img => {
        img.style.filter = 'blur(10px)';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        img.addEventListener('load', function() {
            this.style.filter = 'blur(0)';
            this.style.transform = 'scale(1)';
        });
        
        // Zoom effect on hover
        img.parentElement.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.15) rotate(2deg)';
        });
        
        img.parentElement.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Sidebar widgets animation
function animateSidebarWidgets() {
    const widgets = document.querySelectorAll('.sidebar-widget, .widget');
    
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            widget.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            widget.style.opacity = '1';
            widget.style.transform = 'translateX(0)';
        }, 100 * index);
        
        widget.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.2)';
        });
        
        widget.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// ============================================================================

// Blog articles data
const blogArticles = [
    {
        id: 1,
        title: "Morocco Travel Guide: From Marrakech to the Sahara",
        excerpt: "Experience the magic of Morocco with our comprehensive guide covering the best souks, desert adventures, and cultural experiences.",
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=600&h=400&fit=crop",
        author: "Sarah Johnson",
        date: "2025-09-20",
        readTime: "5 min read",
        category: "guides",
        tags: ["Morocco", "Desert", "Culture"]
    },
    {
        id: 2,
        title: "Smart Packing: Essential Items for Every Traveler",
        excerpt: "Discover the must-have items and clever packing hacks that will transform your travel experience and save space in your luggage.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
        author: "Mike Chen",
        date: "2025-09-18",
        readTime: "3 min read",
        category: "tips",
        tags: ["Packing", "Tips", "Travel Gear"]
    },
    {
        id: 3,
        title: "A Culinary Journey Through Italy: Beyond Pizza and Pasta",
        excerpt: "Explore Italy's diverse regional cuisines and discover hidden culinary gems that locals cherish but tourists often miss.",
        image: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=600&h=400&fit=crop",
        author: "Marco Rossi",
        date: "2025-09-16",
        readTime: "7 min read",
        category: "culture",
        tags: ["Italy", "Food", "Culture"]
    },
    {
        id: 4,
        title: "Hiking New Zealand: Top Trails for Every Skill Level",
        excerpt: "From beginner-friendly walks to challenging multi-day treks, discover New Zealand's most spectacular hiking trails and what to expect.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
        author: "Emma Walsh",
        date: "2025-09-14",
        readTime: "6 min read",
        category: "adventure",
        tags: ["New Zealand", "Hiking", "Adventure"]
    },
    {
        id: 5,
        title: "Iceland's Ring Road: Complete Planning Guide",
        excerpt: "Plan the perfect Ring Road adventure with our detailed guide covering routes, accommodations, and must-see attractions around Iceland.",
        image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
        author: "Lars Andersen",
        date: "2025-09-12",
        readTime: "8 min read",
        category: "guides",
        tags: ["Iceland", "Road Trip", "Planning"]
    },
    {
        id: 6,
        title: "Photographing the Northern Lights: Camera Settings & Tips",
        excerpt: "Master the art of aurora photography with our expert guide to camera settings, locations, and timing for capturing the northern lights.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
        author: "Anna Petrov",
        date: "2025-09-10",
        readTime: "4 min read",
        category: "photography",
        tags: ["Photography", "Northern Lights", "Technique"]
    },
    {
        id: 7,
        title: "Budget Travel Secrets: See More, Spend Less",
        excerpt: "Discover insider strategies for affordable travel without compromising on experiences. Learn how to stretch your budget further.",
        image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&h=400&fit=crop",
        author: "David Kim",
        date: "2025-09-08",
        readTime: "5 min read",
        category: "tips",
        tags: ["Budget Travel", "Money Saving", "Tips"]
    },
    {
        id: 8,
        title: "Japanese Temple Etiquette: A Respectful Visitor's Guide",
        excerpt: "Learn the essential customs and etiquette for visiting Japanese temples and shrines to show proper respect and enhance your experience.",
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
        author: "Keiko Nakamura",
        date: "2025-09-06",
        readTime: "6 min read",
        category: "culture",
        tags: ["Japan", "Culture", "Temples"]
    },
    {
        id: 9,
        title: "Maldives Diving Guide: Best Spots for Underwater Adventures",
        excerpt: "Explore the world's most pristine diving locations in the Maldives, from coral gardens to thrilling encounters with marine life.",
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=600&h=400&fit=crop",
        author: "Ahmed Hassan",
        date: "2025-09-04",
        readTime: "7 min read",
        category: "adventure",
        tags: ["Maldives", "Diving", "Marine Life"]
    },
    {
        id: 10,
        title: "The Ultimate Guide to Tokyo: Hidden Gems & Local Secrets",
        excerpt: "Discover the authentic side of Tokyo beyond the tourist trails. From secret ramen shops to hidden temples, explore the city like a local.",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
        author: "Yuki Tanaka",
        date: "2025-09-15",
        readTime: "8 min read",
        category: "guides",
        tags: ["Tokyo", "Hidden Gems", "Local Culture"]
    },
    {
        id: 11,
        title: "Capturing the Perfect Mountain Sunrise: A Photographer's Guide",
        excerpt: "Learn the techniques and equipment needed to capture breathtaking mountain sunrises that will leave your audience in awe.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        author: "Alex Rodriguez",
        date: "2025-09-12",
        readTime: "6 min read",
        category: "photography",
        tags: ["Photography", "Mountains", "Sunrise"]
    },
    {
        id: 12,
        title: "Digital Nomad Guide: Working from Thailand",
        excerpt: "Everything you need to know about living and working remotely in Thailand, from visa requirements to co-working spaces.",
        image: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=600&h=400&fit=crop",
        author: "Ryan Mitchell",
        date: "2025-09-02",
        readTime: "15 min read",
        category: "tips",
        tags: ["Digital Nomad", "Thailand", "Remote Work"]
    }
];

let filteredArticles = [...blogArticles];
let displayedArticles = 6; // Number of articles to show initially

function initializeBlogPage() {
    setupCategoryFilters();
    setupBlogSearch();
    setupNewsletterForm();
    setupDestinationTags();
    setupAuthorCards();
    renderArticles();
    updateArticlesCount();
    setupLoadMore();
    initializeScrollAnimations();
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
        const newCards = articlesGrid.querySelectorAll('.blog-article:not(.animated)');
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
    card.className = 'blog-article';
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
            <div class="reading-time">${article.readTime.replace(' read', '')}</div>
        </div>
        <div class="article-content">
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="article-meta">
                <div class="author-info">
                    <div class="author-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="author-name">${article.author}</span>
                </div>
                <span class="publish-date">${formattedDate}</span>
            </div>
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
        const lastCard = document.querySelector('.blog-article:last-child');
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

// Setup destination tags functionality
function setupDestinationTags() {
    const destinationTags = document.querySelectorAll('.destination-tag');
    
    destinationTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.dataset.destination;
            
            // Search for articles related to this destination
            const searchInput = document.getElementById('blogSearchInput');
            if (searchInput) {
                searchInput.value = destination;
                performBlogSearch();
                
                // Scroll to articles section
                const articlesSection = document.querySelector('.blog-articles');
                if (articlesSection) {
                    articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
        
        // Add hover effect
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
}

// Setup author cards functionality
function setupAuthorCards() {
    const authorCards = document.querySelectorAll('.author-card');
    
    authorCards.forEach(card => {
        // Add click functionality to view author articles
        card.addEventListener('click', function() {
            const authorName = this.querySelector('h3').textContent;
            
            // Search for articles by this author
            const searchInput = document.getElementById('blogSearchInput');
            if (searchInput) {
                searchInput.value = authorName;
                performBlogSearch();
                
                // Scroll to articles section
                const articlesSection = document.querySelector('.blog-articles');
                if (articlesSection) {
                    articlesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.content-section, .featured-article, .author-card, .resource-category');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced article filtering with multiple criteria
function advancedFilter(searchTerm, category, author) {
    let filtered = [...blogArticles];
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    
    // Filter by category
    if (category && category !== 'all') {
        filtered = filtered.filter(article => article.category === category);
    }
    
    // Filter by author
    if (author) {
        filtered = filtered.filter(article => 
            article.author.toLowerCase().includes(author.toLowerCase())
        );
    }
    
    return filtered;
}

// Social sharing functionality
function shareArticle(articleId, platform) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(article.excerpt);
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Enhanced newsletter form with validation
function handleNewsletterSignup() {
    const form = document.getElementById('newsletterForm');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address.');
        return;
    }
    
    // Check for common email providers
    const commonProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1];
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNewsletterSuccess();
        
        // Clear form
        emailInput.value = '';
        
        // Add to local storage (for demo purposes)
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        }
    }, 2000);
}

// Show form error
function showFormError(message) {
    const form = document.getElementById('newsletterForm');
    let errorElement = form.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        form.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.parentNode.removeChild(errorElement);
        }
    }, 5000);
}

// Add CSS styles for new functionality
const blogStyles = document.createElement('style');
blogStyles.textContent = `
    .content-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .content-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .author-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .destination-tag {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .error-message {
        background: #fee;
        color: #c33;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #fcc;
    }
    
    .success-message {
        background: #efe;
        color: #363;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #cfc;
    }
    
    .article-card {
        transition: all 0.3s ease;
    }
    
    .article-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .no-articles {
        text-align: center;
        padding: 40px 20px;
        color: #666;
    }
    
    .no-articles i {
        font-size: 48px;
        margin-bottom: 20px;
        opacity: 0.5;
    }
`;
document.head.appendChild(blogStyles);