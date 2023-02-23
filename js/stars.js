function starToggle(element) {
    let star = element.querySelector('svg');
    let starredPlanet = star.dataset.starredPlanet;
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
    starredPlanetToLocalStorage(toggle, starredPlanet);
}

function starredPlanetToLocalStorage(toggle, star) {
    // Hämta localStorage
    let starredPlanets = JSON.parse(localStorage.getItem('starredPlanets'));
    // Om det finns, pusha ny planet. Annars, skapa localStorage
    if (starredPlanets) {
        if (toggle === 'remove') {
            let index = starredPlanets.indexOf(star);
            starredPlanets.splice(index, 1);
        } else {
            starredPlanets.push(star);
        }
    } else {
        starredPlanets = [star];
    }
    localStorage.setItem('starredPlanets', JSON.stringify(starredPlanets));
}

function checkStarredPlanet(planet) {
    let starredPlanets = JSON.parse(localStorage.getItem('starredPlanets'));
    // Om planet inte finns i localStorage, returnera -1 (gäller båda villkoren)
    if (starredPlanets) {
        return starredPlanets.indexOf(planet);
    } else {
        return -1;
    }
}



export { starToggle, checkStarredPlanet };