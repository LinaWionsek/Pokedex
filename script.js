let allPokemon = []
let currentPokemon;
// 9 oder 19 durchlauefe bei 152 pokemon j
async function loadAllPokemon() {
    let j = 1
    for (let i = j; i < j + 20; i++) {

        await loadPokemon(i);
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
                <div class="previewCard-Pokemon-Id h5">#${pokemon['id']}</div>
               
                
                <div class="d-flex w-100">
                    <div class="previewCard-details">
                    <div class="Pokemon-Name text-capitalize h5">${pokemon['name']}</div>
                        <div class="pokemon-type-tag" style = "background-color: ${findColorTag(pokemon, type)}">${type}</div> 
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
        secondType = `<div class="pokemon-type-tag secondType" style = "background-color: ${findColorTag(pokemon, types[1]['type']['name'])}">${types[1]['type']['name']}</div>`;
    }
    return secondType;
}


function openPokemonCard(i) {
    let pokemon = allPokemon[i - 1]
    document.getElementById('hide_pokemon_card').classList.remove("d-none");
    renderPokemonCard(pokemon)
    valueBar(pokemon)
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
                <div class="pokemonCard-id h5 mb-0">#${pokemon['id']}</div>
                <div class="Pokemon-Name h2 d-flex w-100 text-capitalize">${pokemon['name']}</div>
               
                <div class="pokemonCard-pokemon-type">
                    <div class="pokemon-type-tag " style = "background-color: ${findColorTag(pokemon, type)}">${type}</div>
                    ${secondType} 
                </div> 
            </div>
            
            <div class="info-container">
                <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                <nav class="info-nav">
                    <b><a style= "color: ${findColor(pokemon, type)};">About</a></b> 
                    <b><a style= "color: ${findColor(pokemon, type)};">Base Stats</a></b>
                    <b><a style= "color: ${findColor(pokemon, type)};">Evolution</a></b>
                    <b><a style= "color: ${findColor(pokemon, type)};">Moves</a></b>
                </nav>
              
                <div class="info-content">   
                    <div class="stats-container">
                        ${pokemon['stats'].map(s => `
                        <div class="stats"><span class="stat-name">${s['stat']['name']}</span>
                            <span class="stat-value">${s['base_stat']}</span>
                            <div class="progress bar-height-width" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar" style="width: ${s['base_stat']}%; height=20px; background-color: ${findColor(pokemon, type)};"></div>
                            </div>
                        </div>`).join(' ')}
                    </div>       
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
        case 'normal':
            return '#9fa0a8'
        case 'fire':
            return '#fe8128'
        case 'water':
            return '#448dd7'
        case 'electric':
            return '#eed432'
        case 'grass':
            return '#5fb854'
        case 'ice':
            return '#5fcdc0'
        case 'fighting':
            return '#d04164'
        case 'poison':
            return '#a653cc'
        case 'ground':
            return '#dc7843'
        case 'flying':
            return '#7590c8'
        case 'psychic':
            return '#e95b5d'
        case 'bug':
            return '#8eb335'
        case 'rock':
            return '#baa781'
        case 'ghost':
            return '#5066ab'
        case 'dragon':
            return '#0c68bf'
        case 'dark':
            return '#57565a'
        case 'steel':
            return '#448097'
        case 'fairy':
            return '#ee6ec8'


        default:
            // console.log(type)
            return '#767676'
    }
}

function findColorTag(pokemon, type) {
    // let type = allPokemon[i - 1]['types'][0]['type']['name'];
    switch (type) {
        case 'normal':
            return '#8d8e96';
        case 'fire':
            return '#fd6f0a';
        case 'water':
            return '#3d7ebf';
        case 'electric':
            return '#ebce17';
        case 'grass':
            return '#55984f';
        case 'ice':
            return '#55b0a9';
        case 'fighting':
            return '#bd3b57';
        case 'poison':
            return '#9750bf';
        case 'ground':
            return '#c56e3f';
        case 'flying':
            return '#6987b2';
        case 'psychic':
            return '#d85456';
        case 'bug':
            return '#7fa12f';
        case 'rock':
            return '#a49276';
        case 'ghost':
            return '#455196';
        case 'dragon':
            return '#0b60aa';
        case 'dark':
            return '#504f54';
        case 'steel':
            return '#3c738c';
        case 'fairy':
            return '#d85ebe';
        
        default:
            // console.log(type)
            return '#6b6b6b';
    }
}