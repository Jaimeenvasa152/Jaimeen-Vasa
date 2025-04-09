/**
 * Image Optimizer
 * This script helps optimize images for better performance
 */

// Function to compress images on the client side
function compressImage(img, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to data URL with compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Create new image with compressed data
        const compressedImg = new Image();
        compressedImg.onload = () => {
            resolve(compressedImg);
        };
        compressedImg.src = compressedDataUrl;
    });
}

// Function to optimize all portfolio images
function optimizePortfolioImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    portfolioItems.forEach((img, index) => {
        // Only optimize if image is loaded
        if (img.complete) {
            optimizeImage(img, index);
        } else {
            img.addEventListener('load', () => {
                optimizeImage(img, index);
            });
        }
    });
}

// Function to optimize a single image
function optimizeImage(img, index) {
    // Skip if already optimized
    if (img.dataset.optimized === 'true') return;
    
    // Mark as optimized to prevent duplicate processing
    img.dataset.optimized = 'true';
    
    // Compress image
    compressImage(img).then(compressedImg => {
        // Replace original image with compressed version
        img.src = compressedImg.src;
        
        // Add loaded class to parent
        const portfolioItem = img.closest('.portfolio-item');
        if (portfolioItem) {
            portfolioItem.classList.add('loaded');
        }
    });
}

// Initialize optimization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure images are loaded
    setTimeout(optimizePortfolioImages, 1000);
}); 