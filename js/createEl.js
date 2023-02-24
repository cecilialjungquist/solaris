import { starToggle, checkStarredPlanet } from "./starred.js";

function createImgEl(planet) {
    let latinName = planet.latinName.toLowerCase();
    let img = document.createElement('img');
    let src = `img/${latinName}.png`;
    img.setAttribute('src', src);
    img.classList.add(`img--${latinName}`);
    
    return img;
}

function createHeaderEl(planet) {
    let header = document.createElement('header');
    let star = createStarEl(planet);
    header.classList.add('planet__header');
    header.innerHTML = `
    <h1>${planet.name}</h1>
    <h2>${planet.latinName}</h2>
    <p>${planet.desc}</p>
    `;
    header.appendChild(star);

    return header;
}

function createLineEl() {
    let line = document.createElement('div')
    line.classList.add('line');

    return line;
}

function createSectionEl(heading, paragraph, unit) {
    let section = document.createElement('section');
    section.classList.add('grid__section');
    section.innerHTML = `
    <h3>${heading}</h3>
    <p>${paragraph} ${unit}</p>
    `;

    return section;
}

function createMoonEl(moonArray) {
    let moons = '';
    // Om månar finns
    if (moonArray.length > 0) {
        // Loopa över månarna i arrayen
        for (let i = 0; i < moonArray.length; i++) {
            if (i < moonArray.length - 1) {
                // Om i är mindre än sista index i arrayen
                moons += moonArray[i] + ', ';
            } else {
                // Om i är sista index i arrayen
                moons += moonArray[i];
            }
        }
    } else {
        moons = 'Saknar månar';
    }
    let section = createSectionEl('Månar', moons, '');
    return section;
}

function createStarEl(planet) {
    let star = document.createElement('aside');
    let isStarred = 'false';
    let classCSS = '';
    star.classList.add('svg--star');

    // Om planeten finns i "favoriter" (starred planets)
    if (checkStarredPlanet(planet)) {
        classCSS = 'svg--star-fill';
        isStarred = 'true';
    }

    star.innerHTML = `
    <svg class="${classCSS}" data-starred-planet="${planet.latinName}" data-is-starred="${isStarred}" width="45" height="42" viewBox="0 0 182 163" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M91 9.24726L109.491 63.1617L110.186 65.1885H112.329H171.701L123.81 98.1519L121.934 99.4427L122.673 101.596L141.053 155.187L92.701 121.906L91 120.735L89.2991 121.906L40.9471 155.187L59.327 101.596L60.0656 99.4427L58.1902 98.1519L10.2994 65.1885H69.6712H71.8138L72.5089 63.1617L91 9.24726Z" stroke="#00E9E9" stroke-width="6"/>
    </svg>
    `;

    star.addEventListener('click', () => starToggle(star, planet));
    return star;  
}


export { createImgEl, createHeaderEl, createLineEl, createSectionEl, createMoonEl };
