// Main JavaScript for Hexa Grow Website

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Animate hero elements after preloader
        const heroElements = document.querySelectorAll('.hero-animate');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fade-in');
            }, index * 200);
        });
        
        // Initialize particles if on home page
        if (document.querySelector('.hero-particles')) {
            initParticles();
        }
    }, 1500);
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Testimonials slider
    initTestimonialsSlider();
    
    // Initialize AOS-like scroll animations
    initScrollAnimations();
    
    // Initialize service modals if on services page
    if (document.querySelector('.service-card')) {
        initServiceModals();
    }
    
    // Initialize portfolio filtering and modals if on portfolio page
    if (document.querySelector('.portfolio-grid')) {
        initPortfolioFilters();
        initPortfolioModals();
    }
});

// Initialize particles effect for hero section
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialsTrack = document.querySelector('.testimonials-track');
    
    if (!testimonialsTrack) return;
    
    const slides = document.querySelectorAll('.testimonial-slide');
    const slideWidth = slides[0].offsetWidth;
    const slideCount = slides.length;
    let currentIndex = 0;
    
    // Clone slides for infinite loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        testimonialsTrack.appendChild(clone);
    });
    
    // Set initial position
    testimonialsTrack.style.transform = `translateX(0)`;
    
    // Auto slide function
    function autoSlide() {
        currentIndex++;
        
        testimonialsTrack.style.transition = 'transform 0.5s ease-in-out';
        testimonialsTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Reset to first slide when reaching the end
        if (currentIndex >= slideCount) {
            setTimeout(() => {
                testimonialsTrack.style.transition = 'none';
                currentIndex = 0;
                testimonialsTrack.style.transform = `translateX(0)`;
            }, 500);
        }
    }
    
    // Start auto sliding
    const slideInterval = setInterval(autoSlide, 5000);
    
    // Pause on hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            setInterval(autoSlide, 5000);
        });
    }
}

// Initialize AOS-like scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize service modals
function initServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModals = document.querySelectorAll('.service-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open modal when clicking on service card
    serviceCards.forEach((card, index) => {
        const learnMoreBtn = card.querySelector('.btn-learn-more');
        
        if (learnMoreBtn && serviceModals[index]) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                serviceModals[index].classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close modal when clicking on close button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.service-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside of modal content
    serviceModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            serviceModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// Initialize portfolio filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set 'All' filter as active by default
    const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterButton) {
        allFilterButton.classList.add('active');
    }
}

// Initialize portfolio modals
function initPortfolioModals() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModals = document.querySelectorAll('.portfolio-modal');
    const modalCloseButtons = document.querySelectorAll('.portfolio-modal-close');
    
    // Open modal when clicking on portfolio item
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (portfolioModals[index]) {
                portfolioModals[index].classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking on close button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside of modal content
    portfolioModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            portfolioModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}