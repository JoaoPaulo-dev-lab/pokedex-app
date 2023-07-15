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

const pokemonsCSS = () => {
    const styleCSS = `
        body {
            background: #EFEFBB;
            background: linear-gradient(to right, rgb(164, 227, 236), rgb(45, 84, 190));
            color: white;
            margin: 0;
            font-family: rubik;
        }

        .container {
            padding: 40px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            font-size: 54px;
        }

        form, input {
            text-align: center;
            font-size: 25px;
            background-color: transparent;
            border-radius: 8px;
        }

        .search {
            border: 1px solid #222;
        }

        .pokedex {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-gap: 20px;
            padding-inline-start: 0;
        }

        .card {
            list-style: none;
            padding: 40px;
            color: #222;
            text-align: center;
            border-radius: 20px;
            position: relative;
        }

        .card::after {
            content: "";
            display: block;
            width: 50%;
            height: 45%;
            border-radius: 100%;
            background-color: #fff;
            opacity: .7;
            position: absolute;
            top: 15%;
            left: 25%;
        }

        .steel {
            background-color: #f4f4f4;
        }

        .fire {
            background-color: #fa9595;
        }

        .grass {
            background-color: #DEFDE0;
        }

        .electric {
            background-color: #FCF7DE;
        }

        .water, .ice {
            background-color: #DEF3FD;
        }

        .ground {
            background-color: #f4e7da;
        }

        .rock {
            background-color: #d5d5d4;
        }

        .fairy {
            background-color: #fceaff;
        }

        .poison {
            background-color: #98d7a5;
        }

        .bug {
            background-color: #f8d5a3;
        }

        .ghost {
            background-color: #b1a3c9;
        }

        .dragon {
            background-color: #7d9acf;
        }

        .psychic {
            background-color: #eaeda1;
        }

        .flying {
            background-color: #F5F5F5;
        }

        .fighting {
            background-color: #E6E0D4;
        }

        .normal {
            background-color: #F5F5F5;
        }

        .card:hover {
            animation: bounce 0.5s linear;
        }

        .card-title {
            text-transform: capitalize;
            margin-bottom: 0px;
            font-size: 32px;
            font-weight: normal;
            position: relative;
            z-index: 2;
        }

        .card-subtitle {
            margin-top: 5px;
            color: #4e4e4e;
            font-weight: lighter;
            position: relative;
            z-index: 2;
        }

        .card-image {
            height: 180px;
            position: relative;
            z-index: 2;
        }

        @media screen and (max-width: 470px) {
            .pokedex {
                grid-template-columns: 1fr;
            }
        }

        @keyframes bounce {
            20% {
                    transform: translateY(-6px);
            }
            40% {
                    transform: translateY(0px);
            }

            80% {
                    transform: translateY(-2px);
            }
            100% {
                    transform: translateY(0);
            }
        }
    `
    const style = document.createElement('style')
    style.setAttribute('id', 'pokeStyle')
    style.setAttribute('rel', 'stylesheet')
    style.setAttribute('type', 'text/css')
    style.innerHTML = styleCSS
    document.head.appendChild(style)
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
    .then(pokemonsCSS)
