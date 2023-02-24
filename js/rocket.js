const rocket = document.getElementById('rocket');

document.addEventListener('keydown', (e) => move(e))

// Sätter styling i html för att kunna nås i funktion nedan
window.addEventListener('load', () => {
    rocket.style.position = 'absolute';
    rocket.style.bottom = '32px';
    rocket.style.left = '32px';
});

rocket.addEventListener('click', () => {
    if (rocket.dataset.active === 'not-active') {
        startGame();
    } else if (rocket.dataset.active === 'active') {
        resetGame();
    }
});

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

        catchAlien();
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

function startGame() {
    let body = document.querySelector('body');
    // Ändra raketen till aktiv
    rocket.dataset.active = 'active';
    // Lägg till animering
    rocket.classList.add('launch-rocket');

    // Rendera ut 10 aliens
    for (let i = 0; i < 10; i++) {
        let alien = document.createElement('div');
        alien.classList.add('alien');
        // Ge varje alien en "random" position
        alien.style.top = Math.floor(Math.random() * 400 + 64) + 'px';
        alien.style.left = Math.floor(Math.random() * 1000 + 64) + 'px';
        body.appendChild(alien);
    }
    startTimer();
}

function resetGame() {
    // "Nollställ" raket och ta bort resterande aliens
    rocket.style.bottom = '32px';
    rocket.style.left = '32px';
    rocket.style.transform = 'rotateZ(0deg)';
    rocket.dataset.active = 'not-active';
    rocket.classList.remove('launch-rocket');
    document.querySelectorAll('.alien').forEach(alien => alien.remove());
    document.querySelector('.timer').remove();
}

function catchAlien() {
    let aliens = document.querySelectorAll('.alien');
    // Hämta location av rocket
    let rocketlocation = rocket.getBoundingClientRect();
    
    aliens.forEach(alien => {
        // Hämta location av alien
        let alienLocation = alien.getBoundingClientRect();

        if (alienLocation.left > rocketlocation.left 
            && alienLocation.right < rocketlocation.right
            && alienLocation.top > rocketlocation.top
            && alienLocation.bottom < rocketlocation.bottom) {
                // Om villkoren ovan stämmer, är alien fångad. Ta bort alien.
                alien.remove();
        }
    })
}

function startTimer() {
    let wrapper = document.querySelector('.wrapper--solar-system');
    let timerUI = document.createElement('article');
    timerUI.classList.add('timer');
    let time = 31;

    // Kolla hur många aliens som är kvar? Array?
    // Nåt meddelande på skärmen?
    
    wrapper.appendChild(timerUI)
    const timer = setInterval(() => {
        time--;
        timerUI.innerHTML = time;
        if (time < 0) {
            clearInterval(timer);
            resetGame();
        }
    }, 1000);
}

export { move };