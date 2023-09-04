async function getSearchedPokemon() {
    let search_query = document.getElementById('searchQuery').value;
    // let url = 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon
    // let pokemon = await fetchApiReturnAsJson(url);
    // renderSearchedPokemon(pokemon);
    let newUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000'
    // console.log(newUrl)
    let data = await fetchApiReturnAsJson(newUrl);
    

  
    for (let i = 0; i < data.results.length; i++) {
        let tester = data.results[i].name
        // console.log(tester)
        if (tester.match(search_query)){
            console.log(tester.match(search_query))
           
        }
   
    // let newstuff = data.results.find(record => record.name === searchedPokemon)
}}

// let newstuff = data.results.find(record => record.name === searchedPokemon)
// console.log(newstuff)


// function renderSearchedPokemon(pokemon) {
//     document.getElementById('content').innerHTML = /*html*/ `<div id="pokedex" class="dialog-bg d-none"></div>`
//     document.getElementById('content').innerHTML += createPreviewCardHTML(pokemon);
//   }


function fixNumber(nr) {
    let fix = nr.toFixed(2);
    return fix;
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (const element of includeElements) {
        const file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}