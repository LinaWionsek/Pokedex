let allPokemon = []
let currentPokemon;
// 9 oder 19 durchlauefe bei 152 pokemon j
async function loadAllPokemon() {
    let j = 1
    for (let i = j; i < j + 40; i++) {
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
    let pokemon = allPokemon[i - 1];
    document.getElementById('pokedex').innerHTML += createPreviewCardHTML(pokemon);
}


function createPreviewCardHTML(pokemon) {

    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);

    let i = pokemon['id'];
    return /*html*/ `<div onclick="openPokemonCard(${i})" class="previewCard" style = "background-color: ${findColor(pokemon, type)}">
                <div class="previewCard-Pokemon-Id"><h3>#${pokemon['id']}</h3></div>
                <div class="Pokemon-Name text-capitalize h3">${pokemon['name']}</div>
                
                <div class="justify-content-around">
                    <div class="previewCard-Pokemon-Types">
                        <div class="pokemon-type-tag">${type}</div> 
                        ${secondType}
                    </div> 
                    <img src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                </div>
            </div>
    `;
}


function findFirstType(pokemon) {
    return pokemon['types'][0]['type']['name'];
}


function findSecondType(pokemon) {
    let types = pokemon['types'];
    let secondType = '';
    if (types[1]) {
        secondType = `<div class="pokemon-type-tag secondType">${types[1]['type']['name']}</div>`;
    }
    return secondType;
}


function openPokemonCard(i) {
    let pokemon = allPokemon[i - 1]
    document.getElementById('hide_pokemon_card').classList.remove("d-none");
    renderPokemonCard(pokemon)
    disableScroll();
}


function renderPokemonCard(pokemon) {
    document.getElementById('pokemonCard').innerHTML = createPokemonCardHTML(pokemon)
}


function createPokemonCardHTML(pokemon) {

    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);

    return /*html*/ `
            <div id="pokemon" style = "background-color: ${findColor(pokemon, type)}">
                <div class="arrow" onclick="closeCard()">
                <img class="arrow" src="img/left-arrow.png" alt="">
                </div>
                <div class="pokemonCard-id h6 mb-0">#${pokemon['id']}</div>
                <div class="Pokemon-Name h2 d-flex w-100 text-capitalize">${pokemon['name']}</div>
               
                <div class="pokemonCard-pokemon-type">
                <div class="pokemon-type-tag">${type}</div>
                ${secondType} 
                </div> 
                </div>
            </div>
            
            <div class="info-container">
                
            <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
            <div id="pokemonName"></div>
            <div id="stats">
                <div id="hp"></div>
                <div id="hpValue"></div>
            </div>
            </div>
    `;
}

function closeCard() {
    document.getElementById('hide_pokemon_card').classList.add("d-none");
    enableScroll();
}


function disableScroll() {
    document.body.classList.add("remove-scrolling");
}


function enableScroll() {
    document.body.classList.remove("remove-scrolling");
}



function findColor(pokemon, type) {
    // let type = allPokemon[i - 1]['types'][0]['type']['name'];
    switch (type) {
        case 'grass':
            return '#46d1b1' //#75b658 3 #c5dcae 2 #46d1b1 1
        case 'bug':
            return '#75b658' //c7de9f 1
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