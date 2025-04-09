// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Optimize scroll handling with throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize navbar visibility on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('visible');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('visible')) {
        navbar.classList.add('visible');
    }
    
    lastScroll = currentScroll;
});

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('canvas-container');

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create particles with more complexity
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
    colorArray[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Mouse interaction with particles
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation with mouse interaction
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    // Mouse interaction effect
    particlesMesh.position.x += (mouseX * 0.1 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (mouseY * 0.1 - particlesMesh.position.y) * 0.05;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Portfolio items data
const portfolioItems = [
    {
        title: "Project 1",
        image: "images/1.png",
        description: "A creative design project showcasing innovative concepts.",
        category: "Graphic Design"
    },
    {
        title: "Project 2",
        image: "images/2.png",
        description: "Visual identity design for a modern brand.",
        category: "Branding"
    },
    {
        title: "Project 3",
        image: "images/3.PNG",
        description: "Digital illustration exploring abstract themes.",
        category: "Illustration"
    },
    {
        title: "Project 4",
        image: "images/4.png",
        description: "User interface design for a mobile application.",
        category: "UI/UX"
    },
    {
        title: "Project 5",
        image: "images/5.JPG",
        description: "Photography series capturing urban landscapes.",
        category: "Photography"
    },
    {
        title: "Project 6",
        image: "images/6.JPG",
        description: "Experimental design project exploring new techniques.",
        category: "Experimental"
    },
    {
        title: "Project 7",
        image: "images/7.JPG",
        description: "Commercial advertisement design for a global brand.",
        category: "Commercial"
    },
    {
        title: "Project 8",
        image: "images/8.png",
        description: "Visual storytelling through sequential art.",
        category: "Illustration"
    }
];

// Preload first 4 images immediately
function preloadImages() {
    const firstFourItems = portfolioItems.slice(0, 4);
    firstFourItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Call preload function when DOM is loaded
document.addEventListener('DOMContentLoaded', preloadImages);

// Add portfolio items to the grid with animations
const portfolioGrid = document.querySelector('.portfolio-grid');

// Create portfolio items with optimized loading
portfolioItems.forEach((item, index) => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.setAttribute('role', 'listitem');
    portfolioItem.setAttribute('aria-label', `${item.title} - ${item.category}`);
    portfolioItem.style.animationDelay = `${index * 0.1}s`;

    // Create placeholder immediately
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    portfolioItem.appendChild(placeholder);

    // Create the actual image with optimized loading
    const mediaElement = document.createElement('img');
    mediaElement.src = item.image;
    mediaElement.alt = `${item.title} - ${item.category}`;
    mediaElement.loading = 'lazy';
    mediaElement.width = '800';
    mediaElement.height = '600';
    mediaElement.setAttribute('aria-label', item.title);
    mediaElement.style.opacity = '0';
    mediaElement.style.transition = 'opacity 0.3s ease-in-out';

    // Add the portfolio item to the grid first
    portfolioGrid.appendChild(portfolioItem);

    // Then add the media element with a slight delay for better performance
    setTimeout(() => {
        portfolioItem.innerHTML = `
            ${mediaElement.outerHTML}
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            </div>
        `;

        // Add loading event listener
        const img = portfolioItem.querySelector('img');
        if (img) {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                portfolioItem.classList.add('loaded');
            });
        }
    }, index * 100); // Stagger the loading of images
});

// Create popup container
const popup = document.createElement('div');
popup.className = 'popup';
popup.setAttribute('role', 'dialog');
popup.setAttribute('aria-modal', 'true');
popup.setAttribute('aria-label', 'Portfolio item preview');
popup.innerHTML = `
    <div class="popup-content">
        <span class="close-popup" aria-label="Close popup">&times;</span>
        <div class="popup-media"></div>
    </div>
`;
document.body.appendChild(popup);

// Add click event to portfolio items
portfolioGrid.addEventListener('click', (e) => {
    const portfolioItem = e.target.closest('.portfolio-item');
    if (portfolioItem) {
        const media = portfolioItem.querySelector('img');
        const popupMedia = popup.querySelector('.popup-media');
        const itemTitle = portfolioItem.getAttribute('aria-label');
        
        // Clear previous content
        popupMedia.innerHTML = '';
        
        // Create and add image to popup
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        img.setAttribute('aria-label', itemTitle);
        popupMedia.appendChild(img);
        
        popup.classList.add('active');
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
});

// Close popup when clicking close button or outside the image
popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-popup') || e.target === popup) {
        popup.classList.remove('active');
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        popup.classList.remove('active');
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
});

// EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("G5zHyI1h5zd7iRQfb");
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable the submit button and show loading state
            submitBtn.disabled = true;
            formStatus.className = 'form-status loading';
            formStatus.textContent = 'Sending your message...';
            formStatus.style.display = 'block';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Jaimeen Vasa' // Your name
            };
            
            // Send email using EmailJS with improved error handling
            emailjs.send('service_3f4e7wj', 'template_l3s9ybh', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Your message has been sent successfully!';
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // Try fallback method
                    tryFallbackMethod(name, email, message);
                })
                .finally(function() {
                    // Re-enable the submit button
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Fallback method using mailto link
    function tryFallbackMethod(name, email, message) {
        // Create a mailto link with the form data
        const mailtoLink = `mailto:jaimeenvassa@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        // Show a message to the user
        formStatus.className = 'form-status error';
        formStatus.innerHTML = 'EmailJS service is currently unavailable. <a href="' + mailtoLink + '" class="fallback-link">Click here to send via your email client</a>';
        formStatus.style.display = 'block';
    }
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.setAttribute('data-width', bar.style.width);
    bar.style.width = '0';
    skillObserver.observe(bar);
}); 