import { getLocalStorage, renderPlanet } from "./main.js";

function search(inputString) {
    inputString = inputString.value.toLowerCase();
    let planets = getLocalStorage();
    let searchResults = [];

    // Om inputString är längre än noll, loopa över planeter 
    // och pusha i searchResults om matchning med inputString finns
    if (inputString.length > 0) {
        for (let i = 0; i < planets.length; i++) {
    
            let planetName = planets[i].name.toLowerCase();
            let planetLatinName = planets[i].latinName.toLowerCase();
            let planetMoons = planets[i].moons;
    
            if (planetName.includes(inputString) || planetLatinName.includes(inputString)) {
                searchResults.push(planets[i])
            } 
    
            planetMoons.forEach(moon => {
                // Om måne finns och planeten inte tidigare finns i sökresultaten
                if (moon.toLowerCase().includes(inputString) && searchResults.indexOf(planets[i]) < 0) {
                    searchResults.push(planets[i])
                }
            });
        }
    }
    renderSearchResults(searchResults, inputString);
}

function renderSearchResults(results, inputString) {
    let searchSection = document.querySelector('.search-section');
    let ulEl = document.querySelector('.search-results');

    // Om ulEl finns - töm. Annars - skapa.
    if (ulEl) {
        ulEl.innerHTML = '';
    } else {
        ulEl = document.createElement('ul');
        ulEl.classList.add('search-results');
    }

    // Om inga resultat hittas, skriv ut meddelande. Annars renderera ut resultat.
    if (!results.length && inputString.length > 0) {
        let message = document.createElement('li');
        message.classList.add('message');
        message.innerHTML = 'Oops, inget hittades!';
        ulEl.insertAdjacentElement('afterbegin', message);
    } else {
        results.forEach(result => {
            let liEl = document.createElement('li');
            liEl.innerHTML = result.name;
            liEl.addEventListener('click', () => {
                renderPlanet(result.latinName);
            })
            ulEl.appendChild(liEl);
        })
        searchSection.insertAdjacentElement('afterbegin', ulEl)
    }

}

export { search };
