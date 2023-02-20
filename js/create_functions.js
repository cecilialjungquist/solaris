function createImgEl(planet) {
    let img = document.createElement('img');
    let src = `img/${planet.latinName.toLowerCase()}.png`;
    img.setAttribute('src', src);
    
    console.log(img)
    return img;
}

function createHeaderEl(planet) {
    let header = document.createElement('header');
    header.classList.add('planet__header');
    header.innerHTML = `
    <h1>${planet.name}</h1>
    <h2>${planet.latinName}</h2>
    <p>${planet.desc}</p>
    `;
    console.log(header);
    return header;
}

function createLineEl() {
    let line = document.createElement('div')
    line.classList.add('line');

    console.log(line);
    return line;
}

function createSectionEl(heading, paragraph, unit) {
    let section = document.createElement('section');
    section.classList.add('grid__section');
    section.innerHTML = `
    <h3>${heading}</h3>
    <p>${paragraph} ${unit}</p>
    `;

    console.log(section);
    return section;
}

export { createImgEl, createHeaderEl, createLineEl, createSectionEl };