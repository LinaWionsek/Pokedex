let allPokemon = []
let currentPokemon;
// 9 oder 19 durchlauefe bei 152 pokemon j
async function loadAllPokemon() {
    let j = 1
    for (let i = j; i < j + 100; i++) {

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
                    <div class="pokemon-type-tag " style = "background-color: ${findColorFirstTag(pokemon, type)}">${type}</div>
                    ${secondType} 
                </div> 
            </div>
            
            <div class="info-container">
                
                <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                <nav class="info-nav"><b>Base Stats</b></nav>
              
                <div class="info-content">

                    <div class="stats-container">
                        <div class="stats">
                            <div class="stat-name">${pokemon['stats'].map(s => `<span>${s['stat']['name']}</span>`).join(' ')}</div>
                            <div class="stat-value">${pokemon['stats'].map(s => `<span>${s['base_stat']}</span>`).join(' ')}</div>
                        </div>

                        <div id="value-bar" class="bars">
                           
                        <div>   


                    </div>
                    

                </div>  
            </div>   
    `;
}

function valueBar(pokemon) {
    let rates = pokemon['stats'].map(s => `${s['base_stat']}`)
    console.log(rates);
    console.log(rates.length);

    for (let i = 0; i < rates.length; i++) {
        console.log(i)
        const rate = rates[i]
        document.getElementById('value-bar').innerHTML += `
            <div class="progress bar-height w-100" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${rates[i]}%" height="20px"></div>
            </div>
        `;
        //  document.getElementById('value-bar${i}').style += `width: ${rates[i]}%`;
    }

    // document.getElementById('value-bar').style = `width: ${value}%`;

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


function findColorFirstTag(pokemon, type) {
    // let type = allPokemon[i - 1]['types'][0]['type']['name'];
    switch (type) {
        case 'normal':
            return '#767676'
        case 'fire':
            return '#767676'
        case 'water':
            return '#767676'
        case 'electric':
            return '#767676'
        case 'grass':
            return '#767676'
        case 'ice':
            return '#767676'
        case 'poison':
            return '#767676'
        case 'ground':
            return '#767676'
        case 'flying':
            return '#767676'
        case 'psychic':
            return '#767676'
        case 'bug':
            return '#767676'
        case 'rock':
            return '#767676'
        case 'ghost':
            return '#767676'
        case 'dragon':
            return '#767676'
        case 'dark':
            return '#767676'
        case 'steel':
            return '#767676'
        case 'fairy':
            return '#767676'


        default:
            // console.log(type)
            return '#767676'
    }
}

/*  */

function findColor(pokemon, type) {
    // let type = allPokemon[i - 1]['types'][0]['type']['name'];
    switch (type) {
        case 'normal':
            return '#767676'
        case 'fire':
            return '#767676'
        case 'water':
            return '#767676'
        case 'electric':
            return '#767676'
        case 'grass':
            return '#767676'
        case 'ice':
            return '#767676'
        case 'poison':
            return '#767676'
        case 'ground':
            return '#767676'
        case 'flying':
            return '#767676'
        case 'psychic':
            return '#767676'
        case 'bug':
            return '#767676'
        case 'rock':
            return '#767676'
        case 'ghost':
            return '#767676'
        case 'dragon':
            return '#767676'
        case 'dark':
            return '#767676'
        case 'steel':
            return '#767676'
        case 'fairy':
            return '#767676'


        default:
            // console.log(type)
            return '#767676'
    }
}