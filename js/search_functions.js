import { fetchData, renderPlanet } from "./main.js";

async function search(input) {
    input = input.toLowerCase();
    let planets = await fetchData();
    // console.log(data);

    let searchResultPlanet = planets.find(planet => planet.name.toLowerCase() === input || planet.latinName.toLowerCase() === input);
    // console.log(searchResultPlanet);
    
    // Om planet hittades
    if (searchResultPlanet) {
        renderPlanet(searchResultPlanet.latinName);
    } else {
        // Annars loppa genom månar
        planets.find(planet => planet.moons.forEach(moon => {
            if (moon.toLowerCase() === input) {
                searchResultPlanet = planet;
                renderPlanet(searchResultPlanet.latinName)
            }
        }));

        // Om inget resultat finns, skriv ut hjälpmeddelande
        if (!searchResultPlanet) {
            let searchSection = document.querySelector('.search-section');
            let message = document.createElement('p');
            message.innerHTML = 'Oops, inget hittades!'
            searchSection.insertAdjacentElement('afterbegin', message)
    
            // Dålig ux?
            setTimeout(() => {
                message.remove();
            }, 3000);
        }
    }
}

export { search };
