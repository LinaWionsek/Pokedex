let allPokemon = [];
let allChar = [];
let counter;
let currentPokemon;
let newPokemon
let offsetNumber = 0
let limitNumber = 10
let nextUrl;

async function loadPokemon(url) {
    let response = await fetch(url);
    let currentPokemon = await response.json(); // JSON 
    // kein let vor nextUrl deshalb wird die globale Variable benutzt!
    nextUrl = currentPokemon['next'] 
    return currentPokemon;
}

// offsetNumber change um 20 - 20 40 60 80 100
async function getURL() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offsetNumber + '0&limit=' + limitNumber;
    let currentPokemon =  await loadPokemon(url)

    
    let getPokemonApiURLs = currentPokemon['results']
 
    for (let i = 0; i < getPokemonApiURLs.length; i++) {
        const getPokemonApiURL = getPokemonApiURLs[i]['url']; 
        // console.log(getPokemonApiURL)
        loadPokemonAsJSON(getPokemonApiURL)
    }
}

async function loadPokemonAsJSON(getPokemonApiURL) {
    let response = await fetch(getPokemonApiURL);
    let currentPokemon = await response.json(); // JSON 
    let pokemon = currentPokemon
    // console.log(pokemon)
    renderPokemonPreviewCard(pokemon);
    // for (let i = 0; i < pokemon.length; i++) {
    //     const onePokemon = pokemon[i];
    // }
}

function renderPokemonPreviewCard(pokemon){
    document.getElementById('content').innerHTML += createPreviewCardHTML(pokemon);
    
}

function createPreviewCardHTML(pokemon) {
    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);
   
   
  
    return /*html*/ `
         
            <div onclick="openPokedex(${pokemon['id']})" class="previewCard" style = "background-color: ${findColor(pokemon, type)}">
            <div class="previewCard-Pokemon-Id h5">#${pokemon['id']}</div>
            <div class="d-flex w-100">
                <div class="previewCard-details">
                <div class="Pokemon-Name h5">${pokemon['name']}</div>
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
        secondType = `<div class="pokemon-type-tag" style = "background-color: ${findColorTag(pokemon, types[1]['type']['name'])}">${types[1]['type']['name']}</div>`;
    }
    return secondType;
}


async function openPokedex(i) {
    let pokemon = await loadPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
    console.log("openPokedex", pokemon)
    document.getElementById('pokedex').classList.remove("d-none");
    renderPokedex(pokemon);
}


// function renderPokedex(pokemon) {
//     let i = pokemon['id'];
//     document.getElementById('pokedex').innerHTML = createPokemonCardHTML(pokemon);
//     renderAbout(i);
// }


// function createPokemonCardHTML(pokemon) {
//     let type = findFirstType(pokemon);
//     let secondType = findSecondType(pokemon);
//     let i = pokemon['id'];
//     // counter = i;
//     return /*html*/ `
//         <div class="detail" id="detailID" style = "background-color: ${findColor(pokemon, type)}">              
//             <!--  DETAIL HEADER   -->   
//             <div class="detail-header">
//                 <div onclick="closePokedex()" class="close-card">
//                     <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
//                 </div>
//                 <div class="pokemonCard-id h5">#${i}</div>
//                 <div class="types-container">
//                     <div class="Pokemon-Name h3">${pokemon['name']}</div>
//                     <div class="pokemon-type-tag " style = "background-color: ${findColorTag(pokemon, type)}">${type}</div>
//                     ${secondType}  
//                 </div>
//                 <div class="pokemonImage-container">
//                     <div class="pokemonImage-background" style = "background-color: ${findColorTag(pokemon, type)}">
//                         <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
//                     </div>
//                 </div>
//             </div>
//             <!--  DETAIL FOOTER   -->
//             <div>
//                 <div class="back-forward">                    
//                     <div onclick="lastPokemon(${i})"><img class="arrow" src="./img/left.png"></div>
//                     <div onclick="nextPokemon(${i})"><img class="arrow" src="./img/right.png"></div>
//                 </div>

//                 <div class="navigation-container">  
//                     <a onclick="renderAbout(${i})" style= "color: ${findColor(pokemon, type)};">About</a>
//                     <a onclick="renderStats(${i})" style= "color: ${findColor(pokemon, type)};">Base&nbspStats</a>
//                     <div class="dropdown">
//                         <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style= "color: ${findColor(pokemon, type)};">
//                             More
//                             </a>
//                         <ul class="dropdown-menu">
//                             <li><button onclick="renderEvolutionchain(${i})" class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Evolution</button></li>
//                             <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Moves</button></li>
//                             <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Something else here</button></li>
//                         </ul>
//                     </div> 
//                 </div>
//                 <!--  INFORMATIONS   -->
//                 <div id="informationContainer"></div>
//             </div> 
//     </div>     
//     `;

// }


// function nextPokemon(pokemonId) {
//     let pokemon;
//     if (pokemonId == allPokemon.length) {
//         pokemon = allPokemon[0];
//     } else {
//         pokemon = allPokemon[pokemonId];
//     }
//     renderPokedex(pokemon);
// }


// function lastPokemon(pokemonId) { //das i was übergeben wird ist Pokemon id i --> die id fängt bei 1 an aber das allPokemon array bei 0
//     let pokemon;
//     if (pokemonId == 1) {
//         pokemon = allPokemon[allPokemon.length - 1]; //length = Anzahl der Slots (Gesamtlänge!) -- 
//         //length-1 = letzter Eintrag weil wenn er die Zahl der Gesamtlänge abrufen würde würde er undefined sagen weil array zahlen ja mit 0 anfangen 
//     } else {
//         pokemon = allPokemon[pokemonId - 2];
//     }

//     renderPokedex(pokemon);
// }


// function renderAbout(i) {
//     let pokemon = allPokemon[i - 1]
//     let char = allChar[i - 1]
//     // console.log(char)
//     document.getElementById('informationContainer').innerHTML = createAboutHTML(char, pokemon)
// }


// function createAboutHTML(char, pokemon) {
//     let type = findFirstType(pokemon);
//     let height = pokemon['height'] * 0.1;
//     let weight = pokemon['weight'] * 0.1;

//     return /*html*/ `
//     <div class="about">
//         <div class="description"> ${char['descriptions'][7]['description']}</div>
//         <div class="about-section">
//             <div class="font-weight500"> Height</div>
//             <div>${fixNumber(height)}m</div>
//         </div>
//         <div class="about-section">   
//             <div class="font-weight500"> Weight</div>
//             <div> ${fixNumber(weight)}kg</div>
//         </div>
//         <div class="about-section">
//             <div class="font-weight500">Abilities</div>
//             <div class="abilities">
//                 <div>${findFirstAbility(pokemon)}</div> 
//                     ${findSecondAbility(pokemon)}
//             </div>
//         </div>
//     </div>

//     `;
// }


// function fixNumber(nr) {
//     let fix = nr.toFixed(2);
//     return fix;
// }


// function findFirstAbility(pokemon) {
//     return pokemon['abilities']['0']['ability']['name'];
// }


// function findSecondAbility(pokemon) {
//     let abilities = pokemon['abilities'];
//     let secondAbility = '';
//     if (abilities[1]) {
//         secondAbility = `<div> &nbsp;${abilities[1]['ability']['name']}</div>`;
//     }
//     return secondAbility;
// }


// function renderStats(i) {
//     let pokemon = allPokemon[i - 1]
//     document.getElementById('informationContainer').innerHTML = createStatsHTML(pokemon)
// }


// function createStatsHTML(pokemon) {
//     let type = findFirstType(pokemon);
//     let secondType = findSecondType(pokemon);
//     return /*html*/ `
//     ${pokemon['stats'].map(s => `
//                     <div id="statID" class="stats"><span class="stat-name">${s['stat']['name']}</span>
//                         <span class="stat-value">${s['base_stat']}</span>
//                         <div class="progress-hide progress bar-height-width" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
//                             <div class="progress-bar" style="width: ${s['base_stat']}%; height=20px; background-color: ${findColor(pokemon, type)};"></div>
//                         </div>
//                     </div>`).join(' ')}

//    `
// }


// function closePokedex() {
//     document.getElementById('pokedex').classList.add('d-none');
// }



// async function loadCharacteristic(i) {
//     let url = 'https://pokeapi.co/api/v2/characteristic/' + i;
//     let response = await fetch(url);
//     let currentCharacteristic = await response.json(); // JSON 
//     allChar.push(currentCharacteristic);
// }