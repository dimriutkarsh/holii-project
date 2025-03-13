// Create floating color particles with enhanced animations
function createFloatingColors() {
    const colors = [
      '#ff4d6d', '#4ea8de', '#ffd93d', '#6c63ff', '#4caf50',
      '#ff6b6b', '#4ecdc4', '#ffbe0b', '#7400b8', '#80b918'
    ];
    const container = document.getElementById('floating-colors');
  
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      
      // Random movement values
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      
      // Random animation durations
      const floatDuration = Math.random() * 5 + 5;
      const fadeDuration = Math.random() * 3 + 2;
      const colorDuration = Math.random() * 4 + 3;
      
      // Random colors for animation
      const startColor = colors[Math.floor(Math.random() * colors.length)];
      const midColor = colors[Math.floor(Math.random() * colors.length)];
      const endColor = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = startColor;
      particle.style.opacity = '0.6';
      particle.style.position = 'fixed';
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      // Set CSS variables for animations
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.setProperty('--float-duration', `${floatDuration}s`);
      particle.style.setProperty('--fade-duration', `${fadeDuration}s`);
      particle.style.setProperty('--color-duration', `${colorDuration}s`);
      particle.style.setProperty('--start-color', startColor);
      particle.style.setProperty('--mid-color', midColor);
      particle.style.setProperty('--end-color', endColor);
      
      container.appendChild(particle);
    }
  }
  
  // Enhanced Intersection Observer for scroll animations
  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
  
    document.querySelectorAll('.story-section').forEach(section => {
      observer.observe(section);
    });
  }
  
  // Color changing animation for hero section
  function setupHeroAnimation() {
    const overlay = document.querySelector('.color-overlay');
    if (overlay) {
      setInterval(() => {
        const hue = Math.random() * 360;
        overlay.style.background = `linear-gradient(45deg, 
          hsla(${hue}, 70%, 50%, 0.3),
          hsla(${(hue + 60) % 360}, 70%, 50%, 0.3))`;
      }, 3000);
    }
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    createFloatingColors();
    setupScrollAnimations();
    setupHeroAnimation();
  });