const pokeName = document.querySelector('.name');
const pokeID = document.querySelector('.id');
const pokeSprite = document.querySelector('.sprite');
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const previous = document.querySelector('.prev');
const next = document.querySelector('.next');
let pkTypes = document.querySelector('.types');
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
            pkTypes.innerHTML = '<div class="error">Error</div>'
            pkcry.setAttribute('src', './media/miss.mp3')
            pkcry.load()
            pkcry.volume = 0.4;
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
    if (pokemon <= 809) {
        pokeSprite.src = 'https://projectpokemon.org/images/normal-sprite/' + data.name +'.gif';
    }
    else {
        pokeSprite.src = 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/' + data.name +'.gif';
    }
    if (data.types['1']){
        pkTypes.innerHTML = '<div class="' + data.types[0].type.name + '">' + capitalizeFirstLetter(data.types[0].type.name) + '</div><div class="' + data.types[1].type.name + '">' + capitalizeFirstLetter(data.types[1].type.name) + '</div>'
    } else {
        pkTypes.innerHTML = '<div class="' + data.types[0].type.name + '">' + capitalizeFirstLetter(data.types[0].type.name) + '</div>'
    }
    if (searchPk == 25) {
        pkcry.setAttribute('src','./media/pikachu.mp3');
    } else {
        pkcry.setAttribute('src', pokecry(searchPk))
    }
    pkcry.load()
    pkcry.volume = 0.6;
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

document.addEventListener('keydown', (e) => {
    var code = e.keyCode

    if (code === 39) {
        if (searchPk < 1008) {
            renderPokemon(searchPk + 1)
        }
        else if (searchPk = 1008) {
            renderPokemon('1')
        }
    } else if (code === 37) {
        if (searchPk >= 2) {
            renderPokemon(searchPk - 1)
        }
        else if (searchPk <= 1) {
            renderPokemon('1008')
        }
    }
})

renderPokemon(searchPk)
