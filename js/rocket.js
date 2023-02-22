const rocket = document.getElementById('rocket');
const body = document.querySelector('body');

// Sätter styling i html för att kunna nås i funktion nedan
window.addEventListener('load', () => {
    rocket.style.position = 'absolute';
    rocket.style.bottom = '32px';
    rocket.style.left = '32px';
});

function move(e) {
    let direction = e.key;    
    let previousLocationY = parseInt(rocket.style.bottom);
    let previousLocationX = parseInt(rocket.style.left);

    // Sätt min och max beroende på bodys storlek
    let maxY = body.offsetHeight;
    let maxX = body.offsetWidth;

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