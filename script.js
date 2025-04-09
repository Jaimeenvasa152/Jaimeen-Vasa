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

// Portfolio items with your actual work
const portfolioItems = [
    {
        title: "Project 1",
        image: "images/1.PNG",
        description: "Creative design project showcasing unique visual elements",
        category: "Graphic Design"
    },
    {
        title: "Project 2",
        image: "images/2.PNG",
        description: "Innovative design solution with modern aesthetics",
        category: "Visual Design"
    },
    {
        title: "Project 3",
        image: "images/3.PNG",
        description: "Brand identity and visual communication design",
        category: "Branding"
    },
    {
        title: "Project 4",
        image: "images/4.PNG",
        description: "Digital art and creative illustration work",
        category: "Illustration"
    },
    {
        title: "Project 5",
        image: "images/5.PNG",
        description: "Modern UI/UX design project",
        category: "UI/UX"
    },
    {
        title: "Project 6",
        image: "images/6.MP4",
        description: "Creative photography and visual storytelling",
        category: "Photography"
    },
    {
        title: "Project 7",
        image: "images/7.PNG",
        description: "Experimental design project",
        category: "Experimental"
    },
    {
        title: "Project 8",
        image: "images/8.JPG",
        description: "Commercial design work",
        category: "Commercial"
    },
    {
        title: "Project 9",
        image: "images/9.JPG",
        description: "Artistic photography project",
        category: "Photography"
    },
    {
        title: "Project 10",
        image: "images/10.JPG",
        description: "Digital art and creative design",
        category: "Digital Art"
    },
    {
        title: "Project 11",
        image: "images/11.JPG",
        description: "Visual communication design",
        category: "Visual Design"
    },
    {
        title: "Project 12",
        image: "images/12.JPG",
        description: "Advanced digital illustration",
        category: "Illustration"
    }
];

// Add portfolio items to the grid with animations
const portfolioGrid = document.querySelector('.portfolio-grid');
portfolioItems.forEach((item, index) => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.style.animationDelay = `${index * 0.1}s`;
    
    // Check if the item is a video (6th item)
    if (index === 5) { // 6th item (index 5)
        portfolioItem.innerHTML = `
            <video src="${item.image}" alt="${item.title}" loading="lazy" muted loop>
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
        `;
    }
    
    portfolioGrid.appendChild(portfolioItem);
});

// Create popup container
const popup = document.createElement('div');
popup.className = 'popup';
popup.innerHTML = `
    <div class="popup-content">
        <span class="close-popup">&times;</span>
        <div class="popup-media"></div>
    </div>
`;
document.body.appendChild(popup);

// Add click event to portfolio items
portfolioGrid.addEventListener('click', (e) => {
    const portfolioItem = e.target.closest('.portfolio-item');
    if (portfolioItem) {
        const media = portfolioItem.querySelector('img, video');
        const popupMedia = popup.querySelector('.popup-media');
        
        // Clear previous content
        popupMedia.innerHTML = '';
        
        // Check if the clicked item is a video
        if (media.tagName.toLowerCase() === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            popupMedia.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = media.src;
            img.alt = media.alt;
            popupMedia.appendChild(img);
        }
        
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// Close popup when clicking close button or outside the image
popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-popup') || e.target === popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("ahT0l81eepfyKUcCC"); // Replace with your actual public key
    
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
            
            // Send email using EmailJS
            emailjs.send('service_1j393qb', 'template_l3s9ybh', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Your message has been sent successfully!';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                })
                .finally(function() {
                    // Re-enable the submit button
                    submitBtn.disabled = false;
                });
        });
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