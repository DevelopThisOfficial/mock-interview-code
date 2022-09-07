const randomBtn = document.getElementById("randomBtn");
let urlString = "https://pokeapi.co/api/v2/pokemon/";

const capitlizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getPokeByName = async (name) => {
    try {
        const response = await fetch(`${urlString}${name}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return { error: err };
    }
};

const getSpriteByName = async (name) => {
    try {
        const response = await fetch(`${urlString}${name}`);
        const data = await response.json();
        return data.sprites.front_default;
    } catch (err) {
        console.error(err);
        return { error: err };
    }
};

const getEvoChain = async (url) => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        let currentVal = data.chain;
        let values = [];

        while (true) {
            if (currentVal.evolves_to.length === 0) {
                const sprite = await getSpriteByName(currentVal.species.name);
                values.push({
                    name: currentVal.species.name,
                    sprite,
                    details: {}
                });
                console.log(values);
                return values;
            } else {
                const sprite = await getSpriteByName(currentVal.species.name);
                values.push({
                    name: currentVal.species.name,
                    sprite,
                    details: currentVal.evolves_to[0].evolution_details[0]
                });
                currentVal = currentVal.evolves_to[0];
            }
        }
    } catch (err) {
        console.error(err);
        return { error: err };
    }
};

const pokeGetCall = async (url) => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        return data
    } catch (err) {
        console.error(err);
        return { error: err };
    }
};

const randomPokemon = async () => {
    try {
        const randomNum = Math.floor(Math.random() * (898 - 1) + 1);
        const response = await fetch(`${urlString}${randomNum}`);
        const data = await response.json();
        const desc = await pokeGetCall(data.species.url);
        const evoChain = await getEvoChain(desc.evolution_chain.url);

        const pokemon = {
            ...data,
            description: desc.flavor_text_entries.filter(text => text.language.name === "en")[0].flavor_text.replace("\n", " ").replace("\f", ""),
            evolution: evoChain
        };
        console.log(pokemon);
        populatePage(pokemon)

    } catch (err) {
        console.error(err);
        return { error: err };
    }
};

const populatePage = (pokemon) => {
    document.getElementById("pokeCard").setAttribute("class", "mx-auto w-100 card p-5");

    // Name
    document.getElementById("pokeName").innerText = capitlizeFirstLetter(pokemon.name);

    // Types
    let typeOne = pokemon.types[0].type.name;
    let typeBadge = document.getElementById("typeOne");
    typeBadge.setAttribute("class", `m-1 pkm-type ${typeOne}`);
    typeBadge.innerText = typeOne;
    if (pokemon.types.length > 1) {
        let typeTwo = pokemon.types[1].type.name;
        let typeBadgeTwo = document.getElementById("typeTwo");
        typeBadgeTwo.setAttribute("class", `m-1 pkm-type ${typeTwo}`);
        typeBadgeTwo.innerText = typeTwo;
    };

    // Stats
    for (let i = 0; i < pokemon.stats.length; i++) {
        let el = document.getElementById(pokemon.stats[i].stat.name);
        el.innerHTML = `<b>${capitlizeFirstLetter(pokemon.stats[i].stat.name)}</b>: ${pokemon.stats[i].base_stat}`
    };

    // Description
    document.getElementById("pokeDesc").innerText = pokemon.description;

    // Sprites
    let frontSprite = document.getElementById("frontSprite");
    let backSprite = document.getElementById("backSprite");
    frontSprite.setAttribute("src", pokemon.sprites.front_default);
    frontSprite.setAttribute("alt", pokemon.name);
    backSprite.setAttribute("src", pokemon.sprites.back_default);
    backSprite.setAttribute("alt", pokemon.name);

    // Evolution Chain
    let evoDiv = document.getElementById("evoDiv");

    if (pokemon.evolution.length = 1) {
        const poke = pokemon.evolution[0];
        let newDiv = document.createElement("div");
        let innerDiv = document.createElement("div");
        let newImg = document.createElement("img");
        let newHeader = document.createElement("h6");
        innerDiv.setAttribute("class", "col-3 pointer");
        newImg.setAttribute("src", poke.sprite);
        newImg.setAttribute("alt", poke.name);
        newHeader.innerText = capitlizeFirstLetter(poke.name);
        
        evoDiv.appendChild(newDiv);
        newDiv.appendChild(innerDiv);
        innerDiv.appendChild(newImg);
        innerDiv.appendChild(newHeader);
    } else {
        for (let i = 0; i < pokemon.evolution.length; i++) {
            const poke = pokemon.evolution[i];
            let newDiv = document.createElement("div");
            let innerDiv = document.createElement("div");
            let newImg = document.createElement("img");
            let arrowImg = document.createElement("img");
            let newHeader = document.createElement("h6");
            innerDiv.setAttribute("class", "col-3 pointer");
            newImg.setAttribute("src", poke.sprite);
            newImg.setAttribute("alt", poke.name);
            arrowImg.setAttribute("src", "./icons8-arrow-24.png");
            arrowImg.setAttribute("alt", "arrow");
            newHeader.innerText = capitlizeFirstLetter(poke.name);
            
            evoDiv.appendChild(newDiv);
            newDiv.appendChild(innerDiv);
            innerDiv.appendChild(newImg);
            innerDiv.appendChild(newHeader);
            newDiv.appendChild(arrowImg);
        }
    }
};

randomBtn.addEventListener("click", randomPokemon)