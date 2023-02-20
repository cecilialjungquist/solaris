// Kan rotation compare to earth vara kul att göra som animering i css? ta prop rotation och sätt som ms

import { createImgEl, createHeaderEl, createLineEl, createSectionEl, createMoonEl } from "./create_functions.js";

const planetsUI = document.querySelectorAll('.all-planets article');
const sunUI = document.getElementById('sun');

async function fetchData() {
    const API_URL = ('https://majazocom.github.io/Data/solaris.json');
    let data = await fetch(API_URL);
    data = await data.json();
    console.log(data);
    
    return data;
}

fetchData();

planetsUI.forEach(planetUI => {
    planetUI.addEventListener('click', () => {
        let planetToRender = planetUI.getAttribute('name');
        // console.log(planetUI.getAttribute('id'));
        renderPlanet(planetToRender);
        document.querySelector('.wrapper--solar-system').classList.add('hide');
    })
})

sunUI.addEventListener('click', () => {
    let sun = sunUI.getAttribute('name');
    // console.log(planetUI.getAttribute('id'));
    renderPlanet(sun);
    document.querySelector('.wrapper--solar-system').classList.add('hide');
})



async function renderPlanet(planetToRender) {
    let planets = await fetchData();
    let wrapper = document.querySelector('.wrapper--planet');
    let article = document.createElement('article');
    let imgSection = document.createElement('section');
    let infoSection = document.createElement('section');
    let gridSection = document.createElement('section');

    article.classList.add('planet');
    imgSection.classList.add('planet__img');
    infoSection.classList.add('planet__info');
    gridSection.classList.add('planet__grid');

    planets.forEach(planet => {
        if (planetToRender === planet.latinName) {
            console.log(planet.name);
            let img = createImgEl(planet);
            // ^ Ska läggas imgSection 
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
        }
    })
}