async function fetchData() {
    const API_URL = ('https://majazocom.github.io/Data/solaris.json');

    let data = await fetch (API_URL);
    data = await data.json();
    console.log(data);
}

fetchData();