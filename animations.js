// Anime.js Animations for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const socialLinks = document.querySelectorAll('.social-links a');
    
    // Animate hero title with glitch effect
    anime({
        targets: heroTitle,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 300
    });
    
    // Animate subtitle
    anime({
        targets: heroSubtitle,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 600
    });
    
    // Animate social links with stagger effect
    anime({
        targets: socialLinks,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 900}),
        easing: 'easeOutElastic(1, .5)'
    });
    
    // Portfolio item animations
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Create intersection observer for portfolio items
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate portfolio item when it comes into view
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                
                // Animate the overlay elements
                const overlay = entry.target.querySelector('.portfolio-overlay');
                const title = entry.target.querySelector('.portfolio-overlay h3');
                const description = entry.target.querySelector('.portfolio-overlay p');
                const category = entry.target.querySelector('.portfolio-overlay .category');
                
                anime({
                    targets: [title, description, category],
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
                
                // Stop observing after animation
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all portfolio items
    portfolioItems.forEach(item => {
        portfolioObserver.observe(item);
    });
    
    // About section animations
    const aboutImage = document.querySelector('.image-frame');
    const aboutContent = document.querySelector('.about-content');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create intersection observer for about section
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate about image
                anime({
                    targets: aboutImage,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .5)'
                });
                
                // Animate about content
                anime({
                    targets: aboutContent,
                    opacity: [0, 1],
                    translateX: [50, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                
                // Animate skill bars
                anime({
                    targets: skillBars,
                    width: [0, anime.get(skillBars, 'width')],
                    duration: 1500,
                    delay: anime.stagger(200),
                    easing: 'easeOutExpo'
                });
                
                // Stop observing after animation
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Contact form animations
    const contactForm = document.querySelector('.contact-form');
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    // Create intersection observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate contact form
                anime({
                    targets: contactForm,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                
                // Animate form inputs with stagger
                anime({
                    targets: contactInputs,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
                
                // Stop observing after animation
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe contact section
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    // Smooth scroll animation for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                // Easing function
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Add hover animations to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            
            anime({
                targets: overlay,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: this.querySelector('img, video'),
                scale: 1.05,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            
            anime({
                targets: overlay,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: this.querySelector('img, video'),
                scale: 1,
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
}); 