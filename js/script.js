let allPokemon = [];
let allChar = [];
let counter;
let currentPokemon;
let newPokemon
let offsetNumber = 0
let limitNumber = 20
let nextUrl;

// https://pokeapi.co/api/v2/evolution-chain/528/
// https://pokeapi.co/api/v2/generation/1/
// https://pokeapi.co/api/v2/pokemon-species/2/ generation -> name: generation-i url:https://pokeapi.co/api/v2/generation/1/
// evolution chain -> url: url mit link zu evolution chain

async function loadPokemon(url) {
    let response = await fetch(url);
    let currentPokemon = await response.json(); // JSON 
    return currentPokemon;
}

// wenn trigger zb button lade die nächsten pokemon mit loadPokemonWithNextURL(nextUrl) danach renderallcards 
async function loadPokemonWithNextURL(url) {
    let currentPokemon = await loadPokemon(url); // genauso wie await response.json();
    // kein let vor nextUrl deshalb wird die globale Variable benutzt!
    // nextUrl wird erst gefüllt wenn loadPokemonWithNextURL ausgeführt wird
    nextUrl = currentPokemon['next'] //nextURL mit neuem offset 
    return currentPokemon;
}

// offsetNumber change um 20 - 20 40 60 80 100
async function getURL() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offsetNumber + '0&limit=' + limitNumber;
    let currentPokemon = await loadPokemonWithNextURL(url)
    await renderAllCards(currentPokemon);
}

async function renderAllCards(currentPokemon) {
    let getPokemonApiURLs = currentPokemon['results']
    for (let i = 0; i < getPokemonApiURLs.length; i++) {
        const getPokemonApiURL = getPokemonApiURLs[i]['url'];
        console.log(getPokemonApiURL)
        await loadPokemonAsJSON(getPokemonApiURL)
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


async function openPokedex(i) {
    let pokemon = await loadPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
    console.log("openPokedex", pokemon)
    document.getElementById('pokedex').classList.remove("d-none");
    renderPokedex(pokemon);
}


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
                    <div class="pokemonImage-background" style = "background-color: ${findColorTag(pokemon, type)}">
                        <img class="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
                    </div>
                </div>
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
    let pokemon = await loadPokemon(url)
    renderPokedex(pokemon);
}


async function lastPokemon(i) {
    let newI = i - 1
    let url = `https://pokeapi.co/api/v2/pokemon/${newI}`
    let pokemon = await loadPokemon(url)
    renderPokedex(pokemon);
}


async function renderAbout(i) {
    let pokemon = await loadPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
    document.getElementById('informationContainer').innerHTML = createAboutHTML(pokemon)
}

async function renderMoves(i) {
    let pokemon = await loadPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
    document.getElementById('informationContainer').innerHTML = createMovesHTML(pokemon)
}

function createMovesHTML(pokemon) {
    let type = findFirstType(pokemon);
    let height = pokemon['height'] * 0.1;
    let weight = pokemon['weight'] * 0.1;
    let moves = pokemon['moves']
    let html = ""; //string
    console.log(moves.length)
    console.log(moves)
    // console.log(moves)
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        console.log("MOVES-I", move)
        console.log("MOVES-II", move['move']['name'])
        html += /*html*/ `
        <div>
            ${ move['move']['name']}
        </div>`;
    }
    return html

}





function createAboutHTML(pokemon) {
    let type = findFirstType(pokemon);
    let height = pokemon['height'] * 0.1;
    let weight = pokemon['weight'] * 0.1;

    return /*html*/ `
    <div class="about">
        <div class="description"></div>
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
    let pokemon = await loadPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
    document.getElementById('informationContainer').innerHTML = createStatsHTML(pokemon)
}


function createStatsHTML(pokemon) {
    let type = findFirstType(pokemon);
    let secondType = findSecondType(pokemon);
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


function closePokedex() {
    document.getElementById('pokedex').classList.add('d-none');
    enableScroll();
}