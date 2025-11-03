// Contact page functionality with cool animations
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
    initializeCoolAnimations();
});

function initializeContactPage() {
    initializeContactForm();
    initializeFAQ();
}

// ============================================================================
// COOL ANIMATIONS
// ============================================================================

function initializeCoolAnimations() {
    // Staggered fade-in for form elements
    animateFormElements();
    
    // Floating label animation
    initFloatingLabels();
    
    // Interactive input focus effects
    initInputAnimations();
    
    // FAQ accordion with smooth transitions
    enhanceFAQAnimations();
    
    // Parallax effect on scroll
    initParallaxEffect();
    
    // Mouse trail effect
    initMouseTrail();
    
    // Typing indicator animation
    initTypingIndicator();
    
    // Button ripple effect
    initButtonRipple();
    
    // Glowing border animation on form focus
    initGlowingBorders();
}

// Staggered fade-in animation for form elements
function animateFormElements() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Floating label animation
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        
        // Check if input has value on load
        if (input.value) {
            label.classList.add('floating');
        }
        
        input.addEventListener('focus', () => {
            label.classList.add('floating');
            label.style.transform = 'translateY(-8px) scale(0.9)';
            label.style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('floating');
                label.style.transform = 'translateY(0) scale(1)';
            }
            label.style.color = '';
        });
    });
}

// Interactive input animations
function initInputAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    inputs.forEach(input => {
        // Wave effect on focus
        input.addEventListener('focus', function() {
            this.style.animation = 'inputWave 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
        
        // Shake effect on error
        input.addEventListener('invalid', function() {
            this.style.animation = 'shake 0.4s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 400);
        });
        
        // Success pulse when filled
        input.addEventListener('blur', function() {
            if (this.value && this.checkValidity()) {
                this.style.animation = 'successPulse 0.6s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });
}

// Enhanced FAQ animations
function enhanceFAQAnimations() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        // Stagger animation on load
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
        
        // Hover effect with scale
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(10px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
}

// Parallax scroll effect
function initParallaxEffect() {
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (!heroContent || !heroParticles) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroContent.style.transform = `translateY(${rate}px)`;
        heroParticles.style.transform = `translateY(${rate * 0.3}px)`;
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trails = [];
    const maxTrails = 20;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        trails.push(trail);
        
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.remove();
            const index = trails.indexOf(trail);
            if (index > -1) trails.splice(index, 1);
        }, 1000);
    });
}

// Typing indicator for textarea
function initTypingIndicator() {
    const textarea = document.getElementById('message');
    if (!textarea) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    indicator.style.display = 'none';
    textarea.parentNode.appendChild(indicator);
    
    let typingTimer;
    
    textarea.addEventListener('input', function() {
        clearTimeout(typingTimer);
        indicator.style.display = 'flex';
        
        typingTimer = setTimeout(() => {
            indicator.style.display = 'none';
        }, 1000);
    });
}

// Button ripple effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.submit-btn, .btn-primary, .btn-hero');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Glowing border animation
function initGlowingBorders() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'glow-canvas';
    form.style.position = 'relative';
    form.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let hue = 0;
    
    function resize() {
        canvas.width = form.offsetWidth;
        canvas.height = form.offsetHeight;
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hue += 0.5;
        if (hue > 360) hue = 0;
        
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.3)`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${hue}, 70%, 60%, 0.5)`;
        
        // Draw animated border
        const time = Date.now() / 1000;
        const offset = Math.sin(time) * 5;
        
        ctx.strokeRect(offset, offset, canvas.width - offset * 2, canvas.height - offset * 2);
        
        requestAnimationFrame(animate);
    }
    
    resize();
    window.addEventListener('resize', resize);
    animate();
}

// ============================================================================

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

// Handle form submission
function handleFormSubmission() {
    // Validate form first
    if (!validateForm()) {
        return;
    }
    
    const formData = new FormData(document.getElementById('contactForm'));
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showFormSuccess();
        
        // Reset form
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
    }, 2000);
}

// Show form success message with celebration animation
function showFormSuccess() {
    const form = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            padding: 1.5rem;
            border-radius: 16px;
            margin-bottom: 1.5rem;
            border: 2px solid #10b981;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        ">
            <i class="fas fa-check-circle" style="font-size: 2rem; animation: successIconSpin 0.6s ease-out;"></i>
            <div>
                <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Message Sent Successfully! 🎉</strong>
                <span>Thank you for reaching out! We'll get back to you within 24 hours.</span>
            </div>
        </div>
    `;
    
    // Add success icon animation
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes successIconSpin {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
    `;
    document.head.appendChild(iconStyle);
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Create celebration confetti
    createConfetti();
    
    // Remove success message after 6 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => successMessage.remove(), 500);
    }, 6000);
}

// Confetti celebration animation with emojis
function createConfetti() {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const emojis = ['🎉', '✨', '🎊', '⭐', '💫'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Mix of colored confetti and emojis
        if (Math.random() > 0.5) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: fixed;
                font-size: 24px;
                left: ${Math.random() * 100}%;
                top: -30px;
                opacity: 1;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
        } else {
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 1;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
        }
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
    
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                top: -10px;
                transform: rotate(0deg) translateX(0);
            }
            100% {
                top: 100vh;
                transform: rotate(720deg) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}

// Initialize FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Form validation
function validateForm() {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        if (!value) {
            field.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add error styling to CSS with cool animations
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        animation: shake 0.4s ease-in-out;
    }
    
    .success-message {
        animation: slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Cool animation keyframes */
    @keyframes slideInBounce {
        0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
        }
        50% {
            transform: translateY(10px) scale(1.05);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes inputWave {
        0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
        100% { box-shadow: 0 0 0 20px rgba(37, 99, 235, 0); }
    }
    
    @keyframes successPulse {
        0%, 100% { border-color: #10b981; }
        50% { 
            border-color: #10b981; 
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
            transform: scale(1.02);
        }
    }
    
    /* Mouse trail */
    .mouse-trail {
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(37, 99, 235, 0) 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: trailFade 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes trailFade {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    /* Typing indicator */
    .typing-indicator {
        display: flex;
        gap: 4px;
        margin-top: 8px;
        align-items: center;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: typingBounce 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
    }
    
    /* Ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Glow canvas */
    .glow-canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 1;
        border-radius: 20px;
    }
    
    /* Enhanced button hover */
    .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .submit-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .submit-btn:hover::before {
        width: 300px;
        height: 300px;
    }
    
    /* FAQ enhanced animations */
    .faq-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-item.active {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(37, 99, 235, 0.2);
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                    padding 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.3s ease;
        opacity: 0;
    }
    
    .faq-item.active .faq-answer {
        max-height: 500px;
        opacity: 1;
        padding: 1.5rem;
    }
    
    .faq-toggle {
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .faq-item.active .faq-toggle {
        transform: rotate(180deg);
    }
    
    /* Floating label styles */
    .form-label {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: left center;
    }
    
    .form-label.floating {
        transform: translateY(-8px) scale(0.9);
        color: var(--primary-color);
    }
    
    /* Form group animations */
    .form-group {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Hero features animation */
    .hero-feature {
        animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    }
    
    .hero-feature:nth-child(1) { animation-delay: 0.1s; }
    .hero-feature:nth-child(2) { animation-delay: 0.2s; }
    .hero-feature:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    /* Enhanced hover effects */
    .form-input:hover,
    .form-textarea:hover,
    .form-select:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
    }
    
    /* Character counter animation */
    .character-counter {
        animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});

// Character counter for message field
function addCharacterCounter() {
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.9rem;
            color: #666;
            margin-top: 0.5rem;
        `;
        
        const updateCounter = () => {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#dc3545' : '#666';
        };
        
        messageField.setAttribute('maxlength', maxLength);
        messageField.parentNode.appendChild(counter);
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', addCharacterCounter);
