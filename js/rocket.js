const rocket = document.getElementById('rocket');

// Sätter styling i html för att kunna nås i funktion nedan
window.addEventListener('load', () => {
    rocket.style.position = 'absolute';
    rocket.style.bottom = '32px';
    rocket.style.left = '32px';
});

rocket.addEventListener('click', () => {
  
    // Om raketen inte är aktiv, aktivera den. Annars gör den inaktiv och "nollställ"
    if (rocket.dataset.active === 'not-active') {
        rocket.dataset.active = 'active';
        // Lägg till animering
        rocket.classList.add('launch-rocket');
    } else if (rocket.dataset.active === 'active') {
        rocket.style.bottom = '32px';
        rocket.style.left = '32px';
        rocket.style.transform = 'rotateZ(0deg)';
        rocket.dataset.active = 'not-active';
        rocket.classList.remove('launch-rocket');
    }
})


function move(e) {
    let direction = e.key;    
    let previousLocationY = parseInt(rocket.style.bottom);
    let previousLocationX = parseInt(rocket.style.left);
    
    // Sätt min och max beroende på bodys storlek
    const body = document.querySelector('body');
    let maxY = body.offsetHeight;
    let maxX = body.offsetWidth;

    if (rocket.dataset.active === 'active') {
        
        if (direction === 'ArrowUp' && previousLocationY < (maxY - 100)) {
            moveUp(previousLocationY);
        } else if (direction === 'ArrowDown' && previousLocationY > 60){
            moveDown(previousLocationY);
        } else if (direction == 'ArrowRight' && previousLocationX < (maxX - 80)) {
            moveRight(previousLocationX);
        } else if (direction === 'ArrowLeft' && previousLocationX > 60) {
            moveLeft(previousLocationX);
        }
    }
}

function moveUp(previousLocationY) {
    rocket.style.bottom = (previousLocationY + 10) + 'px';
    rocket.style.transform = 'rotateZ(0deg)';
}
function moveDown(previousLocationY) {
    rocket.style.bottom = (previousLocationY - 10) + 'px';
    rocket.style.transform = 'rotateZ(180deg)';
}
function moveRight(previousLocationX) {
    rocket.style.left = (previousLocationX + 10) + 'px';
    rocket.style.transform = 'rotateZ(90deg)';
}
function moveLeft(previousLocationX) {
    rocket.style.left = (previousLocationX - 10) + 'px';
    rocket.style.transform = 'rotateZ(-90deg)';
}

export { move };