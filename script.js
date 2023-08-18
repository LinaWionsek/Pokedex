let allPokemon = []
let currentPokemon;
let counter;


async function loadAllPokemon() {
    let j = 1
    for (let i = j; i < j + 15; i++) {

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
    let pokemon = allPokemon[i - 1]; //aktuelles Pokemon -1 weil das Array mit 0 anfängt aber die Pokemon bei 1 anfängt
    document.getElementById('content').innerHTML += createPreviewCardHTML(pokemon);
}

function createPreviewCardHTML(pokemon) {

    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);

    let i = pokemon['id'];
    return /*html*/ `
            <div onclick="openPokedex(${i})" class="previewCard" style = "background-color: ${findColor(pokemon, type)}">
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

function openPokedex(i) {
    let pokemon = allPokemon[i - 1]
    document.getElementById('pokedex').classList.remove("d-none");
    renderPokedex(pokemon);
}


// Name, Bild
function renderPokedex(pokemon) {
    document.getElementById('pokedex').innerHTML = createPokemonCardHTML(pokemon)
   
}


function nextPokemon(pokemonId) {
    let pokemon;
    if (pokemonId == allPokemon.length) {
        pokemon = allPokemon[0];
    } else {
        pokemon = allPokemon[pokemonId];
    }

    renderPokedex(pokemon);
}

function lastPokemon(pokemonId) { //das i was übergeben wird ist Pokemon id i --> die id fängt bei 1 an aber das allPokemon array bei 0
    let pokemon;
    if (pokemonId == 1) {
        pokemon = allPokemon[allPokemon.length - 1]; //length = Anzahl der Slots (Gesamtlänge!) -- 
        //length-1 = letzter Eintrag weil wenn er die Zahl der Gesamtlänge abrufen würde würde er undefined sagen weil array zahlen ja mit 0 anfangen 
    } else {
        pokemon = allPokemon[pokemonId - 2];
    }

    renderPokedex(pokemon);
}

function createPokemonCardHTML(pokemon) {
    
    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);
    let i = pokemon['id'];
    // counter = i;


    return /*html*/ `

    <div class="detail" style = "background-color: ${findColor(pokemon, type)}">
           
                    
                
                <div class="detail-header">
                    <div class="close-card">
                        <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                    </div>
                    <div class="pokemonCard-id h5">#${i}</div>
                    <div class="Pokemon-Name h3 text-capitalize">${pokemon['name']}</div>
                    <div class="types-container">
                    <div class="pokemon-type-tag " style = "background-color: ${findColorTag(pokemon, type)}">${type}</div>
                    ${secondType}  
                    </div>
                    <div class="pokemonImage-container">
                        <div class="pokemonImage-background" style = "background-color: ${findColorTag(pokemon, type)}">
                            <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                        </div>
                    </div>
                </div>
                

            <div class="detail-footer">
                <div class="back-forward">
                    <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fill-rule="nonzero"/></svg>
                    <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fill-rule="nonzero"/></svg>    
                </div>
                <div class="navigation-container">  
                    <a style= "color: ${findColor(pokemon, type)};">About</a>
                    <a style= "color: ${findColor(pokemon, type)};">Base&nbspStats</a>
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style= "color: ${findColor(pokemon, type)};">
                            More
                            </a>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Evolution</button></li>
                            <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Moves</button></li>
                            <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Something else here</button></li>
                        </ul>
                    </div> 
                </div>

                   
                <div class="stats-container">
                    ${pokemon['stats'].map(s => `
                    <div id="statID" class="stats"><span class="stat-name">${s['stat']['name']}</span>
                        <span class="stat-value">${s['base_stat']}</span>
                        <div class="progress-hide progress bar-height-width" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: ${s['base_stat']}%; height=20px; background-color: ${findColor(pokemon, type)};"></div>
                        </div>
                    </div>`).join(' ')}
                </div>    
            </div> 
    </div>
            
  
          
            `;
}




// function openDialog() {
//     document.getElementById('dialog').classList.remove('d-none');
// }

function closePokedex() {
    document.getElementById('pokedex').classList.add('d-none');
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