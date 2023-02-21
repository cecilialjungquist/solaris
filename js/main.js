
import { createImgEl, createHeaderEl, createLineEl, createSectionEl, createMoonEl } from "./create_functions.js";
import { search } from "./search_functions.js";

const planetsUI = document.querySelectorAll('.all-planets article');
const sunUI = document.getElementById('sun');
const searchIcon = document.getElementById('search-icon');
const previousPlanet = document.getElementById('previous-page');
const nextPlanet = document.getElementById('next-page');

fetchData();

planetsUI.forEach(planetUI => {
    planetUI.addEventListener('click', () => {
        let planetToRender = planetUI.getAttribute('name');
        // console.log(planetUI.getAttribute('id'));
        renderPlanet(planetToRender);
    })
})

sunUI.addEventListener('click', () => {
    let sun = sunUI.getAttribute('name');
    // console.log(planetUI.getAttribute('id'));
    renderPlanet(sun);
})

searchIcon.addEventListener('click', () => {
    let searchInputField = document.getElementById('search-input');
    // Tömmer searchInput och tidigare resultat
    let searchInput = '';
    search(searchInput);

    if (searchIcon.dataset.clickTo === 'open') {
        searchInputField.classList.remove('hide');
        searchIcon.dataset.clickTo = 'close';
    } else {
        searchInputField.classList.add('hide');
        searchIcon.dataset.clickTo = 'open';
        searchInputField.value = '';
    }

    searchInputField.addEventListener('keydown', (e) => {
        let inputCharacter = e.key;

        if (inputCharacter === "Backspace" || inputCharacter === "Delete") {
            searchInput = searchInput.slice(0, -1);
        } else if (inputCharacter.length === 1) {
            searchInput += inputCharacter;
        }
        // console.log(inputCharacter);
        // console.log(searchInput);
        search(searchInput);
    })

})

previousPlanet.addEventListener('click', () => {
    let currentPlanet = document.querySelector('.planet__header h2').innerHTML;
    console.log(currentPlanet);
    // Bättre att ba smacka upp i localStorage?

})

async function fetchData() {
    try {
        const API_URL = ('https://majazocom.github.io/Data/solaris.json');
        let data = await fetch(API_URL);
        data = await data.json();
        
        localStorage.setItem('planets', JSON.stringify(data));
        
    } catch (error) {
        console.log(error)
    }
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('planets'));
}

function renderPlanet(planetLatinName) {
    document.querySelector('.wrapper--solar-system').classList.add('hide');
    document.querySelector('nav').classList.remove('hide');

    let planets = getLocalStorage();
    let wrapper = document.querySelector('.wrapper--planet');
    let pageEl = document.getElementById('page');
    let article = document.createElement('article');
    let imgSection = document.createElement('section');
    let infoSection = document.createElement('section');
    let gridSection = document.createElement('section');

    wrapper.classList.remove('hide');
    wrapper.style.minHeight = '100vh';
    wrapper.innerHTML = '';

    article.classList.add('planet');
    imgSection.classList.add('planet__img');
    infoSection.classList.add('planet__info');
    gridSection.classList.add('planet__grid');

    planets.forEach(planet => {
        if (planetLatinName === planet.latinName) {
            console.log(planet.name);
            let img = createImgEl(planet);
            let header = createHeaderEl(planet)
            let lineTop = createLineEl();
            let circumFerenceSection = createSectionEl('Omkrets', planet.circumference, 'km');
            let distanceSection = createSectionEl('KM från Solen', planet.distance, 'km');
            let tempDaySection = createSectionEl('Max temperatur', planet.temp.day, 'C');
            let tempNightSection = createSectionEl('Min temperatur', planet.temp.night, 'C');
            let lineBottom = createLineEl();
            let moonSection = createMoonEl(planet.moons);

            imgSection.appendChild(img);
            infoSection.appendChild(header);
            infoSection.appendChild(lineTop);
            infoSection.appendChild(gridSection).appendChild(circumFerenceSection);
            infoSection.appendChild(gridSection).appendChild(distanceSection);
            infoSection.appendChild(gridSection).appendChild(tempDaySection);
            infoSection.appendChild(gridSection).appendChild(tempNightSection);
            infoSection.appendChild(lineBottom);
            infoSection.appendChild(moonSection);

            article.appendChild(imgSection);
            article.appendChild(infoSection);

            wrapper.appendChild(article);
            pageEl.innerHTML = planet.id;            
        }
    })
}

export { getLocalStorage, renderPlanet };