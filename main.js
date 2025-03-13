function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33'];
    const size = Math.random() * 15 + 8;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 150;
    const lifetime = Math.random() * 1500 + 800;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    const destinationX = Math.cos(angle) * velocity;
    const destinationY = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--x', `${destinationX}px`);
    particle.style.setProperty('--y', `${destinationY}px`);
    particle.style.animation = `fall ${lifetime}ms linear forwards`;
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, lifetime);
}

function createColorBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'color-burst';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    document.body.appendChild(burst);
    
    setTimeout(() => {
        burst.remove();
    }, 1000);
}

function playHoliSound() {
    const sounds = [
        'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
        'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'
    ];
    const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    audio.volume = 0.3;
    audio.play();
}

function createRingParticle(x, y, angle) {
    const particle = document.createElement('div');
    particle.className = 'ring-particle';
    
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const distance = 100 + Math.random() * 50;
    
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

function createParticleRing(x, y) {
    const particleCount = 36;
    for (let i = 0; i < particleCount; i++) {
        const angle = (i * 360) / particleCount;
        createRingParticle(x, y, angle);
    }
}

function celebrate(e) {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            for (let j = 0; j < 40; j++) {
                createParticle(x, y);
            }
            createColorBurst(x, y);
            createParticleRing(x, y);
        }, i * 200);
    }
    
    playHoliSound();
    
    // Add button animation
    const button = e.target;
    button.classList.add('celebrating');
    setTimeout(() => {
        button.classList.remove('celebrating');
    }, 1000);

    
    setTimeout(() => {
        window.location.href = 'celebration.html';
    }, 3000);
}

function createRandomParticle() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createParticle(x, y);
}

document.getElementById('celebrate').addEventListener('click', celebrate);


setInterval(() => {
    createRandomParticle();
}, 2000);


document.querySelectorAll('.color-dot').forEach((dot, index) => {
    dot.style.setProperty('--i', index);
});

