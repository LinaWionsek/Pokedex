let offsetNumber = 0;
let limitNumber = 20;
let nextUrl;
let lvl1 = "";
let lvl2 = "";


function init() {
  includeHTML();
  getURL();
}


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (const element of includeElements) {
    const file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}


// returns list with single PokemonURLs as JSON
async function fetchApiReturnAsJson(url) {
  let response = await fetch(url);
  let currentPokemon = await response.json(); // JSON 
  return currentPokemon;
}

// when trigger e.g button, load next pokemon with loadPokemonWithNextURL(nextUrl), after that: renderallcards 
async function loadPokemonWithNextURL(url) {
  let currentPokemon = await fetchApiReturnAsJson(url); // same as await response.json();
  // nextUrl only filled if loadPokemonWithNextURL executed
  nextUrl = currentPokemon['next']; //nextURL with new offset 
  return currentPokemon;
}


async function loadMorePokemon() {
  let currentPokemon = await loadPokemonWithNextURL(nextUrl);
  await renderAllCards(currentPokemon);
}


async function getURL() {
  let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offsetNumber + '0&limit=' + limitNumber;
  let currentPokemon = await loadPokemonWithNextURL(url);
  await renderAllCards(currentPokemon);
}


//gets singl PokemonURLs give over loadPokemonAsJSON
async function renderAllCards(currentPokemon) {
  let getPokemonApiURLs = currentPokemon['results'];
  for (let i = 0; i < getPokemonApiURLs.length; i++) {
    const getPokemonApiURL = getPokemonApiURLs[i]['url'];
    await loadPokemonAsJSON(getPokemonApiURL);
  }
}


//PokeApiUrl to JSON
async function loadPokemonAsJSON(getPokemonApiURL) {
  let pokemon = await fetchApiReturnAsJson(getPokemonApiURL);
  renderPokemonPreviewCard(pokemon);
}


function renderPokemonPreviewCard(pokemon) {
  getId('content').innerHTML += createPreviewCardHTML(pokemon);
}


function createPreviewCardHTML(pokemon) {
  let type = findFirstType(pokemon);
  let secondType = findSecondType(pokemon);
  let i = pokemon['id'];
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
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`);
  getId('pokedex').classList.remove("d-none");
  renderPokedex(pokemon);
}


function closePokedex() {
  getId('pokedex').classList.add('d-none');
  enableScroll();
}


function renderPokedex(pokemon) {
  let i = pokemon['id'];
  getId('pokedex').innerHTML = createPokemonCardHTML(pokemon);
  disableScroll();
  renderAbout(i);
}


function createPokemonCardHTML(pokemon) {
  let type = findFirstType(pokemon);
  let secondType = findSecondType(pokemon);
  let i = pokemon['id'];
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
        <a onclick="renderAbout(${i})"  class="link" style="color: ${findColor(type)};">About</a>
        <a onclick="renderStats(${i})"  class="link" style="color: ${findColor(type)};">Base&nbspStats</a>
        <div class="dropdown">
          <a class="dropdown-toggle nav-link link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
            style="color: ${findColor(type)};">
            More
          </a>
          <ul class="dropdown-menu">
            <li><a onclick="renderEvolutionchain(${i})" class="link" type="button"
                style="color: ${findColor(type)};">Evolution</a></li>
            <li><a onclick="renderMoves(${i})" class="link" type="button"
                style="color: ${findColor(type)};">Moves</a></li>
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
  let newI = i + 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${newI}`;
  let pokemon = await fetchApiReturnAsJson(url);
  renderPokedex(pokemon);
}


async function lastPokemon(i) {
  let newI = i - 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${newI}`;
  let pokemon = await fetchApiReturnAsJson(url);
  renderPokedex(pokemon);
}


async function renderAbout(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let species = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
  getId('informationContainer').innerHTML = createAboutHTML(pokemon, species);
  getId('informationContainer').classList.remove('add-scrolling');
}


async function renderMoves(i) {
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`);
  createMoveDetails(pokemon['moves']);
  getId('informationContainer').innerHTML = /*html*/ `<div id="movecontainer"></div>`;
}


// -----------------------------------------------------------------------------------------------------------------
async function createMoveDetails(moves) {
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];
    let level = move['version_group_details']['0']['level_learned_at'];
    let url = move['move']['url'];
    let moveDetails = await fetchApiReturnAsJson(url);
    let moveDescription = "-";
    // movedescription
    if (moveDetails['effect_entries'].length != 0) {
      moveDescription = moveDetails['effect_entries']['0']['short_effect'].replace('$effect_chance', '');
    }
    let moveType = moveDetails['type']['name'];
    renderMoveDetails(moveDescription, moveType, level, move, moves.length, i)
  }
}


function renderMoveDetails(moveDescription, moveType, level, move, length, i) {
  let allDetails = /*html*/ `
  <div class="move-details">    
    <div>${moveDescription}</div>
    <div>movetype ${moveType}</div>
    <div>learned at level ${level}</div>
  </div>
`;
  createMovesHTML(move, allDetails);
  if (i === length - 1) {
    getId('movecontainer').innerHTML += /*html*/ `<div class="bottom-placeholder"></div>`;
  }
}


function createMovesHTML(move, allDetails) {
  getId('movecontainer').innerHTML += /*html*/ `
    <div class="move">
        ${move['move']['name']}
      </div>
      ${allDetails}
  `;
}


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
  let pokemon = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon/${i}`);
  getId('informationContainer').innerHTML = createStatsHTML(pokemon);
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