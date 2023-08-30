let allPokemon = [];
let allChar = [];
let counter;
let currentPokemon;
let newPokemon
let offsetNumber = 0
let limitNumber = 20
let nextUrl;
let isAlreadyLoading = false;
let pokemon = "";
let pokemon1 = "";
let pokemon2 = "";
let pokemon3 = "";
let lvl1 = "";
let lvl2 = "";
// https://pokeapi.co/api/v2/evolution-chain/528/
// https://pokeapi.co/api/v2/generation/1/
// https://pokeapi.co/api/v2/pokemon-species/2/ generation -> name: generation-i url:https://pokeapi.co/api/v2/generation/1/
// evolution chain -> url: url mit link zu evolution chain

window.addEventListener('scroll', async function () {
  console.log("event outside")

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !isAlreadyLoading) {
    isAlreadyLoading = true
    console.log("event inside")
    await loadMorePokemon();
    isAlreadyLoading = false
  }
});

// Gibt Liste mit einzelenen PokemonURLs als JSON raus
async function fetchApiReturnAsJson(url) {
  let response = await fetch(url);
  let currentPokemon = await response.json(); // JSON 
  // console.log("erstes pokemon",currentPokemon)
  return currentPokemon;
}


// wenn trigger zb button lade die nächsten pokemon mit loadPokemonWithNextURL(nextUrl) danach renderallcards 
async function loadPokemonWithNextURL(url) {
  let currentPokemon = await fetchApiReturnAsJson(url); // genauso wie await response.json();
  // kein let vor nextUrl deshalb wird die globale Variable benutzt!
  // nextUrl wird erst gefüllt wenn loadPokemonWithNextURL ausgeführt wird
  nextUrl = currentPokemon['next'] //nextURL mit neuem offset 
  // console.log("NextURL", currentPokemon)
  return currentPokemon;
}

async function loadMorePokemon() {
  let currentPokemon = await loadPokemonWithNextURL(nextUrl)
  await renderAllCards(currentPokemon);

}

// offsetNumber change um 20 - 20 40 60 80 100
async function getURL() {
  let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offsetNumber + '0&limit=' + limitNumber;
  let currentPokemon = await loadPokemonWithNextURL(url)
  await renderAllCards(currentPokemon);
}

// Nimmt die einzelnen PokemonURLs ruas und gibt sie der loadPokemonAsJSON Funktion mit
async function renderAllCards(currentPokemon) {
  let getPokemonApiURLs = currentPokemon['results']
  for (let i = 0; i < getPokemonApiURLs.length; i++) {
    const getPokemonApiURL = getPokemonApiURLs[i]['url'];
    // console.log(getPokemonApiURL)
    await loadPokemonAsJSON(getPokemonApiURL)
  }
}
// Verwandelt PokeApiUrl in JSON mit den Daten die ich haben will
async function loadPokemonAsJSON(getPokemonApiURL) {
  let pokemon = await fetchApiReturnAsJson(getPokemonApiURL)
  // console.log("pokemon as jason", pokemon)
  renderPokemonPreviewCard(pokemon);
}

function renderPokemonPreviewCard(pokemon) {
  document.getElementById('content').innerHTML += createPreviewCardHTML(pokemon);
}

function createPreviewCardHTML(pokemon) {
  let type = findFirstType(pokemon);
  let secondType = findSecondType(pokemon);
  let i = pokemon['id']
  return /*html*/ `
    <div onclick="openPokedex(${i})" class="previewCard" style = "background-color: ${findColor(pokemon, type)}">
      <div class="previewCard-Pokemon-Id h5">#${pokemon['id']}</div>            
      <div class="d-flex w-100 previewCard-content">
            <div class="previewCard-details test:after">
                <div class="Pokemon-Name h5">${pokemon['name']}</div>
                <div class="pokemon-type-tag" style = "background-color: ${findColorTag(pokemon, type)}">${type}</div> 
                ${secondType}
            </div> 
           
            <img class="previewCardImg" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
            <img class="pokeball" src="img/pokeball.png" alt="">     
               
           
        </div>
    </div>
`;
}


async function openPokedex(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`)
  // console.log("openPokedex", pokemon)
  document.getElementById('pokedex').classList.remove("d-none");
  renderPokedex(pokemon);
}

function closePokedex() {
  document.getElementById('pokedex').classList.add('d-none');
  enableScroll();
}

window.addEventListener('mouseup', function (event) {
  document.getElementById('detailID');
  if (!(event.target.closest("#detailID"))) {
    closePokedex();
  }
});

function renderPokedex(pokemon) {
  let i = pokemon['id'];
  document.getElementById('pokedex').innerHTML = createPokemonCardHTML(pokemon);
  disableScroll();
  renderAbout(i);
}


function createPokemonCardHTML(pokemon) {
  let type = findFirstType(pokemon);
  let secondType = findSecondType(pokemon);
  let i = pokemon['id'];
  // counter = i;
  return /*html*/ `
        <div class="detail" id="detailID" style = "background-color: ${findColor(pokemon, type)}">              
            <!--  DETAIL HEADER   -->   
            
                <div class="detail-header">
                    
                        <div onclick="closePokedex()" class="close-card">
                            <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                        </div>
                        <div class="pokemonCard-id h5">#${i}</div>
                        <div class="types-container">
                            <div class="Pokemon-Name h3">${pokemon['name']}</div>
                            <div class="pokemon-type-tag " style = "background-color: ${findColorTag(pokemon, type)}">${type}</div>
                            ${secondType}  
                        </div>
                        <div class="pokemonImage-container">
                           <!-- <div class="pokemonImage-background" style = "background-color: ${findColorTag(pokemon, type)}"> -->
                                <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                            
                            <!-- </div> -->
                           
                        </div>
                        <img class="pokeball-pokedex" src="img/pokeball.png" alt="">
                </div>
 
            <!--  DETAIL FOOTER   -->
            <div>
                <div class="back-forward">                    
                    <div onclick="lastPokemon(${i})"><img class="arrow" src="./img/left.png"></div>
                    <div onclick="nextPokemon(${i})"><img class="arrow" src="./img/right.png"></div>
                </div>

                <div class="navigation-container">  
                    <a onclick="renderAbout(${i})" style= "color: ${findColor(pokemon, type)};">About</a>
                    <a onclick="renderStats(${i})" style= "color: ${findColor(pokemon, type)};">Base&nbspStats</a>
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style= "color: ${findColor(pokemon, type)};">
                            More
                            </a>
                        <ul class="dropdown-menu">
                            <li><button onclick="renderEvolutionchain(${i})" class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Evolution</button></li>
                            <li><button onclick="renderMoves(${i})" class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Moves</button></li>
                            <li><button class="dropdown-item" type="button" style= "color: ${findColor(pokemon, type)};">Something else here</button></li>
                        </ul>
                    </div> 
                </div>
                <!--  INFORMATIONS   -->
                <div id="informationContainer"></div>
            </div> 
    </div>     
    `;

}


async function nextPokemon(i) {
  let newI = i + 1
  let url = `https://pokeapi.co/api/v2/pokemon/${newI}`
  let pokemon = await fetchApiReturnAsJson(url)
  renderPokedex(pokemon);
}


async function lastPokemon(i) {
  let newI = i - 1
  let url = `https://pokeapi.co/api/v2/pokemon/${newI}`
  let pokemon = await fetchApiReturnAsJson(url)
  renderPokedex(pokemon);
}


async function renderAbout(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`)
  let species = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
  console.log("species", species)
  document.getElementById('informationContainer').innerHTML = createAboutHTML(pokemon, species)
  document.getElementById('informationContainer').classList.remove('add-scrolling');
}

async function renderMoves(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`)
  document.getElementById('informationContainer').innerHTML = createMovesHTML(pokemon);
  document.getElementById('informationContainer').classList.add('add-scrolling');
}

function createMovesHTML(pokemon) {
  let moves = pokemon['moves']
  let html = ""; //string
  console.log(moves.length)
  console.log(moves)

  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];

    console.log("MOVES-II", move['move']['name'])
    html += /*html*/ `
            <div>
                ${ move['move']['name']}
            </div>
        `;
    console.log("MOVES-I", move)
  }
  return html
}


// -------------------------------------------- CHAIN-NOTES --------------------------------------------
// let pokemon2URL = chain['evolves_to']['0']['species']['url']

// let pokemon3 = chain['evolves_to']['0']['evolves_to']['0']['species']['name']
// let pokemon3URL = chain['evolves_to']['0']['evolves_to']['0']['species']['url']


// let minLevel1 = chain['evolves_to']['0']['evolution_details']['0']['min_level']
// let minLevel2 = chain['evolves_to']['0']['evolves_to']['0']['evolution_details']['0']['min_level']

// let pokemon1 = chain['species']['name']
// let pokemon1URL = chain['species']['url']
// -------------------------------------------- CHAIN-NOTES --------------------------------------------
async function renderEvolutionchain(i) {
  let species = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
  let evolutionchainURL = species['evolution_chain']['url']
  let evolutionchain = await fetchApiReturnAsJson(evolutionchainURL)
  console.log("evolutionchain", evolutionchain)
  findChain(evolutionchain)
}


function findChain(evolutionchain) {
  let chain = evolutionchain['chain']
  //1. POKEMON
  pokemon1 = chain['species']['name']
  //PROOF IF 2. POKEMON EXISTS
  if (chain['evolves_to']) {
    for (let i = 0; i < chain['evolves_to'].length; i++) {
      const chainArr = chain['evolves_to'][i];
      findSecondPokemonForChain(chainArr);
      findMoreThanTwoPokemonForChain(chainArr);
    }
  } else {
    // let pokemon2 = "-";
    // let pokemon3 = "-";
    alert("only 1 pokemon!");
  }
  document.getElementById('informationContainer').innerHTML = createChainHTML(evolutionchain, pokemon1, pokemon2, pokemon3, lvl1, lvl2);
}

function findSecondPokemonForChain(chainArr){
  //2. Pokemon
  pokemon2 = chainArr['species']['name'];
  //PROOF IF MIN_LV FOR POKEMON2 EXISTS
  if (chainArr['evolution_details']['0']['min_level']) {
    lvl1 = chainArr['evolution_details']['0']['min_level'];
  } else {
    alert("no 1 lvl")
    lvl1 = "-"
  }
}

function findMoreThanTwoPokemonForChain(chainArr) {
  console.log("chainARR", chainArr);
  //PROOF IF 3. POKEMON EXISTS
  if (chainArr['evolves_to'].length != 0) {
    pokemon3 = chainArr['evolves_to']['0']['species']['name']
    //PROOF IF MIN_LV FOR POKEMON3 EXISTS
    if (chainArr['evolves_to']['0']['evolution_details']['0']['min_level']) {
      lvl2 = chainArr['evolves_to']['0']['evolution_details']['0']['min_level'];
    } else {
      alert("no 2 lvl")
      lvl2 = "-";
    }
  } else {
    alert("no 3 pokemon")
    pokemon3 = "";
  }
}

function createChainHTML(evolutionchain, pokemon1, pokemon2, pokemon3, lvl1, lvl2) {
  let chain = evolutionchain['chain']

  console.log("HTMLPokemon1", pokemon1)
  console.log("HTMLPokemon2", pokemon2)
  console.log("HTMLPokemon3", pokemon3)
  return /*html*/ `
    ${pokemon1}${ pokemon2}${pokemon3}${lvl1}${lvl2}
    `;
}
// async function loadPokemonAsJSON(getPokemonApiURL) {
//     let pokemon = await fetchApiReturnAsJson(getPokemonApiURL)
//     console.log("pokemon as jason",pokemon)
//     renderPokemonPreviewCard(pokemon);
// }


function createAboutHTML(pokemon, species) {
  let height = pokemon['height'] * 0.1;
  let weight = pokemon['weight'] * 0.1;
  let description = species['flavor_text_entries']['12']['flavor_text'];
  description = description.replace(/[^a-zA-Z,0-9.]/g, ' ');
  console.log("description", description)

  return /*html*/ `
    <div class="about">
        <div class="description">${description}</div>
        <div class="about-section">
            <div class="font-weight500"> Height</div>
            <div>${fixNumber(height)}m</div>
        </div>
        <div class="about-section">   
            <div class="font-weight500"> Weight</div>
            <div> ${fixNumber(weight)}kg</div>
        </div>
        <div class="about-section">
            <div class="font-weight500">Abilities</div>
            <div class="abilities">
                <div>${findFirstAbility(pokemon)}</div> 
                    ${findSecondAbility(pokemon)}
            </div>
        </div>
    </div>
    `;
}

async function renderStats(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`)
  document.getElementById('informationContainer').innerHTML = createStatsHTML(pokemon)
  document.getElementById('informationContainer').classList.remove('add-scrolling');
}


function createStatsHTML(pokemon) {
  let type = findFirstType(pokemon);
  return /*html*/ `
    ${pokemon['stats'].map(s => `
                    <div id="statID" class="stats"><span class="stat-name">${s['stat']['name']}</span>
                        <span class="stat-value">${s['base_stat']}</span>
                        <div class="progress-hide progress bar-height-width" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: ${s['base_stat']}%; height=20px; background-color: ${findColor(pokemon, type)};"></div>
                        </div>
                    </div>`).join(' ')}
   `;
}