/**
 * Footer Component Loader
 * Dynamically loads the footer component across all pages
 */

// Load footer component on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});

/**
 * Load footer component from external file
 */
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const footerHTML = await response.text();
        
        // Insert footer at the end of body (before closing body tag)
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Initialize footer functionality
        initializeFooter();
        
        console.log('✅ Footer component loaded successfully');
        
    } catch (error) {
        console.error('Error loading footer:', error);
        // Fallback: create a simple footer
        createFallbackFooter();
    }
}

/**
 * Initialize footer functionality after loading
 */
function initializeFooter() {
    // Add smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add current year to copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-credits p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add footer reveal animation
    const footer = document.querySelector('.footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('footer-revealed');
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(footer);
    }
}

/**
 * Create fallback footer if loading fails
 */
function createFallbackFooter() {
    const fallbackFooterHTML = `
        <footer class="footer" style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 3rem 2rem 1rem; text-align: center;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <div style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">🌍 Exploora</h3>
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Discover the world with Exploora</p>
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
                        <a href="index.html" style="color: rgba(255,255,255,0.8); text-decoration: none;">Home</a>
                        <a href="destinations.html" style="color: rgba(255,255,255,0.8); text-decoration: none;">Destinations</a>
                        <a href="blog.html" style="color: rgba(255,255,255,0.8); text-decoration: none;">Blog</a>
                        <a href="about.html" style="color: rgba(255,255,255,0.8); text-decoration: none;">About</a>
                        <a href="contact.html" style="color: rgba(255,255,255,0.8); text-decoration: none;">Contact</a>
                    </div>
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 1rem;">
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                        &copy; ${new Date().getFullYear()} Exploora. Made with ❤️ by <strong>Shrinivas Mudabe</strong>
                    </p>
                </div>
            </div>
        </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fallbackFooterHTML);
    console.log('🔄 Fallback footer loaded');
}

// Export functions for use in other modules
window.loadFooter = loadFooter;
window.initializeFooter = initializeFooter;