// Advanced Anime.js Animations for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Landing page animation sequence
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const socialLinks = document.querySelectorAll('.social-links a');
    const heroContent = document.querySelector('.hero-content');
    
    // Create a timeline for the landing page animation
    const landingTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
        autoplay: true
    });
    
    // Add glitch effect to the title
    landingTimeline.add({
        targets: heroTitle,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: function() {
            // Add glitch effect after the title appears
            const glitchTimeline = anime.timeline({
                easing: 'easeOutExpo',
                duration: 100,
                loop: 2
            });
            
            glitchTimeline.add({
                targets: heroTitle,
                translateX: [0, 10, 0, -10, 0],
                duration: 100
            }).add({
                targets: heroTitle,
                translateX: [0, -10, 0, 10, 0],
                duration: 100
            });
        }
    });
    
    // Animate subtitle with a different effect
    landingTimeline.add({
        targets: heroSubtitle,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    }, '-=500');
    
    // Animate social links with a unique effect
    landingTimeline.add({
        targets: socialLinks,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.5, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .5)'
    }, '-=400');
    
    // Add a particle effect to the hero section
    createParticles();
    
    // Add a magnetic effect to buttons
    initMagneticButtons();
    
    // Add a text scramble effect to the portfolio titles
    addTextScrambleEffect();
    
    // Add a parallax effect to the about section
    addParallaxEffect();
    
    // Add a 3D tilt effect to portfolio items
    initPortfolioAnimations();
    
    // Add a cursor trail effect
    createCursorTrail();
    
    // Add a scroll-triggered animation for sections
    addScrollTriggeredAnimations();
});

// Particle Animation
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        container.appendChild(particle);

        anime({
            targets: particle,
            translateX: anime.random(-window.innerWidth, window.innerWidth),
            translateY: anime.random(-window.innerHeight, window.innerHeight),
            scale: anime.random(0.5, 2),
            opacity: anime.random(0.2, 0.8),
            duration: anime.random(3000, 5000),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad'
        });
    }
}

// Cursor Trail Effect
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
    });
}

// Portfolio Item Hover Animation
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                scale: 1.05,
                rotateY: 10,
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                scale: 1,
                rotateY: 0,
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
}

// Button Magnetic Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            anime({
                targets: button,
                translateX: (x - rect.width / 2) * 0.2,
                translateY: (y - rect.height / 2) * 0.2,
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                translateX: 0,
                translateY: 0,
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
}

// Hero Section Landing Animation
function initHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const elements = heroContent.children;

    anime({
        targets: elements,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .5)'
    });
}

// Loading Animation
function initLoadingAnimation() {
    const loadingText = document.querySelector('.loading-text');
    
    anime({
        targets: loadingText,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
            loadingText.classList.add('glitch');
        }
    });
}

// Add a text scramble effect to portfolio titles
function addTextScrambleEffect() {
    const portfolioTitles = document.querySelectorAll('.portfolio-overlay h3');
    
    portfolioTitles.forEach(title => {
        const originalText = title.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#';
        
        title.addEventListener('mouseenter', function() {
            let iterations = 0;
            const maxIterations = 10;
            
            const interval = setInterval(() => {
                title.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1/3;
            }, 30);
        });
    });
}

// Add a parallax effect to the about section
function addParallaxEffect() {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.image-frame');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutSection && aboutImage && aboutContent) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const aboutPosition = aboutSection.offsetTop;
            const aboutHeight = aboutSection.offsetHeight;
            
            if (scrollPosition > aboutPosition - window.innerHeight && 
                scrollPosition < aboutPosition + aboutHeight) {
                
                const progress = (scrollPosition - (aboutPosition - window.innerHeight)) / (aboutHeight + window.innerHeight);
                
                anime({
                    targets: aboutImage,
                    translateX: progress * -50,
                    translateY: progress * 30,
                    rotate: progress * -5,
                    duration: 0
                });
                
                anime({
                    targets: aboutContent,
                    translateX: progress * 50,
                    duration: 0
                });
            }
        });
    }
}

// Add a 3D tilt effect to portfolio items
function addTiltEffect() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            anime({
                targets: this,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Add a scroll-triggered animation for sections
function addScrollTriggeredAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                if (section.id === 'home') {
                    // Hero section animation
                    anime({
                        targets: '.hero-content',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                } else if (section.id === 'work') {
                    // Portfolio section animation
                    anime({
                        targets: '.portfolio-item',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        delay: anime.stagger(100),
                        easing: 'easeOutExpo'
                    });
                } else if (section.id === 'about') {
                    // About section animation
                    anime({
                        targets: '.about-content',
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    
                    anime({
                        targets: '.image-frame',
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 1000,
                        easing: 'easeOutElastic(1, .5)'
                    });
                } else if (section.id === 'contact') {
                    // Contact section animation
                    anime({
                        targets: '.contact-form',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
                
                // Stop observing after animation
                sectionObserver.unobserve(section);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
} 