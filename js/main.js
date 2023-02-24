
import { createPlanetHTML} from "./createEl.js";
import { search } from "./search.js";
import { starredPlanetsUI, starToggle } from "./starred.js";
import { move } from "./rocket.js";


const planetsUI = document.querySelectorAll('.all-planets article');
const sunUI = document.getElementById('solis');
const searchIcon = document.getElementById('search-icon');
const starIcon = document.getElementById('star-icon');
const pagination = document.querySelectorAll('.pagination button');

// Hämtar data direkt och lagrar i localStorage
fetchData();

async function fetchData() {
    try {
        const API_URL = ('https://majazocom.github.io/Data/solaris.json');
        let data = await fetch(API_URL);
        
        // Om data ok, lagra i localStorage
        if (data.ok) {
            data = await data.json();
            localStorage.setItem('planets', JSON.stringify(data));
        // Annars skriv ut meddelande med felkod
        } else {
            let section = document.createElement('section');
            section.innerHTML = `
            <h3>Oh, no!</h3>
            <p>We've encountered an error of ${data.status}! Please try again later.</p>
            `;
            document.querySelector('body').appendChild(section);
            section.style.padding = '2rem';
            document.querySelector('.wrapper--solar-system').classList.add('hide');
        }

    } catch (error) {
        console.log('Oh no! Error: ', error);
    }
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('planets'));
}

function renderPlanet(planetLatinName) {
    document.querySelector('.wrapper--solar-system').classList.add('hide');
    document.querySelector('nav').classList.remove('hide');

    // Hämtar alla planeter och nödvändiga element
    let planets = getLocalStorage();
    let wrapper = document.querySelector('.wrapper--planet');
    let pageEl = document.getElementById('page');

    wrapper.classList.remove('hide');
    wrapper.innerHTML = '';

    planets.forEach(planet => {
        // Villkor för att rendera rätt planet
        if (planetLatinName === planet.latinName) {
            // Skapar HTML
            let planetCard = createPlanetHTML(planet);
            // Lägg till element i rätt förälder och rendera ut i UI och uppdatera paginaiton
            wrapper.append(planetCard);
            pageEl.innerHTML = planet.id; 
            
            // Lägger till eventlyssnare på starIcon för "favoriter"
            let starIcon = planetCard.querySelector('.svg--star');
            starIcon.addEventListener('click', () => starToggle(starIcon, planet));
        }
    })
}

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
    
    // Om elementet inte har klassen hide sedan innan,
    // ska sökresultat och söksträng rensas
    if (!searchInput.classList.contains('hide')) {
        searchInput.value = '';
        search(searchInput);
    }
    
    searchInput.classList.toggle('hide');
    searchInput.addEventListener('input', (event) => search(event.target));
})

starIcon.addEventListener('click', () => {
    let starredPlanetsEl = document.getElementById('starred-planets');
    starredPlanetsEl.classList.toggle('hide');
    starredPlanetsUI();
})

pagination.forEach(button => {
    button.addEventListener('click', () => {
        // Hämta id för planeten som visas
        let currentPlanetID = parseInt(document.getElementById('page').innerHTML);
        let planets = getLocalStorage();
        // Sätt index till planetens ID
        let index = currentPlanetID;

        // Uppdatera id
        if (currentPlanetID > 0 && button.dataset.planet === 'previous') {
            index = index -1;
        } else if (currentPlanetID < 8 && button.dataset.planet === 'next') {
            index = index +1;
        } 

        let newPlanet = planets[index].latinName;
        renderPlanet(newPlanet);
    })
});

export { getLocalStorage, renderPlanet };