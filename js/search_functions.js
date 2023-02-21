import { fetchData, renderPlanet } from "./main.js";

async function search(input) {
    input = input.toLowerCase();
    let planets = await fetchData();
    // console.log(data);

    let searchResultPlanet = planets.find(planet => planet.name.toLowerCase() === input || planet.latinName.toLowerCase() === input);
    console.log(searchResultPlanet);
    if (searchResultPlanet) {
        renderPlanet(searchResultPlanet.latinName);
    } else {
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

export { search };
