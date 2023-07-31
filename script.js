let allPokemon = []
// 9 oder 19 durchlauefe bei 152 pokemon j
async function loadAllPokemon() {
    let j = 1
    for (let i = j; i < j + 10; i++) {
        await loadPokemon(i)
        renderPokemonPreviewHTML(i);
    }
}


async function loadPokemon(i) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
    let response = await fetch(url);
    let currentPokemon = await response.json(); // JSON 
    allPokemon.push(currentPokemon);
}


function renderPokemonPreviewHTML(i) {
    let types = allPokemon[i - 1]['types'];
    let type = types[0]['type']['name'];
    let secondType = '';
    if (types[1]) {
        secondType = `<div class="pokemon-type-tag typeTwo">${types[1]['type']['name']}</div>`;
    }

    document.getElementById('pokedex').innerHTML += createPreviewCardHTML(i);
}


function createPreviewCardHTML(i) {
    let types = allPokemon[i - 1]['types'];
    let type = types[0]['type']['name'];
    let secondType = '';
    if (types[1]) {
        secondType = `<div class="pokemon-type-tag typeTwo">${types[1]['type']['name']}</div>`;
    }

    return /*html*/ `
    <div onclick="openPokemonCard(${i})" class="previewCard" style = "background-color: ${findColor(i, type)}">
                <div class="previewCard-Pokemon-Id">#${allPokemon[i - 1]['id']}</div>
                <div class="previewCard-Pokemon-Name"><h4>${allPokemon[i - 1]['name']}<h4></div>
                
                <div class="justify-content-around">
                    <div class="previewCard-Pokemon-Types">
                        <div class="pokemon-type-tag">${type}</div> 
                        ${secondType}
                    </div> 
                    <img src="${allPokemon[i - 1]['sprites']['other']['official-artwork']['front_default']}"/>
                </div>
            </div>
    `;
}

function openPokemonCard(i) {
    document.getElementById('hide_pokemon_card').classList.remove("d-none");
    renderPokemonCard(i)
    disableScroll();
}


function renderPokemonCard(i) {
    let pokemon = allPokemon[i - 1];
    let stats = pokemon['stats'];

    let types = allPokemon[i - 1]['types'];
    let type = types[0]['type']['name'];
    let secondType = '';
    if (types[1]) {
        secondType = `<div class="pokemon-type-tag typeTwo">${types[1]['type']['name']}</div>`;
    }

    document.getElementById('pokemonCard').innerHTML += createPokemonCardHTML(i)
            
}


function createPokemonCardHTML(i) {
let pokemon = allPokemon[i - 1];
    return /*html*/ `
            <div id="pokemon">test2</div>
            <div class="info-container">
            <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
            <div id="pokemonName">Name2</div>
            <div id="stats">
                <div id="hp"></div>
                <div id="hpValue"></div>
            </div>
            </div>
    `;
}


function disableScroll() {
    document.body.classList.add("remove-scrolling");
}


function enableScroll() {
    document.body.classList.remove("remove-scrolling");
}



function findColor(i, type) {
    // let type = allPokemon[i - 1]['types'][0]['type']['name'];
    switch (type) {
        case 'grass':
            return '#75b658' //#75b658 3 #c5dcae 2 #46d1b1 1
        case 'bug':
            return '#c7de9f'
        case 'fire':
            return '#fb6c6c'
        case 'water':
            return '#77befe'
        case 'electric':
            return '#ffd86f' //#ffce4b-dunkler
        case 'ghost':
            return '#8d5c9f'//#8d5c9f #7d528d 1
        case 'fighting':
            return '#cb7f72' //#cfd6e3 #c43027 -rot #bb5544
        case 'ground':
            return '#faebc2'
        case 'rock':
            return '#49465b'
        case 'psychic':
            return '#ef7295'
        case 'poison':
            return '#bd94e0'

        // case 'normal': 
        //     return '#faebc2'
        // #9553cd
        default:
            // console.log(type)
            return 'lightgrey'
    }
}