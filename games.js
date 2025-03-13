class ColorParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 8 + 4; // Slightly larger particles
        this.speedX = Math.random() * 8 - 4; // Reduced speed
        this.speedY = (Math.random() * -8) - 2; // Gentler upward velocity
        this.gravity = 0.2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        
        // Simple drag effect
        this.speedX *= 0.98;
        this.speedY *= 0.98;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        
        // Simple circle particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class Target {
    constructor(canvas) {
        this.canvas = canvas;
        this.size = Math.random() * 30 + 20;
        this.x = Math.random() * (canvas.width - this.size * 2) + this.size;
        this.y = Math.random() * (canvas.height - this.size * 2) + this.size;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.color = this.getRandomColor();
        this.hit = false;
        this.disappearing = false;
        this.opacity = 1;
    }

    getRandomColor() {
        const colors = ['#FF1744', '#2979FF', '#00E676', '#FFEA00', '#FF9100'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        if (this.disappearing) {
            this.opacity -= 0.05;
            return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        
        // Simple boundary checking
        if (this.x <= this.size || this.x >= this.canvas.width - this.size) {
            this.speedX *= -1;
        }
        if (this.y <= this.size || this.y >= this.canvas.height - this.size) {
            this.speedY *= -1;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Simple filled circle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.particles = [];
        this.targets = [];
        this.colors = ['#FF1744', '#2979FF', '#00E676', '#FFEA00', '#FF9100'];
        this.combo = 0;
        this.lastHitTime = 0;
        
        this.setupEventListeners();
        this.initializeGame();
    }

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.restartGame());
        
        this.canvas.addEventListener('click', (e) => {
            if (!this.gameActive) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.createColorSplash(x, y);
            this.checkCollisions(x, y);
        });
    }

    initializeGame() {
        this.targets = [];
        this.particles = [];
        this.score = 0;
        this.timeLeft = 30;
        this.combo = 0;
        
        for (let i = 0; i < 5; i++) {
            this.targets.push(new Target(this.canvas));
        }
        
        document.getElementById('scoreValue').textContent = this.score;
        document.getElementById('timeValue').textContent = this.timeLeft;
    }

    startGame() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        this.gameActive = true;
        this.gameLoop();
        this.startTimer();
    }

    restartGame() {
        this.initializeGame();
        this.startGame();
    }

    createColorSplash(x, y) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const particleCount = 30; // Reduced particle count
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new ColorParticle(x, y, color));
        }
    }

    checkCollisions(x, y) {
        const now = Date.now();
        this.targets.forEach(target => {
            if (target.hit || target.disappearing) return;
            
            const distance = Math.sqrt(
                Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)
            );
            
            if (distance < target.size) {
                target.disappearing = true;
                
                if (now - this.lastHitTime < 1000) {
                    this.combo++;
                } else {
                    this.combo = 1;
                }
                this.lastHitTime = now;
                
                const baseScore = 100;
                const comboBonus = this.combo * 50;
                this.score += baseScore + comboBonus;
                
                document.getElementById('scoreValue').textContent = this.score;
                
                // Simple splash effect
                for (let i = 0; i < 20; i++) {
                    this.particles.push(new ColorParticle(target.x, target.y, target.color));
                }
                
                setTimeout(() => {
                    const index = this.targets.indexOf(target);
                    if (index > -1) {
                        this.targets[index] = new Target(this.canvas);
                    }
                }, 1000);
            }
        });
    }

    startTimer() {
        const timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timeValue').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        this.gameActive = false;
        document.getElementById('gameOverScreen').style.display = 'flex';
        document.getElementById('finalScore').textContent = this.score;
    }

    update() {
        this.particles = this.particles.filter(particle => particle.life > 0);
        this.particles.forEach(particle => particle.update());
        this.targets.forEach(target => target.update());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.targets.forEach(target => target.draw(this.ctx));
        this.particles.forEach(particle => particle.draw(this.ctx));
    }

    gameLoop() {
        if (!this.gameActive) return;
        
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener('load', () => {
    new Game();
});