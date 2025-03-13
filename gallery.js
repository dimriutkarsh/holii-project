// Create animated color dots in the header
function createColorDots() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#e056fd'];
    const dotsContainer = document.querySelector('.color-dots');
    
    function createDot() {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = Math.random() * 20 + 10 + 'px';
        dot.style.height = dot.style.width;
        dot.style.backgroundColor = getRandomColor();
        dot.style.borderRadius = '50%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = -20 + 'px';
        dot.style.opacity = Math.random() * 0.5 + 0.5;
        dot.style.transform = `rotate(${Math.random() * 360}deg)`;
        dot.style.filter = 'blur(1px)';
        dot.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        
        dotsContainer.appendChild(dot);
        
        const duration = Math.random() * 2 + 2;
        const animation = dot.animate([
            { 
                transform: 'translateY(0) rotate(0deg) scale(1)', 
                opacity: 1,
                backgroundColor: getRandomColor()
            },
            { 
                transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg) scale(0)`, 
                opacity: 0,
                backgroundColor: getRandomColor()
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            dot.remove();
            createDot();
        };
    }
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createDot(), Math.random() * 2000);
    }
}

// Generate random colors
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
}

// Auto slider functionality with enhanced transitions
function setupSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideWidth = 100;

    // Clone first slide and append to end for smooth infinite loop
    const firstSlideClone = slides[0].cloneNode(true);
    slider.appendChild(firstSlideClone);

    function nextSlide() {
        currentSlide++;
        slider.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

        // Reset to first slide when reaching the end
        if (currentSlide >= slides.length) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentSlide = 0;
                slider.style.transform = `translateX(0)`;
            }, 800);
        }
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Add mouse parallax effect to slides
    slides.forEach(slide => {
        slide.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = slide.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            slide.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });

        slide.addEventListener('mouseleave', () => {
            slide.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    });
}

// Enhanced scroll reveal animation
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item, .video-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Initialize the gallery
function init() {
    createColorDots();
    setupSlider();
    setupScrollReveal();

    // Add parallax effect to sections
    document.addEventListener('mousemove', (e) => {
        const sections = document.querySelectorAll('.section');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        sections.forEach(section => {
            section.style.transform = `translateZ(20px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
        });
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);