function createColorDrop() {
    const drop = document.createElement('div');
    drop.style.position = 'absolute';
    drop.style.width = '10px';
    drop.style.height = '10px';
    drop.style.borderRadius = '50%';
    
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33'];
    drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animation = `colorDrop ${Math.random() * 2 + 1}s linear`;
    
    document.querySelector('.color-rain').appendChild(drop);
    
    setTimeout(() => {
        drop.remove();
    }, 3000);
}

setInterval(createColorDrop, 50);


for(let i = 0; i < 50; i++) {
    createColorDrop();
}