let offsetNumber = 0
let limitNumber = 20
let nextUrl;
let isAlreadyLoading = false;
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
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !isAlreadyLoading) {
    isAlreadyLoading = true
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
    <div onclick="openPokedex(${i})" class="previewCard" style = "background-color: ${findColor(type)}">
      <div class="previewCard-Pokemon-Id h5">#${pokemon['id']}</div>            
      <div class="d-flex w-100 previewCard-content">
            <div class="previewCard-details test:after">
                <div class="Pokemon-Name h4">${pokemon['name']}</div>
                <div class="pokemon-type-tag" style = "background-color: ${findColorTag(type)}">${type}</div> 
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


// window.addEventListener('mouseup', function (event) {
//   document.getElementById('detailID');
//   if (!(event.target.closest("#detailID"))) {
//     closePokedex();
//   }
// });


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
  <div class="detail" id="detailID" style="background-color: ${findColor(type)}">
    <!--  DETAIL HEADER   -->
    <div class="detail-header">
      <div onclick="closePokedex()" class="close-card">
        <div class="link">
          <svg class="arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        </div>
      </div>
      <div class="pokemonCard-id h5">#${i}</div>
      <div class="types-container">
        <div class="Pokemon-Name h3">${pokemon['name']}</div>
        <div class="pokemon-type-tag " style="background-color: ${findColorTag(type)}">${type}</div>
        ${secondType}
      </div>
      <div class="pokemonImage-container">
        <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}" />
      </div>
      <img class="pokeball-pokedex" src="img/pokeball.png" alt="">
    </div>
    <!--  DETAIL FOOTER   -->
    <div>
      <div class="back-forward">
        <div class="link" onclick="lastPokemon(${i})"> <div onclick="lastPokemon(${i})"><img class="arrow" src="./img/left.png"></div></div>
        <div class="link" onclick="nextPokemon(${i})"><div onclick="nextPokemon(${i})"><img class="arrow" src="./img/right.png"></div></div>   
      </div>

      <div class="navigation-container">
        <a onclick="renderAbout(${i})"class="link" style="color: ${findColor(type)};">About</a>
        <a onclick="renderStats(${i})" class="link" style="color: ${findColor(type)};">Base&nbspStats</a>
        <div class="dropdown">
          <a class="dropdown-toggle link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
            style="color: ${findColor(type)};">
            More
          </a>
          <ul class="dropdown-menu">
            <li><button onclick="renderEvolutionchain(${i})" class="dropdown-item link" type="button"
                style="color: ${findColor(type)};">Evolution</button></li>
            <li><button onclick="renderMoves(${i})" class="dropdown-item link" type="button"
                style="color: ${findColor(type)};">Moves</button></li>
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
  createMoveDetails(pokemon);
  document.getElementById('informationContainer').innerHTML = ` <div id="movecontainer"></div>`
}

// -----------------------------------------------------------------------------------------------------------------
async function createMoveDetails(pokemon) {
  let moves = pokemon['moves']
  let type = findFirstType(pokemon);
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];
    let level = move['version_group_details']['0']['level_learned_at'];
    let url = move['move']['url'];
    let moveDetails = await fetchApiReturnAsJson(url)
    console.log(moveDetails)
    let moveDescription = "-"

    if (moveDetails['effect_entries'].length != 0) {
      moveDescription = moveDetails['effect_entries']['0']['short_effect'].replace('$effect_chance', '')
      console.log(moveDescription)
    }
    let moveType = moveDetails['type']['name'];
    let allDetails = `
    <div class="move-details">    
    <div>${moveDescription}</div>
    <div>movetype ${moveType}</div>
    <div>learned at level ${level}</div>
    </div>`;
    createMovesHTML(move, allDetails, type)
    if (i === moves.length - 1) {
      document.getElementById('movecontainer').innerHTML += `<div class="bottom-placeholder"></div>`
    }

  }
}


function createMovesHTML(move, allDetails, type) {
  document.getElementById('movecontainer').innerHTML += `
            <div class="move">
                ${move['move']['name']}
             </div>
             ${allDetails}
            `;
}

// async function createMoveDetails(move) {
//   let url = move['moves']['0']['move']['url']
//   let level = move['moves']['0']['version_group_details']['0']['level_learned_at']
//   let moveDetails = await fetchApiReturnAsJson(url)
//   console.log(moveDetails)
//   let moveDescription = moveDetails['flavor_text_entries']['2']['flavor_text']
//   let moveType = moveDetails['type']['name']
//   let name = moveDetails['name']
//   console.log(name, level, moveType, moveDescription)
//   document.getElementById('informationContainer').innerHTML = createMovesHTML(pokemon);
// }


function createAboutHTML(pokemon, species) {
  let height = pokemon['height'] * 0.1;
  let weight = pokemon['weight'] * 0.1;
  let description = species['flavor_text_entries']['12']['flavor_text'];
  description = description.replace(/[^a-zA-Z,0-9.]/g, ' ');
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
}


function createStatsHTML(pokemon) {
  let type = findFirstType(pokemon);
  return /*html*/ `
    ${pokemon['stats'].map(s => `
                    <div id="statID" class="stats"><span class="stat-name">${s['stat']['name']}</span>
                        <span class="stat-value">${s['base_stat']}</span>
                        <div class="progress-hide progress bar-height-width" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: ${s['base_stat']}%; height=20px; background-color: ${findColor(type)};"></div>
                        </div>
                    </div>`).join(' ')}
   `;
}