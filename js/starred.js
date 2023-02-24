import { renderPlanet } from "./main.js";

function getStarredPlanertsLocalStorage() {
    return JSON.parse(localStorage.getItem('starredPlanets'));
}

function starToggle(element, planet) {
    // Hanterar stjärnmarkering för varje planet
    let star = element.querySelector('svg');
    let isStarred = star.dataset.isStarred;
    let toggle = '';

    // Om planeten är 'stjärnad' sedan innan, ändra till 'o-stjärnad', annars 'stjärna' den.
    if (isStarred === 'true') {
        star.dataset.isStarred = 'false';
        toggle = 'remove';
    } else {
        star.dataset.isStarred = 'true';
        toggle = 'add';
    }
    star.classList.toggle('svg--star-fill');
    // Uppdatera localStorage
    starredPlanetToLocalStorage(toggle, planet);
}

function starredPlanetToLocalStorage(toggle, planet) {
    let starredPlanets = getStarredPlanertsLocalStorage();

    // Om det finns stjärnade planeter, pusha ny planet/ta bort planet. Annars, skapa localStorage
    if (starredPlanets) {
        if (toggle === 'remove') {
            let index = starredPlanets.indexOf(planet);
            starredPlanets.splice(index, 1);
        } else {
            starredPlanets.push(planet);
        }
    } else {
        starredPlanets = [planet];
    }
    localStorage.setItem('starredPlanets', JSON.stringify(starredPlanets));
}

function checkStarredPlanet(planet) {
    let starredPlanets = getStarredPlanertsLocalStorage();
    let exists = false;

    // Om localStorage finns och planet har ett värde, leta efter planet i starredPlanets
    if (starredPlanets && planet) {
        let result = starredPlanets.find(starredPlanet => starredPlanet.name === planet.name)
        // Om match, så finns planeten i starredPlanets
        if (result) {
            exists = true;
        } 
    }
    return exists;
}

function renderStarredPlanets() {
    let starredPlanets = getStarredPlanertsLocalStorage();
    let ulEl = document.getElementById('starred-planets');
    ulEl.innerHTML = '';

    // Om det finns stjärnade planeter 
    if (starredPlanets && starredPlanets.length > 0) {
        starredPlanets.forEach(planet => {
            let liEl = document.createElement('li');
            liEl.innerHTML = planet.name;
            liEl.addEventListener('click', () => {
                renderPlanet(planet.latinName)
            })

            ulEl.appendChild(liEl);
        });
    // Annars skriv ut hjälpmeddelande
    } else {
        let message = document.createElement('li');
        message.classList.add('message');
        message.innerHTML = 'Stjärnmarkera dina favoriter för att lägga till dom här!';
        ulEl.appendChild(message);
    }
}

export { starToggle, checkStarredPlanet, renderStarredPlanets };