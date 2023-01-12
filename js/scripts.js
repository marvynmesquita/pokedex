const pokeName = document.querySelector('.name');
const pokeID = document.querySelector('.id');
const pokeSprite = document.querySelector('.sprite');
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const previous = document.querySelector('.prev');
const next = document.querySelector('.next');
let pkcry = document.querySelector('.pkcry');
let searchPk = 1

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const catchPokemon = async (id) => {
    const apiResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        if (apiResponse.status == 200) {
            const data = await apiResponse.json()
            return data
        } else {
            pokeID.innerHTML = '???'
            pokeName.innerHTML = 'MissingNo.'
            pokeSprite.classList.remove('loading')
            pokeSprite.src = '../img/missingno.png'
            pkcry.setAttribute('src', './media/miss.mp3')
            pkcry.load()
            pkcry.loop = false
            pkcry.play()
            input.value = ''
        }
};

const renderPokemon = async (pokemon) => {
    pokeID.innerHTML = ''
    pokeName.innerHTML = 'Loading...'
    pokeSprite.src = '../img/pokeload.png'
    pokeSprite.classList.add('loading')
    const data = await catchPokemon(pokemon);
    pokeSprite.classList.remove('loading')
    pokeName.innerHTML = capitalizeFirstLetter(data.name);
    searchPk = data.id
    pokeID.innerHTML = (data.id).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})
    pokeSprite.src = data['sprites']['other']['official-artwork']['front_default']
    pkcry.setAttribute('src', pokecry(searchPk))
    pkcry.load()
    pkcry.loop = false
    pkcry.play()
    input.value = ''

}

const pokecry = (id) => {
    if (id <= 649) {
        cry = 'https://pokemoncries.com/cries-old/' + id + '.mp3';
    }
    else {
        cry = 'https://pokemoncries.com/cries/' + id + '.mp3';
    }
    return cry
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

previous.addEventListener('click', () => {
    if (searchPk >= 2) {
        renderPokemon(searchPk - 1)
    }
    else if (searchPk <= 1) {
        renderPokemon('1008')
    }
})

next.addEventListener('click', () => {
    if (searchPk < 1008) {
        renderPokemon(searchPk + 1)
    }
    else if (searchPk = 1008) {
        renderPokemon('1')
    }
})

renderPokemon(searchPk)
