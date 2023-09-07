let pokemon1 = "";
let pokemon2 = "";
let pokemon3 = "";


async function renderEvolutionchain(i) {
  let species = await fetchApiReturnAsJson(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
  let evolutionchainURL = species['evolution_chain']['url'];
  let evolutionchain = await fetchApiReturnAsJson(evolutionchainURL);
  findChain(evolutionchain);
}


async function findChain(evolutionchain) {
  let chain = evolutionchain['chain'];
  pokemon3 = "";
  //1. POKEMON
  let img1 = await loadPokemon1IMG(evolutionchain);
  pokemon1 = /*html*/ ` 
      <div class="pokemonchain-detail">
        <div id="pokemon1IMG">${img1}</div>
        <div class="pokemon">${chain['species']['name']}</div>
      </div>
  `;
  //PROOF IF 2. POKEMON EXISTS
  if (chain['evolves_to'].length != 0) {
    pokemon2 = "";
    for (let i = 0; i < chain['evolves_to'].length; i++) {
      const chainArr = chain['evolves_to'][i];
      await findSecondPokemonForChain(chainArr);
      await findMoreThanTwoPokemonForChain(chainArr);
    }
  } else {
    pokemon2 = "";
    pokemon3 = "";
  }
  getId('informationContainer').innerHTML = createChainHTML(pokemon1, pokemon2, pokemon3);
  getId('informationContainer').classList.remove('add-scrolling');
}


async function findSecondPokemonForChain(chainArr) {
  //2. Pokemon
  //PROOF IF MIN_LV FOR POKEMON2 EXISTS
  lvl1 = chainArr['evolution_details']['0']['min_level'];
  if (!lvl1) {
    lvl1 = "-";
  };
  let img2 = await loadPokemon2IMG(chainArr);
  pokemon2 += /*html*/ `
    <div>Level ${lvl1}</div>
    <div class="pokemonchain-detail">
      <div>${img2}</div>
      <div class="pokemonchain-pokemon">${chainArr['species']['name']}</div>
    </div>
  `;
}


async function findMoreThanTwoPokemonForChain(chainArr) {
  //PROOF IF 3. POKEMON EXISTS
  if (chainArr['evolves_to'].length != 0) {
    //PROOF IF MIN_LV FOR POKEMON3 EXISTS
    lvl2 = chainArr['evolves_to']['0']['evolution_details']['0']['min_level'];
    if (!lvl2) {
      lvl2 = "-";
    };
    let img3 = await loadPokemon3IMG(chainArr);
    pokemon3 = /*html*/ `
      <div>Level ${lvl2}</div>
      <div class="pokemonchain-detail">
        <div>${img3}</div>
        <div class="pokemon">${chainArr['evolves_to']['0']['species']['name']}</div>
      </div>
    `;
  } else {
    pokemon3 = "";
  }
}


async function loadPokemon1IMG(evolutionchain) {
  let chain = evolutionchain['chain'];
  let pokemonlink = await fetchApiReturnAsJson(chain['species']['url']);
  return loadPokemonIMG(pokemonlink);
}


async function loadPokemon2IMG(chainArr) {
  let pokemonlink = await fetchApiReturnAsJson(chainArr['species']['url']);
  return loadPokemonIMG(pokemonlink);
}


async function loadPokemon3IMG(chainArr) {
  let pokemonlink = await fetchApiReturnAsJson(chainArr['evolves_to']['0']['species']['url']);
  return loadPokemonIMG(pokemonlink);
}


async function loadPokemonIMG(pokemonlink) {
  let pokemon = await fetchApiReturnAsJson(pokemonlink['varieties']['0']['pokemon']['url']);
  let i = pokemon['id'];
  return /*html*/ `
     <img onclick="openPokedex(${i})" class="pokemonchain-img" src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
  `;
}


function createChainHTML(pokemon1, pokemon2, pokemon3) {
  return /*html*/ `
    <div class="chain-container">
      <h5>Evolution</h5>
      <div class="chain">
        ${pokemon1}
        ${pokemon2}
        ${pokemon3}
      </div>
    </div>
  `;
}