const search = document.querySelector('.search')

const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemons = () => Array(150).fill().map(async (_, index) => {
    const response = await fetch(pokemonUrl(index + 1))
    const data = await response.json()
    return data
})

// O 'reduce' vai reduzir todos os 150 elementos do array em uma string (template HTML)
const generateHTML = pokemons => pokemons.reduce((acumulador, pokemon) => {
    const types = pokemon.types
        .map(typeInfo => typeInfo.type.name)
    acumulador += `
      <li class="card ${types[0]}">
         <img class="card-image" 
            alt="${pokemon.name}" 
            src="https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${pokemon.id}.png"/>
         <h2 class="card-title">${pokemon.id}º ${pokemon.name}</h2>
         <p class="card-subtitle">${types.join(' | ')}</p>
      </li>
    `
    return acumulador
}, '')


const insertPokemonsHTML = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemons()

const eventSearch = () => {
    const pokeNames = document.querySelectorAll('.card-title')
    const searchInput = search.value.toLowerCase()
    
    pokeNames.forEach((pokeName => {
        const pokemonFound = pokeName.innerHTML.toLowerCase().includes(searchInput)
        pokeName.parentElement.style.display = 'block'
        
        if(!pokemonFound) {
            pokeName.parentElement.style.display = 'none'
        }
    }))
}

search.addEventListener('input', eventSearch)

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsHTML)
