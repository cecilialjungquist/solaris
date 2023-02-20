// Kan rotation compare to earth vara kul att göra som animering i css? ta prop rotation och sätt som ms

const planetsUI = document.querySelectorAll('.all-planets article');

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
    })
})

async function renderPlanet(planetToRender) {
    let planets = await fetchData();
    let article = document.createElement('article');
    let imgSection =  document.createElement('section');
    let infoSection =  document.createElement('section');

    article.classList.add('planet');
    imgSection.classList.add('planet__img');
    infoSection.classList.add('planet__info');

    planets.forEach(planet => {
        if (planetToRender === planet.latinName) {
            console.log(planet.name);
            // createImgEl(planet.latinName);
            // ^ Ska läggas i något 
            // createHeaderEl(planet)


            
        }
    })
}