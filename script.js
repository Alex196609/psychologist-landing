// DOM Elements
const ctaButton = document.querySelector('.cta-button');
const elementsToAnimate = [
    document.querySelector('.subtitle'),
    document.querySelector('.main-heading'),
    document.querySelector('.description'),
    document.querySelector('.cta-button'),
    ...document.querySelectorAll('.stat-item'),
    document.querySelector('.mission-heading'),
    document.querySelector('.mission-text')
];

// Initialize page animations
function initAnimations() {
    elementsToAnimate.forEach((element, index) => {
        if (element) {
            // Add staggered delay for each element
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 100);
        }
    });
}

// Handle CTA button click
function handleCtaClick(e) {
    e.preventDefault();
    
    // Button press animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    
    // Show download modal/redirect (simulated)
    showDownloadModal();
}

// Show download modal (simulated)
function showDownloadModal() {
    // In a real project, this would be a redirect to Gumroad
    // For demo purposes, we'll show an alert
    
    const modalHtml = `
        <div class="download-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: #7c3aed; margin-bottom: 20px; font-size: 24px;">
                    <i class="fas fa-download"></i> Download Template
                </h3>
                <p style="margin-bottom: 30px; color: #666; line-height: 1.6;">
                    You are being redirected to Gumroad to download the FREE Startup Landing Page Template.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="window.location.href='https://gumroad.com/l/startup-landing-template'" 
                            style="
                                background: #7c3aed;
                                color: white;
                                border: none;
                                padding: 12px 30px;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: background 0.3s;
                            "
                            onmouseover="this.style.background='#5b21b6'"
                            onmouseout="this.style.background='#7c3aed'">
                        Continue to Gumroad
                    </button>
                    <button onclick="document.querySelector('.download-modal').remove()" 
                            style="
                                background: #f1f5f9;
                                color: #64748b;
                                border: none;
                                padding: 12px 30px;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: background 0.3s;
                            "
                            onmouseover="this.style.background='#e2e8f0'"
                            onmouseout="this.style.background='#f1f5f9'">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Create modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);
    
    // Close modal on background click
    modalContainer.firstElementChild.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Add scroll animation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    elementsToAnimate.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add event listener to CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCtaClick);
    }
    
    // Add animation to social proof logos
    const companyLogos = document.querySelectorAll('.company-logo');
    companyLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
});

// Add keyboard support for accessibility
document.addEventListener('keydown', function(e) {
    // Close modal on ESC key
    if (e.key === 'Escape') {
        const modal = document.querySelector('.download-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Trigger CTA button on Enter when focused
    if (e.key === 'Enter' && document.activeElement === ctaButton) {
        ctaButton.click();
    }
});