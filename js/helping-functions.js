async function getSearchedPokemon() {
    let search_query = document.getElementById('searchQuery').value;
    
    if (search_query.length < 3) {
        return;
    }
   
    let newUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000'
    // console.log(newUrl)
    let data = await fetchApiReturnAsJson(newUrl);
   
 
    for (let i = 0; i < data.results.length; i++) {
       
        let tester = data.results[i].name
        if (tester.match(search_query)){
            // console.log(tester.match(search_query))
           result
        }


   
    // let newstuff = data.results.find(record => record.name === searchedPokemon)
}
    // result
    // let url = 'https://pokeapi.co/api/v2/pokemon/' + result
    // let pokemon = await fetchApiReturnAsJson(url);
    // renderSearchedPokemon(pokemon);
}

// let newstuff = data.results.find(record => record.name === searchedPokemon)
// console.log(newstuff)


function renderSearchedPokemon(pokemon) {
    document.getElementById('content').innerHTML = /*html*/ `<div id="pokedex" class="dialog-bg d-none"></div>`
    document.getElementById('content').innerHTML += createPreviewCardHTML(pokemon);
  }


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