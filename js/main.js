
import { createImgEl, createHeaderEl, createLineEl, createSectionEl, createMoonEl } from "./createEl.js";
import { search } from "./search.js";
import { renderStarredPlanets } from "./starred.js";
import { move } from "./rocket.js";

const planetsUI = document.querySelectorAll('.all-planets article');
const sunUI = document.getElementById('solis');
const searchIcon = document.getElementById('search-icon');
const starIcon = document.getElementById('star-icon');
const pagination = document.querySelectorAll('.pagination button');

// Hämtar data direkt och lagrar i localStorage
fetchData();

planetsUI.forEach(planetUI => {
    planetUI.addEventListener('click', () => {
        let planetToRender = planetUI.getAttribute('id');
        // Uppdaterar första bokstven till versal
        let firstLetter = planetToRender.charAt(0).toLocaleUpperCase();
        planetToRender = firstLetter + planetToRender.slice(1);
        renderPlanet(planetToRender);
    })
})

sunUI.addEventListener('click', () => {
    let sun = sunUI.getAttribute('id');
    // Uppdaterar första bokstven till versal
    let firstLetter = sun.charAt(0).toLocaleUpperCase();
    sun = firstLetter + sun.slice(1);
    renderPlanet(sun);
})

searchIcon.addEventListener('click', () => {
    let searchInput = document.getElementById('search-input');
    searchInput.classList.toggle('hide');
    
    if (searchIcon.dataset.clickTo === 'open') {
        searchIcon.dataset.clickTo = 'close';
    } else {
        searchIcon.dataset.clickTo = 'open';

        // Tömmer searchInput och rensar tidigare resultat
        searchInput.value = '';
        search(searchInput);
    }
    searchInput.addEventListener('input', (event) => search(event.target));
})

starIcon.addEventListener('click', () => {
    if (starIcon.dataset.clickTo === 'open') {
        renderStarredPlanets();
        starIcon.dataset.clickTo = 'close';
    } else {
        starIcon.dataset.clickTo = 'open';
        document.getElementById('starred-planets').innerHTML = '';
    }
})

pagination.forEach(button => {
    button.addEventListener('click', () => {
        let currentPlanetID = parseInt(document.getElementById('page').innerHTML);
        let planets = getLocalStorage();
        let index = currentPlanetID;

        if (currentPlanetID > 0 && button.dataset.planet === 'previous') {
            index = index -1;
        } else if (currentPlanetID < 8 && button.dataset.planet === 'next') {
            index = index +1;
        } 

        let newPlanet = planets[index].latinName;
        renderPlanet(newPlanet);
    })
});

async function fetchData() {
    try {
        const API_URL = ('https://majazocom.github.io/Data/solaris.json');
        let data = await fetch(API_URL);
        
        // Om data ok, lagra i localStorage
        if (data.ok) {
            data = await data.json();
            console.log(data);
            localStorage.setItem('planets', JSON.stringify(data));
        // Annars skriv ut meddelande med felkod
        } else {
            let section = createSectionEl('Oh, no!', `We've encountered an error of `, data.status);
            document.querySelector('body').appendChild(section);
            section.style.padding = '2rem';
            document.querySelector('.wrapper--solar-system').classList.add('hide');
        }

    } catch (error) {
        // Ska detta också skrivas ut på skärmen+
        console.log('Oh no! Error: ', error);
    }
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('planets'));
}

function renderPlanet(planetLatinName) {
    document.querySelector('.wrapper--solar-system').classList.add('hide');
    document.querySelector('nav').classList.remove('hide');

    // Hämtar alla planeter
    let planets = getLocalStorage();

    // Skapar "föräldrar"
    let wrapper = document.querySelector('.wrapper--planet');
    let pageEl = document.getElementById('page');
    let main = document.createElement('main');
    let imgSection = document.createElement('section');
    let infoSection = document.createElement('section');
    let gridSection = document.createElement('section');

    wrapper.classList.remove('hide');
    wrapper.innerHTML = '';

    main.classList.add('planet');
    imgSection.classList.add('planet__img');
    infoSection.classList.add('planet__info');
    gridSection.classList.add('planet__grid');

    planets.forEach(planet => {
        // Villkor för att rendera rätt planet
        if (planetLatinName === planet.latinName) {
            // Skapar alla element
            let img = createImgEl(planet);
            let header = createHeaderEl(planet)
            let lineTop = createLineEl();
            let circumFerenceSection = createSectionEl('Omkrets', planet.circumference, 'km');
            let distanceSection = createSectionEl('KM från Solen', planet.distance, 'km');
            let tempDaySection = createSectionEl('Max temperatur', planet.temp.day, '°C');
            let tempNightSection = createSectionEl('Min temperatur', planet.temp.night, '°C');
            let lineBottom = createLineEl();
            let moonSection = createMoonEl(planet.moons);

            // Lägg till element i rätt förälder och rendera ut i UI och uppdatera paginaiton
            imgSection.append(img);
            gridSection.append(circumFerenceSection, distanceSection, tempDaySection, tempNightSection);
            infoSection.append(header, lineTop, gridSection, lineBottom, moonSection);
            main.append(imgSection, infoSection);
            wrapper.append(main);
            pageEl.innerHTML = planet.id;            
        }
    })
}

export { getLocalStorage, renderPlanet };