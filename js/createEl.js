import { checkStarredPlanet } from "./starred.js";

function createPlanetHTML(planet) {
    let latinNameToLowerCase = planet.latinName.toLowerCase();
    let main = document.createElement('main');
    let starToggleIcon = createStarToggleIcon(planet);
    let moons = createMoonList(planet);
    
    main.classList.add('planet');
    main.innerHTML = `
    <section class="planet__img">
        <img src="img/${latinNameToLowerCase}.png" class="img--${latinNameToLowerCase}">
    </section>
    <section class="planet__info">
        <header class="planet__header">
            <h1>${planet.name}</h1>
            <h2>${planet.latinName}</h2>
            <p>${planet.desc}</p>
            <aside class="svg--star">${starToggleIcon}</aside>
        </header>
        <div class="line"></div>
        <section class="planet__grid">
            <section class="grid__section">
                <h3>Omkrets</h3>
                <p>${planet.circumference}km</p>
            </section>
            <section class="grid__section">
                <h3>KM från Solen</h3>
                <p>${planet.distance} km</p>
            </section>
            <section class="grid__section">
                <h3>Max temperatur</h3>
                <p>${planet.temp.day} °C</p>
            </section>
            <section class="grid__section">
                <h3>Min temperatur</h3>
                <p>${planet.temp.night} °C</p>
            </section>
        </section>
        <div class="line"></div>
        <section class="grid__section">
            <h3>Månar</h3>
            <p>${moons}</p>
        </section>
    </section>
    `;

    return main;
}

function createMoonList(planet) {
    let moons = '';

    // Om månar finns
    if (planet.moons.length > 0) {
        // Loopa över månarna i arrayen
        for (let i = 0; i < planet.moons.length; i++) {
            if (i < planet.moons.length - 1) {
                // Om i är mindre än sista index i arrayen
                moons += planet.moons[i] + ', ';
            } else {
                // Om i är sista index i arrayen
                moons += planet.moons[i];
            }
        }
    } else {
        moons = 'Saknar månar';
    }
    return moons;
}

function createStarToggleIcon(planet) {
    let isStarred = 'false';
    let classCSS = '';

    // Om planeten finns i "favoriter" (starred planets)
    if (checkStarredPlanet(planet)) {
        classCSS = 'svg--star-fill';
        isStarred = 'true';
    }

    let starHTML = `
    <svg class="${classCSS}" data-starred-planet="${planet.latinName}" data-is-starred="${isStarred}" width="45" height="42" viewBox="0 0 182 163" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M91 9.24726L109.491 63.1617L110.186 65.1885H112.329H171.701L123.81 98.1519L121.934 99.4427L122.673 101.596L141.053 155.187L92.701 121.906L91 120.735L89.2991 121.906L40.9471 155.187L59.327 101.596L60.0656 99.4427L58.1902 98.1519L10.2994 65.1885H69.6712H71.8138L72.5089 63.1617L91 9.24726Z" stroke="#00E9E9" stroke-width="6"/>
    </svg>
    `;

    return starHTML;  
}


export { createPlanetHTML };
